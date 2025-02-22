import { supabase } from '@/lib/supabase';
import type { Contact } from '@/types';
import { tagsService } from './tags';

export const contactsService = {
  async getAll(): Promise<Contact[]> {
    try {
      const { data: contacts, error } = await supabase
        .from('contacts')
        .select(`
          *,
          contact_tags (
            tags (*)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (contacts || []).map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || undefined,
        position: contact.position || undefined,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`,
        tags: contact.contact_tags?.map(ct => ct.tags) || [],
        lastContact: contact.created_at,
        source: (contact.source as Contact['source']) || 'manual',
        status: (contact.status as Contact['status']) || 'active',
        notes: contact.notes || undefined
      }));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  async create(contact: Omit<Contact, 'id' | 'lastContact' | 'avatar'>): Promise<Contact> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          name: contact.name,
          email: contact.email || null,
          phone: contact.phone || null,
          company: contact.company || null,
          position: contact.position || null,
          source: contact.source,
          status: contact.status,
          notes: contact.notes || null
        })
        .select()
        .single();

      if (error) throw error;

      // Add tags
      if (contact.tags.length > 0) {
        const tagInserts = contact.tags.map(tag => ({
          contact_id: data.id,
          tag_id: tag.id
        }));

        const { error: tagError } = await supabase
          .from('contact_tags')
          .insert(tagInserts);

        if (tagError) throw tagError;
      }

      return {
        id: data.id,
        name: data.name,
        email: data.email || '',
        phone: data.phone || '',
        company: data.company || undefined,
        position: data.position || undefined,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
        tags: contact.tags,
        lastContact: data.created_at,
        source: (data.source as Contact['source']) || 'manual',
        status: (data.status as Contact['status']) || 'active',
        notes: data.notes || undefined
      };
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  async update(id: string, contact: Partial<Contact>): Promise<Contact> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({
          name: contact.name,
          email: contact.email || null,
          phone: contact.phone || null,
          company: contact.company || null,
          position: contact.position || null,
          source: contact.source,
          status: contact.status,
          notes: contact.notes || null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update tags if provided
      if (contact.tags) {
        // Remove existing tags
        await supabase
          .from('contact_tags')
          .delete()
          .eq('contact_id', id);

        // Add new tags
        if (contact.tags.length > 0) {
          const tagInserts = contact.tags.map(tag => ({
            contact_id: id,
            tag_id: tag.id
          }));

          const { error: tagError } = await supabase
            .from('contact_tags')
            .insert(tagInserts);

          if (tagError) throw tagError;
        }
      }

      return {
        id: data.id,
        name: data.name,
        email: data.email || '',
        phone: data.phone || '',
        company: data.company || undefined,
        position: data.position || undefined,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
        tags: contact.tags || [],
        lastContact: data.created_at,
        source: (data.source as Contact['source']) || 'manual',
        status: (data.status as Contact['status']) || 'active',
        notes: data.notes || undefined
      };
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};