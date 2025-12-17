"use strict";
// ============================================
// src/a2a/conversation/ConversationManager.ts
// Conversation Manager - Manages multi-agent conversations
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationManager = void 0;
const uuid_1 = require("uuid");
class ConversationManager {
    conversations = new Map();
    events = new Map();
    /**
     * Create a new conversation
     */
    createConversation(userId, goal, projectId, metadata) {
        const conversation = {
            id: (0, uuid_1.v4)(),
            userId,
            projectId,
            goal,
            messages: [],
            tasks: [],
            participants: [],
            metadata: metadata || {},
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.conversations.set(conversation.id, conversation);
        this.emitEvent(conversation.id, 'conversation_started');
        return conversation;
    }
    /**
     * Get conversation by ID
     */
    getConversation(conversationId) {
        return this.conversations.get(conversationId);
    }
    /**
     * Get all conversations for a user
     */
    getUserConversations(userId) {
        return Array.from(this.conversations.values()).filter(conv => conv.userId === userId);
    }
    /**
     * Add message to conversation
     */
    addMessage(conversationId, fromAgentId, toAgentId, content, priority = 'normal', metadata) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        const message = {
            id: (0, uuid_1.v4)(),
            fromAgentId,
            toAgentId,
            conversationId,
            content,
            priority,
            metadata,
            timestamp: new Date(),
        };
        conversation.messages.push(message);
        conversation.updatedAt = new Date();
        // Add participants if not already present
        if (!conversation.participants.includes(fromAgentId)) {
            conversation.participants.push(fromAgentId);
            this.emitEvent(conversationId, 'agent_joined', { agentId: fromAgentId });
        }
        if (!conversation.participants.includes(toAgentId)) {
            conversation.participants.push(toAgentId);
            this.emitEvent(conversationId, 'agent_joined', { agentId: toAgentId });
        }
        this.emitEvent(conversationId, 'message_sent', { messageId: message.id });
        return message;
    }
    /**
     * Add task to conversation
     */
    addTask(conversationId, assignedToAgentId, createdByAgentId, title, description, priority = 'normal', dependencies = [], input, metadata) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        const task = {
            id: (0, uuid_1.v4)(),
            conversationId,
            assignedToAgentId,
            createdByAgentId,
            title,
            description,
            status: 'pending',
            priority,
            dependencies,
            input,
            metadata,
        };
        conversation.tasks.push(task);
        conversation.updatedAt = new Date();
        this.emitEvent(conversationId, 'task_assigned', {
            taskId: task.id,
            agentId: assignedToAgentId,
        });
        return task;
    }
    /**
     * Update task status
     */
    updateTaskStatus(conversationId, taskId, status, output, error) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        const task = conversation.tasks.find(t => t.id === taskId);
        if (!task) {
            throw new Error(`Task ${taskId} not found`);
        }
        task.status = status;
        task.output = output;
        task.error = error;
        conversation.updatedAt = new Date();
        if (status === 'in_progress' && !task.startedAt) {
            task.startedAt = new Date();
        }
        if (status === 'completed' || status === 'failed') {
            task.completedAt = new Date();
            const eventType = status === 'completed' ? 'task_completed' : 'task_failed';
            this.emitEvent(conversationId, eventType, {
                taskId: task.id,
                agentId: task.assignedToAgentId,
            });
        }
    }
    /**
     * Get conversation messages
     */
    getMessages(conversationId) {
        const conversation = this.getConversation(conversationId);
        return conversation ? conversation.messages : [];
    }
    /**
     * Get conversation tasks
     */
    getTasks(conversationId) {
        const conversation = this.getConversation(conversationId);
        return conversation ? conversation.tasks : [];
    }
    /**
     * Get pending tasks
     */
    getPendingTasks(conversationId) {
        return this.getTasks(conversationId).filter(task => task.status === 'pending' || task.status === 'assigned');
    }
    /**
     * Get completed tasks
     */
    getCompletedTasks(conversationId) {
        return this.getTasks(conversationId).filter(task => task.status === 'completed');
    }
    /**
     * Get failed tasks
     */
    getFailedTasks(conversationId) {
        return this.getTasks(conversationId).filter(task => task.status === 'failed');
    }
    /**
     * Get tasks assigned to an agent
     */
    getAgentTasks(conversationId, agentId) {
        return this.getTasks(conversationId).filter(task => task.assignedToAgentId === agentId);
    }
    /**
     * Get conversation participants
     */
    getParticipants(conversationId) {
        const conversation = this.getConversation(conversationId);
        return conversation ? conversation.participants : [];
    }
    /**
     * Record agent handoff
     */
    recordHandoff(conversationId, fromAgentId, toAgentId, reason, context, taskId) {
        const handoff = {
            fromAgentId,
            toAgentId,
            conversationId,
            reason,
            context,
            taskId,
            timestamp: new Date(),
        };
        this.emitEvent(conversationId, 'handoff_initiated', {
            fromAgentId,
            toAgentId,
            taskId,
        });
        return handoff;
    }
    /**
     * Mark conversation as completed
     */
    completeConversation(conversationId) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        conversation.updatedAt = new Date();
        this.emitEvent(conversationId, 'conversation_completed');
    }
    /**
     * Mark conversation as failed
     */
    failConversation(conversationId, reason) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        conversation.metadata = {
            ...conversation.metadata,
            failureReason: reason,
        };
        conversation.updatedAt = new Date();
        this.emitEvent(conversationId, 'conversation_failed', { reason });
    }
    /**
     * Generate conversation summary
     */
    generateSummary(conversationId) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        const completedTasks = this.getCompletedTasks(conversationId);
        const failedTasks = this.getFailedTasks(conversationId);
        // Count tasks by agent
        const agentTaskCounts = new Map();
        for (const task of completedTasks) {
            const count = agentTaskCounts.get(task.assignedToAgentId) || 0;
            agentTaskCounts.set(task.assignedToAgentId, count + 1);
        }
        const agentsParticipated = Array.from(agentTaskCounts.entries()).map(([agentId, tasksCompleted]) => ({
            agentId,
            role: 'unknown', // Would need agent registry to get role
            tasksCompleted,
        }));
        // Extract key decisions from messages
        const keyDecisions = this.extractKeyDecisions(conversation.messages);
        // Extract deliverables from completed tasks
        const deliverables = completedTasks
            .filter(task => task.output)
            .map(task => ({
            type: task.title,
            description: task.description,
            output: task.output,
        }));
        const duration = conversation.updatedAt.getTime() - conversation.createdAt.getTime();
        const outcome = failedTasks.length > 0
            ? `Completed with ${failedTasks.length} failed tasks`
            : 'Successfully completed';
        return {
            conversationId,
            goal: conversation.goal,
            outcome,
            agentsParticipated,
            keyDecisions,
            deliverables,
            duration,
            timestamp: new Date(),
        };
    }
    /**
     * Extract key decisions from messages
     */
    extractKeyDecisions(messages) {
        const decisions = [];
        for (const message of messages) {
            // Look for decision indicators in message content
            const content = message.content.toLowerCase();
            if (content.includes('decided') ||
                content.includes('concluded') ||
                content.includes('determined') ||
                content.includes('agreed')) {
                decisions.push(message.content.substring(0, 200));
            }
        }
        return decisions.slice(0, 5); // Return top 5 decisions
    }
    /**
     * Get conversation events
     */
    getEvents(conversationId) {
        return this.events.get(conversationId) || [];
    }
    /**
     * Emit conversation event
     */
    emitEvent(conversationId, type, data) {
        const event = {
            type,
            conversationId,
            agentId: data?.agentId,
            taskId: data?.taskId,
            messageId: data?.messageId,
            data,
            timestamp: new Date(),
        };
        if (!this.events.has(conversationId)) {
            this.events.set(conversationId, []);
        }
        this.events.get(conversationId).push(event);
        // Keep only last 1000 events per conversation
        const events = this.events.get(conversationId);
        if (events.length > 1000) {
            events.shift();
        }
    }
    /**
     * Get conversation statistics
     */
    getConversationStats(conversationId) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        const completedTasks = this.getCompletedTasks(conversationId);
        const failedTasks = this.getFailedTasks(conversationId);
        const pendingTasks = this.getPendingTasks(conversationId);
        const duration = conversation.updatedAt.getTime() - conversation.createdAt.getTime();
        return {
            totalMessages: conversation.messages.length,
            totalTasks: conversation.tasks.length,
            completedTasks: completedTasks.length,
            failedTasks: failedTasks.length,
            pendingTasks: pendingTasks.length,
            participants: conversation.participants.length,
            duration,
        };
    }
    /**
     * Delete conversation
     */
    deleteConversation(conversationId) {
        this.conversations.delete(conversationId);
        this.events.delete(conversationId);
    }
    /**
     * Get all conversations
     */
    getAllConversations() {
        return Array.from(this.conversations.values());
    }
    /**
     * Get active conversations (have pending tasks)
     */
    getActiveConversations() {
        return this.getAllConversations().filter(conv => {
            const pendingTasks = this.getPendingTasks(conv.id);
            return pendingTasks.length > 0;
        });
    }
    /**
     * Get conversation count
     */
    getConversationCount() {
        return this.conversations.size;
    }
    /**
     * Check if conversation exists
     */
    hasConversation(conversationId) {
        return this.conversations.has(conversationId);
    }
    /**
     * Clear all conversations
     */
    clear() {
        this.conversations.clear();
        this.events.clear();
    }
    /**
     * Get recent conversations
     */
    getRecentConversations(limit = 10) {
        return Array.from(this.conversations.values())
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
            .slice(0, limit);
    }
    /**
     * Search conversations by goal
     */
    searchConversations(query) {
        const lowerQuery = query.toLowerCase();
        return this.getAllConversations().filter(conv => conv.goal.toLowerCase().includes(lowerQuery));
    }
    /**
     * Get conversation by project
     */
    getProjectConversations(projectId) {
        return this.getAllConversations().filter(conv => conv.projectId === projectId);
    }
    /**
     * Update conversation metadata
     */
    updateMetadata(conversationId, metadata) {
        const conversation = this.getConversation(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        conversation.metadata = { ...conversation.metadata, ...metadata };
        conversation.updatedAt = new Date();
    }
}
exports.ConversationManager = ConversationManager;
//# sourceMappingURL=ConversationManager.js.map