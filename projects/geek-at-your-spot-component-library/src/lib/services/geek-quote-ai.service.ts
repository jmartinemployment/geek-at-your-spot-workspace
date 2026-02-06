import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ApiService, SmartChatRequest, SmartChatResponse } from './api.service';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface QuoteEstimate {
  projectType: string;
  minBudget: number;
  maxBudget: number;
  timeline: string;
  features: string[];
}

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeekQuoteAiService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly apiService = inject(ApiService);
  private conversationId: string | null = null;

  constructor() {
    console.log('GeekQuoteAI Service initialized with Smart Controller');
  }

  async sendMessage(
    messages: Message[],
    leadInfo: LeadInfo
  ): Promise<SmartChatResponse> {

    if (!this.isBrowser) {
      throw new Error('API calls only available in browser');
    }

    if (!messages || messages.length === 0) {
      throw new Error('Messages array cannot be empty');
    }

    try {
      const lastUserMessage = messages
        .filter(m => m.role === 'user')
        .pop();

      if (!lastUserMessage) {
        throw new Error('No user message found');
      }

      const request: SmartChatRequest = {
        conversationId: this.conversationId || undefined,
        message: lastUserMessage.content,
        userId: leadInfo.email || undefined
      };

      console.log('Sending smart chat request:', request);

      const response = await firstValueFrom(this.apiService.smartChat(request));

      if (!response) {
        throw new Error('No response from backend');
      }

      console.log('Smart chat response:', response);

      this.conversationId = response.conversationId;

      return response;

    } catch (error: any) {
      console.error('GeekQuoteAI Service Error:', error);
      throw new Error(`Failed to send message: ${error.message || 'Unknown error'}`);
    }
  }

  resetConversation(): void {
    this.conversationId = null;
    console.log('Conversation reset');
  }

  getConversationId(): string | null {
    return this.conversationId;
  }
}
