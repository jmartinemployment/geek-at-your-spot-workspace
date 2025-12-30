import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MCPChatRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  system_prompt?: string;
  max_tool_uses?: number;
  temperature?: number;
}

export interface MCPChatResponse {
  content: string;
  toolsUsed: string[];
  stopReason: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface SmartChatRequest {
  conversationId?: string;
  message: string;
  userId?: string;
}

export type ConversationPhase =
  | 'gathering'
  | 'confirmation_first'
  | 'clarifying'
  | 'confirmation_second'
  | 'human_escalation'
  | 'complete';

export interface EstimateResult {
  summary: string;
  pricing: {
    basePrice: number;
    additionalCosts: Array<{ item: string; cost: number }>;
    totalMin: number;
    totalMax: number;
  };
  timeline: string;
  nextSteps: string[];
  formattedEstimate: string;
}

export interface SmartChatResponse {
  conversationId: string;
  response: string;
  phase: ConversationPhase;
  readinessScore?: number;
  requirements?: Record<string, any>;
  escalationReason?: string;
  estimateReady?: boolean;
  estimate?: EstimateResult;
}

export interface EmailRequest {
  to: string;
  subject: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  chat(request: MCPChatRequest): Observable<MCPChatResponse> {
    return this.http.post<MCPChatResponse>(
      `${this.apiUrl}${environment.endpoints.webDev}/api/mcp/chat`,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  smartChat(request: SmartChatRequest): Observable<SmartChatResponse> {
    return this.http.post<SmartChatResponse>(
      `${this.apiUrl}/api/chat`,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  sendEmail(request: EmailRequest): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(
      `${this.apiUrl}/api/email`,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
