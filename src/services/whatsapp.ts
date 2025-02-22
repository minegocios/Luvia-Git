import { supabase } from '../lib/supabase';

class WhatsAppService {
  private connectionStatus: 'disconnected' | 'connecting' | 'connected' = 'disconnected';
  private listeners: Set<(event: string, data: any) => void> = new Set();

  public async connect() {
    try {
      this.connectionStatus = 'connecting';
      this.notifyListeners('status', this.connectionStatus);
      
      // Implementar nova lógica de conexão aqui
      
      this.connectionStatus = 'connected';
      this.notifyListeners('status', this.connectionStatus);
      await this.updateChannelStatus(true);
    } catch (error) {
      console.error('Error connecting:', error);
      this.notifyListeners('error', 'Failed to connect to WhatsApp');
    }
  }

  public async disconnect() {
    try {
      this.connectionStatus = 'disconnected';
      this.notifyListeners('status', this.connectionStatus);
      await this.updateChannelStatus(false);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  }

  private async updateChannelStatus(connected: boolean) {
    try {
      await supabase
        .from('channels')
        .update({
          config: {
            connected,
            lastSync: new Date().toISOString()
          }
        })
        .eq('type', 'whatsapp');
    } catch (error) {
      console.error('Error updating channel status:', error);
    }
  }

  public async sendMessage(to: string, message: string) {
    if (this.connectionStatus !== 'connected') {
      throw new Error('WhatsApp is not connected');
    }

    try {
      // Implementar nova lógica de envio de mensagem aqui
      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  public addListener(callback: (event: string, data: any) => void) {
    this.listeners.add(callback);
    callback('status', this.connectionStatus);
  }

  public removeListener(callback: (event: string, data: any) => void) {
    this.listeners.delete(callback);
  }

  private notifyListeners(event: string, data: any) {
    this.listeners.forEach(listener => listener(event, data));
  }

  public getStatus() {
    return this.connectionStatus;
  }
}

export const whatsAppService = new WhatsAppService();