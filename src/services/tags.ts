import { supabase } from '@/lib/supabase';
import type { Tag } from '@/types';

export const tagsService = {
  async getAll(): Promise<Tag[]> {
    try {
      const { data: tags, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) throw error;

      return (tags || []).map(tag => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
        status: tag.status as Tag['status']
      }));
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  async create(tag: Omit<Tag, 'id'>): Promise<Tag> {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert([{
          name: tag.name,
          color: tag.color,
          status: tag.status
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        color: data.color,
        status: data.status as Tag['status']
      };
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }
};