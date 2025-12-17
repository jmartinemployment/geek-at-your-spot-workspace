import Anthropic from '@anthropic-ai/sdk';
import { AgentConfig, AgentState, AgentMessage, AgentTask, AgentResponse, AgentMetrics } from '../types';
export declare abstract class BaseAgent {
    protected config: AgentConfig;
    protected state: AgentState;
    protected metrics: AgentMetrics;
    protected client: Anthropic;
    protected conversationHistory: Map<string, AgentMessage[]>;
    constructor(config: AgentConfig, anthropicApiKey: string);
    /**
     * Process a message from another agent or user
     */
    processMessage(message: AgentMessage): Promise<AgentResponse>;
    /**
     * Execute a task
     */
    executeTask(task: AgentTask): Promise<any>;
    /**
     * Check if agent can handle a task (override in subclasses)
     */
    protected canHandleTask(task: AgentTask): boolean;
    /**
     * Execute task-specific logic (must be implemented by subclasses)
     */
    protected abstract executeTaskLogic(task: AgentTask): Promise<any>;
    /**
     * Build prompt for Claude API
     */
    protected buildPrompt(message: AgentMessage, conversationHistory: AgentMessage[]): string;
    /**
     * Parse Claude's response into structured format
     */
    protected parseResponse(responseText: string): AgentResponse;
    /**
     * Add message to conversation history
     */
    protected addToConversationHistory(conversationId: string, message: AgentMessage): void;
    /**
     * Update metrics after task execution
     */
    protected updateMetrics(duration: number, success: boolean): void;
    /**
     * Update task-specific metrics
     */
    protected updateTaskMetrics(duration: number): void;
    /**
     * Get agent configuration
     */
    getConfig(): AgentConfig;
    /**
     * Get agent state
     */
    getState(): AgentState;
    /**
     * Get agent metrics
     */
    getMetrics(): AgentMetrics;
    /**
     * Check if agent is available
     */
    isAvailable(): boolean;
    /**
     * Get agent's current load
     */
    getCurrentLoad(): number;
    /**
     * Reset agent state (for testing)
     */
    reset(): void;
    /**
     * Update agent configuration
     */
    updateConfig(config: Partial<AgentConfig>): void;
    /**
     * Enable/disable agent
     */
    setEnabled(enabled: boolean): void;
    /**
     * Get conversation history
     */
    getConversationHistory(conversationId: string): AgentMessage[];
    /**
     * Clear conversation history
     */
    clearConversationHistory(conversationId: string): void;
    /**
     * Get agent summary
     */
    getSummary(): string;
}
//# sourceMappingURL=BaseAgent.d.ts.map