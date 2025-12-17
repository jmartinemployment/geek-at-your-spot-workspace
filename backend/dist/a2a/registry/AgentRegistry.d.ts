import { BaseAgent } from '../agents/BaseAgent';
import { AgentConfig, AgentRole, AgentRegistryEntry, AgentMetrics, TaskRoutingRule, AgentCapabilities } from '../types';
export declare class AgentRegistry {
    private agents;
    private routingRules;
    private anthropicApiKey;
    constructor(anthropicApiKey: string);
    /**
     * Register an agent
     */
    registerAgent(config: AgentConfig): void;
    /**
     * Unregister an agent
     */
    unregisterAgent(agentId: string): void;
    /**
     * Get agent by ID
     */
    getAgent(agentId: string): BaseAgent | undefined;
    /**
     * Get all agents
     */
    getAllAgents(): BaseAgent[];
    /**
     * Get agents by role
     */
    getAgentsByRole(role: AgentRole): BaseAgent[];
    /**
     * Get available agents (idle and not at capacity)
     */
    getAvailableAgents(): BaseAgent[];
    /**
     * Get best agent for a task based on routing rules
     */
    getBestAgentForTask(taskDescription: string, requiredCapabilities?: Partial<AgentCapabilities>): BaseAgent | undefined;
    /**
     * Check if agent has required capabilities
     */
    private hasRequiredCapabilities;
    /**
     * Add routing rule
     */
    addRoutingRule(rule: TaskRoutingRule): void;
    /**
     * Get all routing rules
     */
    getRoutingRules(): TaskRoutingRule[];
    /**
     * Initialize default routing rules
     */
    private initializeDefaultRoutingRules;
    /**
     * Get registry statistics
     */
    getStats(): {
        totalAgents: number;
        availableAgents: number;
        busyAgents: number;
        agentsByRole: Record<AgentRole, number>;
        totalTasksCompleted: number;
        averageSuccessRate: number;
    };
    /**
     * Get all agent metrics
     */
    getAllMetrics(): AgentMetrics[];
    /**
     * Get agent registry entries
     */
    getRegistryEntries(): AgentRegistryEntry[];
    /**
     * Health check - verify all agents are functioning
     */
    healthCheck(): Promise<Record<string, boolean>>;
    /**
     * Reset all agents (for testing)
     */
    resetAllAgents(): void;
    /**
     * Enable/disable agent
     */
    setAgentEnabled(agentId: string, enabled: boolean): void;
    /**
     * Get agent count
     */
    getAgentCount(): number;
    /**
     * Check if agent exists
     */
    hasAgent(agentId: string): boolean;
    /**
     * Get agents with specific capability
     */
    getAgentsWithCapability(capability: keyof AgentCapabilities): BaseAgent[];
    /**
     * Get least loaded agent
     */
    getLeastLoadedAgent(): BaseAgent | undefined;
    /**
     * Get most experienced agent by success rate
     */
    getMostExperiencedAgent(role?: AgentRole): BaseAgent | undefined;
    /**
     * Clear all agents
     */
    clear(): void;
}
//# sourceMappingURL=AgentRegistry.d.ts.map