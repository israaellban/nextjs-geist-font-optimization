export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent';
  whatsappNumber?: string;
  whatsappSession?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  phoneNumber: string;
  name?: string;
  profilePicture?: string;
  lastMessageAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  clientId: string;
  assignedAgentId?: string;
  status: 'open' | 'closed' | 'pending';
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'client' | 'agent';
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location';
  mediaUrl?: string;
  mediaName?: string;
  timestamp: Date;
  isRead: boolean;
  createdAt: Date;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: 'greeting' | 'followup' | 'closing' | 'custom';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIResponse {
  id: string;
  conversationId: string;
  prompt: string;
  response: string;
  model: string;
  tokensUsed: number;
  createdAt: Date;
}

export interface WhatsAppSession {
  id: string;
  userId: string;
  sessionData: string;
  isActive: boolean;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
