import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MCPChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  system_prompt?: string;
  max_tool_uses?: number;
  temperature?: number;
}

export interface MCPChatResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text?: string;
    tool_use?: any;
  }>;
  model: string;
  stop_reason: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Chat with Claude using MCP tools
   */
  chat(request: MCPChatRequest): Observable<MCPChatResponse> {
    return this.http.post<MCPChatResponse>(
      `${this.apiUrl}/api/mcp/chat`,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  /**
   * Get available MCP tools
   */
  getTools(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/mcp/tools`);
  }

  /**
   * Execute specific MCP tool
   */
  executeTool(toolName: string, params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/mcp/execute`, {
      tool_name: toolName,
      params: params,
    });
  }

  /**
   * Get MCP health status
   */
  getHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/mcp/health`);
  }

  /**
   * Get MCP statistics
   */
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/mcp/stats`);
  }
}
