export type Database = {
  public: {
    Tables: {
      tags: {
        Row: {
          id: string
          name: string
          color: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          color: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          position: string | null
          source: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          position?: string | null
          source?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          position?: string | null
          source?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_tags: {
        Row: {
          contact_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          contact_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          contact_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          title: string
          company: string
          value: number
          due_date: string
          stage: string
          contact_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          value: number
          due_date: string
          stage: string
          contact_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          value?: number
          due_date?: string
          stage?: string
          contact_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}