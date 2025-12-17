import { AgentRegistry } from '../registry/AgentRegistry';
import { ConversationManager } from '../conversation/ConversationManager';
import { OrchestrationRequest, OrchestrationResult, OrchestrationStrategy } from '../types';
export declare class Orchestrator {
    private agentRegistry;
    private conversationManager;
    private strategy;
    constructor(agentRegistry: AgentRegistry, conversationManager: ConversationManager, strategy?: Partial<OrchestrationStrategy>);
    /**
     * Orchestrate a multi-agent workflow
     */
    orchestrate(request: OrchestrationRequest): Promise<OrchestrationResult>;
    /**
     * Execute sequential pattern (one agent at a time)
     */
    private executeSequential;
    /**
     * Execute parallel pattern (multiple agents simultaneously)
     */
    private executeParallel;
    /**
     * Execute hierarchical pattern (coordinator delegates to specialists)
     */
    private executeHierarchical;
    /**
     * Execute peer-to-peer pattern (agents collaborate directly)
     */
    private executePeerToPeer;
    /**
     * Execute round-robin pattern (distribute tasks evenly)
     */
    private executeRoundRobin;
    /**
     * Execute task with timeout
     */
    private executeTaskWithTimeout;
    /**
     * Get coordinator agent
     */
    private getCoordinatorAgent;
    /**
     * Identify parallel tasks from response
     */
    private identifyParallelTasks;
    /**
     * Update orchestration strategy
     */
    updateStrategy(strategy: Partial<OrchestrationStrategy>): void;
    /**
     * Get current strategy
     */
    getStrategy(): OrchestrationStrategy;
    /**
     * Get orchestration statistics
     */
    getStats(): {
        totalConversations: number;
        activeConversations: number;
        totalAgents: number;
        availableAgents: number;
        strategy: OrchestrationStrategy;
    };
}
//# sourceMappingURL=Orchestrator.d.ts.map