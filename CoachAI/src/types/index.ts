// Type definitions for the app

export interface Coach {
  id: string;
  name: string;
  role: string;
  specialty: string;
  personality: string;
  avatar: string;
  isPremium: boolean;
  systemPrompt: string;
  sampleQuestions: string[];
}

export interface Message {
  id: string;
  coachId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  coachId: string;
  messages: Message[];
  lastUpdated: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  goals?: string[];
  values?: string[];
  isPremium: boolean;
  messageCount: number;
  lastMessageReset: number;
}

export interface SubscriptionInfo {
  isPremium: boolean;
  productId?: string;
  expirationDate?: number;
}
