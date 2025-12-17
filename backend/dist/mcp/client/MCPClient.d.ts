import { MCPRegistry } from '../registry/MCPRegistry';
import { MCPTool } from '../types';
export interface MCPClientConfig {
    apiKey: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
}
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
export interface ChatOptions {
    systemPrompt?: string;
    maxToolUses?: number;
    temperature?: number;
}
export interface ChatResponse {
    content: string;
    toolsUsed: string[];
    stopReason: string;
    usage: {
        inputTokens: number;
        outputTokens: number;
    };
}
export declare class MCPClient {
    private client;
    private registry;
    private config;
    constructor(registry: MCPRegistry, config: MCPClientConfig);
    /**
     * Send a chat message with MCP tool support
     */
    chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResponse>;
    /**
     * Simple chat without tool use (direct response)
     */
    simpleCat(message: string, systemPrompt?: string): Promise<string>;
    /**
     * Get available tools
     */
    getAvailableTools(): MCPTool[];
    /**
     * Execute a single tool directly
     */
    executeTool(toolName: string, params: any): Promise<any>;
    /**
     * Convert MCP tools to Claude API format
     */
    private convertToClaudeTools;
    /**
     * Health check
     */
    healthCheck(): Promise<boolean>;
}
//# sourceMappingURL=MCPClient.d.ts.map