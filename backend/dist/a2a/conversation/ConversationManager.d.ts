import { ConversationContext, AgentMessage, AgentTask, MessagePriority, TaskStatus, ConversationEvent, ConversationSummary, AgentHandoff } from '../types';
export declare class ConversationManager {
    private conversations;
    private events;
    /**
     * Create a new conversation
     */
    createConversation(userId: string, goal: string, projectId?: string, metadata?: Record<string, any>): ConversationContext;
    /**
     * Get conversation by ID
     */
    getConversation(conversationId: string): ConversationContext | undefined;
    /**
     * Get all conversations for a user
     */
    getUserConversations(userId: string): ConversationContext[];
    /**
     * Add message to conversation
     */
    addMessage(conversationId: string, fromAgentId: string, toAgentId: string, content: string, priority?: MessagePriority, metadata?: Record<string, any>): AgentMessage;
    /**
     * Add task to conversation
     */
    addTask(conversationId: string, assignedToAgentId: string, createdByAgentId: string, title: string, description: string, priority?: MessagePriority, dependencies?: string[], input?: any, metadata?: Record<string, any>): AgentTask;
    /**
     * Update task status
     */
    updateTaskStatus(conversationId: string, taskId: string, status: TaskStatus, output?: any, error?: string): void;
    /**
     * Get conversation messages
     */
    getMessages(conversationId: string): AgentMessage[];
    /**
     * Get conversation tasks
     */
    getTasks(conversationId: string): AgentTask[];
    /**
     * Get pending tasks
     */
    getPendingTasks(conversationId: string): AgentTask[];
    /**
     * Get completed tasks
     */
    getCompletedTasks(conversationId: string): AgentTask[];
    /**
     * Get failed tasks
     */
    getFailedTasks(conversationId: string): AgentTask[];
    /**
     * Get tasks assigned to an agent
     */
    getAgentTasks(conversationId: string, agentId: string): AgentTask[];
    /**
     * Get conversation participants
     */
    getParticipants(conversationId: string): string[];
    /**
     * Record agent handoff
     */
    recordHandoff(conversationId: string, fromAgentId: string, toAgentId: string, reason: string, context: string, taskId?: string): AgentHandoff;
    /**
     * Mark conversation as completed
     */
    completeConversation(conversationId: string): void;
    /**
     * Mark conversation as failed
     */
    failConversation(conversationId: string, reason: string): void;
    /**
     * Generate conversation summary
     */
    generateSummary(conversationId: string): ConversationSummary;
    /**
     * Extract key decisions from messages
     */
    private extractKeyDecisions;
    /**
     * Get conversation events
     */
    getEvents(conversationId: string): ConversationEvent[];
    /**
     * Emit conversation event
     */
    private emitEvent;
    /**
     * Get conversation statistics
     */
    getConversationStats(conversationId: string): {
        totalMessages: number;
        totalTasks: number;
        completedTasks: number;
        failedTasks: number;
        pendingTasks: number;
        participants: number;
        duration: number;
    };
    /**
     * Delete conversation
     */
    deleteConversation(conversationId: string): void;
    /**
     * Get all conversations
     */
    getAllConversations(): ConversationContext[];
    /**
     * Get active conversations (have pending tasks)
     */
    getActiveConversations(): ConversationContext[];
    /**
     * Get conversation count
     */
    getConversationCount(): number;
    /**
     * Check if conversation exists
     */
    hasConversation(conversationId: string): boolean;
    /**
     * Clear all conversations
     */
    clear(): void;
    /**
     * Get recent conversations
     */
    getRecentConversations(limit?: number): ConversationContext[];
    /**
     * Search conversations by goal
     */
    searchConversations(query: string): ConversationContext[];
    /**
     * Get conversation by project
     */
    getProjectConversations(projectId: string): ConversationContext[];
    /**
     * Update conversation metadata
     */
    updateMetadata(conversationId: string, metadata: Record<string, any>): void;
}
//# sourceMappingURL=ConversationManager.d.ts.map