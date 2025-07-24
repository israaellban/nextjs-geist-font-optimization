import { Client, LocalAuth } from 'whatsapp-web.js';
import QRCode from 'qrcode';
import { supabase } from '../config/supabase';

export class WhatsAppService {
  private clients: Map<string, Client> = new Map();

  async initialize() {
    console.log('Initializing WhatsApp service...');
  }

  async createClient(userId: string) {
    const client = new Client({
      authStrategy: new LocalAuth({
        clientId: userId,
        dataPath: './sessions'
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      }
    });

    client.on('qr', async (qr) => {
      console.log('QR Code received for user:', userId);
      const qrCode = await QRCode.toDataURL(qr);
      await supabase
        .from('users')
        .update({ whatsapp_qr: qrCode })
        .eq('id', userId);
    });

    client.on('ready', async () => {
      console.log('WhatsApp client ready for user:', userId);
      await supabase
        .from('users')
        .update({ whatsapp_session: 'connected' })
        .eq('id', userId);
    });

    client.on('message', async (message) => {
      console.log('New message:', message.body);
      // Handle incoming messages here
    });

    client.on('disconnected', async () => {
      console.log('WhatsApp client disconnected for user:', userId);
      await supabase
        .from('users')
        .update({ whatsapp_session: 'disconnected' })
        .eq('id', userId);
    });

    this.clients.set(userId, client);
    return client;
  }

  async getClient(userId: string) {
    return this.clients.get(userId);
  }

  async sendMessage(userId: string, to: string, message: string) {
    const client = this.clients.get(userId);
    if (!client) {
      throw new Error('WhatsApp client not found');
    }
    return await client.sendMessage(to, message);
  }
}

export const whatsappService = new WhatsAppService();
