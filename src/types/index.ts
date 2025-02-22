export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  avatar?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  status: 'active' | 'inactive';
  count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  avatar: string;
  tags: Tag[];
  lastContact: string;
  source: 'whatsapp' | 'telegram' | 'instagram' | 'facebook' | 'manual';
  status: 'active' | 'inactive';
  notes?: string;
}

export interface Channel {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  stats: {
    messagesPerDay: number;
    activeChats: number;
  };
  apiStatus: 'operational' | 'error';
  lastSync: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'customer';
}