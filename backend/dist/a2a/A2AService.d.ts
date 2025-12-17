import { A2AConfig, AgentConfig, OrchestrationRequest, OrchestrationResult, OrchestrationStrategy, AgentRole, ConversationContext, ConversationSummary, AgentMetrics } from './types';
export declare class A2AService {
    private config;
    private agentRegistry;
    private conversationManager;
    private orchestrator;
    private initialized;
    constructor(config: Partial<A2AConfig>);
    /**
     * Initialize A2A Service with default agents
     */
    initialize(): Promise<void>;
    /**
     * Register default agents
     */
    private registerDefaultAgents;
    /**
     * Execute a multi-agent workflow
     */
    execute(request: OrchestrationRequest): Promise<OrchestrationResult>;
    /**
     * Register a custom agent
     */
    registerAgent(config: AgentConfig): void;
    /**
     * Unregister an agent
     */
    unregisterAgent(agentId: string): void;
    /**
     * Get conversation by ID
     */
    getConversation(conversationId: string): ConversationContext | undefined;
    /**
     * Get user conversations
     */
    getUserConversations(userId: string): ConversationContext[];
    /**
     * Get conversation summary
     */
    getConversationSummary(conversationId: string): ConversationSummary;
    /**
     * Get all agent metrics
     */
    getAgentMetrics(): AgentMetrics[];
    /**
     * Get service statistics
     */
    getStats(): {
        enabled: boolean;
        initialized: boolean;
        config: {
            maxConcurrentConversations: number;
            maxAgentsPerConversation: number;
            defaultTimeout: number;
        };
        orchestrator: {
            totalConversations: number;
            activeConversations: number;
            totalAgents: number;
            availableAgents: number;
            strategy: OrchestrationStrategy;
        };
        registry: {
            totalAgents: number;
            availableAgents: number;
            busyAgents: number;
            agentsByRole: Record<AgentRole, number>;
            totalTasksCompleted: number;
            averageSuccessRate: number;
        };
    };
    /**
     * Health check
     */
    healthCheck(): Promise<{
        enabled: boolean;
        initialized: boolean;
        agentRegistry: boolean;
        conversationManager: boolean;
        orchestrator: boolean;
        agentHealth: Record<string, boolean>;
    }>;
    /**
     * Update orchestration strategy
     */
    updateStrategy(strategy: Partial<OrchestrationStrategy>): void;
    /**
     * Get current orchestration strategy
     */
    getStrategy(): OrchestrationStrategy;
    /**
     * Enable/disable agent
     */
    setAgentEnabled(agentId: string, enabled: boolean): void;
    /**
     * Get available agents
     */
    getAvailableAgents(): string[];
    /**
     * Get agents by role
     */
    getAgentsByRole(role: AgentRole): string[];
    /**
     * Delete conversation
     */
    deleteConversation(conversationId: string): void;
    /**
     * Get recent conversations
     */
    getRecentConversations(limit?: number): ConversationContext[];
    /**
     * Search conversations
     */
    searchConversations(query: string): ConversationContext[];
    /**
     * Get active conversations
     */
    getActiveConversations(): ConversationContext[];
    /**
     * Reset service (for testing)
     */
    reset(): void;
    /**
     * Update configuration
     */
    updateConfig(config: Partial<A2AConfig>): void;
    /**
     * Get configuration
     */
    getConfig(): A2AConfig;
    /**
     * Check if initialized
     */
    isInitialized(): boolean;
    /**
     * Check if enabled
     */
    isEnabled(): boolean;
}
//# sourceMappingURL=A2AService.d.ts.map