import { supabase } from '@/lib/supabase';
import type { Deal } from '@/types';
import { contactsService } from './contacts';

export const dealsService = {
  async getAll(): Promise<Deal[]> {
    try {
      const { data: deals, error } = await supabase
        .from('deals')
        .select(`
          *,
          contact:contacts(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Buscar os contatos com suas tags
      const contactsWithTags = await Promise.all(
        (deals || []).map(async (deal) => {
          const contact = await contactsService.getById(deal.contact_id);
          return {
            id: deal.id,
            title: deal.title,
            company: deal.company,
            value: deal.value,
            dueDate: deal.due_date,
            stage: deal.stage,
            contact
          };
        })
      );

      return contactsWithTags;
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  },

  async create(deal: Omit<Deal, 'id'>): Promise<Deal> {
    try {
      const { data, error } = await supabase
        .from('deals')
        .insert([{
          title: deal.title,
          company: deal.company,
          value: deal.value,
          due_date: deal.dueDate,
          stage: deal.stage,
          contact_id: deal.contact.id
        }])
        .select(`
          *,
          contact:contacts(*)
        `)
        .single();

      if (error) throw error;

      const contact = await contactsService.getById(data.contact_id);

      return {
        id: data.id,
        title: data.title,
        company: data.company,
        value: data.value,
        dueDate: data.due_date,
        stage: data.stage,
        contact
      };
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  },

  async update(id: string, deal: Partial<Deal>): Promise<Deal> {
    try {
      const { data, error } = await supabase
        .from('deals')
        .update({
          title: deal.title,
          company: deal.company,
          value: deal.value,
          due_date: deal.dueDate,
          stage: deal.stage,
          contact_id: deal.contact?.id
        })
        .eq('id', id)
        .select(`
          *,
          contact:contacts(*)
        `)
        .single();

      if (error) throw error;

      const contact = await contactsService.getById(data.contact_id);

      return {
        id: data.id,
        title: data.title,
        company: data.company,
        value: data.value,
        dueDate: data.due_date,
        stage: data.stage,
        contact
      };
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw error;
    }
  },

  async updateStage(id: string, stage: Deal['stage']): Promise<void> {
    try {
      const { error } = await supabase
        .from('deals')
        .update({ stage })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating deal stage:', error);
      throw error;
    }
  }
};