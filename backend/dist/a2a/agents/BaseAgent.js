"use strict";
// ============================================
// src/a2a/agents/BaseAgent.ts
// Base Agent Class - Foundation for all specialized agents
// ============================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAgent = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
class BaseAgent {
    config;
    state;
    metrics;
    client;
    conversationHistory = new Map();
    constructor(config, anthropicApiKey) {
        this.config = config;
        // Initialize state
        this.state = {
            id: config.id,
            status: 'idle',
            tasksCompleted: 0,
            tasksFailed: 0,
            averageResponseTime: 0,
            lastActiveAt: new Date(),
        };
        // Initialize metrics
        this.metrics = {
            agentId: config.id,
            totalTasks: 0,
            completedTasks: 0,
            failedTasks: 0,
            successRate: 0,
            averageResponseTime: 0,
            averageTaskDuration: 0,
            currentLoad: 0,
            lastActive: new Date(),
        };
        // Initialize Anthropic client
        this.client = new sdk_1.default({
            apiKey: anthropicApiKey,
        });
    }
    /**
     * Process a message from another agent or user
     */
    async processMessage(message) {
        if (!this.config.enabled) {
            throw new Error(`Agent ${this.config.id} is disabled`);
        }
        const startTime = Date.now();
        this.state.status = 'busy';
        this.state.lastActiveAt = new Date();
        try {
            // Add message to conversation history
            this.addToConversationHistory(message.conversationId, message);
            // Get conversation context
            const conversationHistory = this.conversationHistory.get(message.conversationId) || [];
            // Build prompt
            const prompt = this.buildPrompt(message, conversationHistory);
            // Call Claude API
            const response = await this.client.messages.create({
                model: this.config.model || 'claude-sonnet-4-20250514',
                max_tokens: this.config.maxTokens || 4096,
                temperature: this.config.temperature ?? 1.0,
                system: this.config.systemPrompt,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });
            // Extract response text
            const textBlocks = response.content.filter((block) => block.type === 'text');
            const responseText = textBlocks.map((block) => block.text).join('\n');
            // Parse response
            const agentResponse = this.parseResponse(responseText);
            // Update metrics
            const duration = Date.now() - startTime;
            this.updateMetrics(duration, true);
            // Update state
            this.state.status = 'idle';
            this.state.tasksCompleted++;
            return agentResponse;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            this.updateMetrics(duration, false);
            this.state.status = 'idle';
            this.state.tasksFailed++;
            throw new Error(`Agent ${this.config.id} failed to process message: ${error.message}`);
        }
    }
    /**
     * Execute a task
     */
    async executeTask(task) {
        const startTime = Date.now();
        this.state.status = 'busy';
        this.state.currentTask = task.id;
        this.metrics.currentLoad++;
        try {
            // Check if agent can handle this task
            if (!this.canHandleTask(task)) {
                throw new Error(`Agent ${this.config.id} cannot handle task: ${task.title}`);
            }
            // Execute task-specific logic (implemented by subclasses)
            const result = await this.executeTaskLogic(task);
            // Update metrics
            const duration = Date.now() - startTime;
            this.updateMetrics(duration, true);
            this.updateTaskMetrics(duration);
            // Update state
            this.state.status = 'idle';
            this.state.currentTask = undefined;
            this.state.tasksCompleted++;
            this.metrics.currentLoad--;
            return result;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            this.updateMetrics(duration, false);
            this.state.status = 'idle';
            this.state.currentTask = undefined;
            this.state.tasksFailed++;
            this.metrics.currentLoad--;
            throw error;
        }
    }
    /**
     * Check if agent can handle a task (override in subclasses)
     */
    canHandleTask(task) {
        // Default implementation - subclasses should override
        return true;
    }
    /**
     * Build prompt for Claude API
     */
    buildPrompt(message, conversationHistory) {
        let prompt = `You are ${this.config.name}, a ${this.config.role} agent.\n\n`;
        prompt += `Your role: ${this.config.description}\n\n`;
        // Add conversation history if available
        if (conversationHistory.length > 1) {
            prompt += `Conversation history:\n`;
            for (const msg of conversationHistory.slice(-5)) {
                prompt += `- ${msg.fromAgentId}: ${msg.content}\n`;
            }
            prompt += `\n`;
        }
        // Add current message
        prompt += `Current message from ${message.fromAgentId}:\n${message.content}\n\n`;
        // Add capabilities
        prompt += `Your capabilities:\n`;
        const caps = this.config.capabilities;
        if (caps.canResearch)
            prompt += `- Research and gather information\n`;
        if (caps.canCode)
            prompt += `- Write and review code\n`;
        if (caps.canDesign)
            prompt += `- Create designs and mockups\n`;
        if (caps.canAnalyze)
            prompt += `- Analyze data and provide insights\n`;
        if (caps.canWrite)
            prompt += `- Write documentation and content\n`;
        if (caps.canEstimate)
            prompt += `- Estimate costs and timelines\n`;
        if (caps.canManageProjects)
            prompt += `- Manage projects and coordinate teams\n`;
        if (caps.canTestQA)
            prompt += `- Test software and ensure quality\n`;
        prompt += `\nProvide your response. If you need to delegate to another agent, specify who and why.`;
        return prompt;
    }
    /**
     * Parse Claude's response into structured format
     */
    parseResponse(responseText) {
        const response = {
            agentId: this.config.id,
            content: responseText,
        };
        // Try to extract structured information
        // Look for delegation indicators
        const delegationMatch = responseText.match(/DELEGATE TO: (\w+)\s*-\s*(.+)/i);
        if (delegationMatch) {
            response.delegateTo = {
                agentId: delegationMatch[1],
                task: delegationMatch[2],
                reason: 'Agent requested delegation',
            };
        }
        // Look for next actions
        const actionsMatch = responseText.match(/NEXT ACTIONS?:([\s\S]+?)(?=\n\n|\n[A-Z]+:|$)/i);
        if (actionsMatch) {
            response.nextActions = actionsMatch[1]
                .split('\n')
                .map(line => line.trim())
                .filter(line => line && line.startsWith('-'))
                .map(line => line.substring(1).trim());
        }
        // Look for information requests
        const infoMatch = responseText.match(/NEED INFO FROM: (\w+)\s*-\s*(.+)/i);
        if (infoMatch) {
            response.requestsInfo = [{
                    from: infoMatch[1],
                    question: infoMatch[2],
                }];
        }
        return response;
    }
    /**
     * Add message to conversation history
     */
    addToConversationHistory(conversationId, message) {
        if (!this.conversationHistory.has(conversationId)) {
            this.conversationHistory.set(conversationId, []);
        }
        const history = this.conversationHistory.get(conversationId);
        history.push(message);
        // Keep only last 50 messages per conversation
        if (history.length > 50) {
            history.shift();
        }
    }
    /**
     * Update metrics after task execution
     */
    updateMetrics(duration, success) {
        this.metrics.totalTasks++;
        if (success) {
            this.metrics.completedTasks++;
        }
        else {
            this.metrics.failedTasks++;
        }
        this.metrics.successRate = this.metrics.completedTasks / this.metrics.totalTasks;
        // Update average response time
        const totalTime = this.metrics.averageResponseTime * (this.metrics.totalTasks - 1) + duration;
        this.metrics.averageResponseTime = totalTime / this.metrics.totalTasks;
        this.metrics.lastActive = new Date();
    }
    /**
     * Update task-specific metrics
     */
    updateTaskMetrics(duration) {
        const totalDuration = this.metrics.averageTaskDuration * this.metrics.completedTasks;
        this.metrics.averageTaskDuration = (totalDuration + duration) / (this.metrics.completedTasks + 1);
    }
    /**
     * Get agent configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Get agent state
     */
    getState() {
        return { ...this.state };
    }
    /**
     * Get agent metrics
     */
    getMetrics() {
        return { ...this.metrics };
    }
    /**
     * Check if agent is available
     */
    isAvailable() {
        return (this.config.enabled &&
            this.state.status === 'idle' &&
            this.metrics.currentLoad < this.config.capabilities.maxConcurrentTasks);
    }
    /**
     * Get agent's current load
     */
    getCurrentLoad() {
        return this.metrics.currentLoad;
    }
    /**
     * Reset agent state (for testing)
     */
    reset() {
        this.state = {
            id: this.config.id,
            status: 'idle',
            tasksCompleted: 0,
            tasksFailed: 0,
            averageResponseTime: 0,
            lastActiveAt: new Date(),
        };
        this.conversationHistory.clear();
    }
    /**
     * Update agent configuration
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    /**
     * Enable/disable agent
     */
    setEnabled(enabled) {
        this.config.enabled = enabled;
        if (!enabled && this.state.status === 'busy') {
            this.state.status = 'idle';
        }
    }
    /**
     * Get conversation history
     */
    getConversationHistory(conversationId) {
        return this.conversationHistory.get(conversationId) || [];
    }
    /**
     * Clear conversation history
     */
    clearConversationHistory(conversationId) {
        this.conversationHistory.delete(conversationId);
    }
    /**
     * Get agent summary
     */
    getSummary() {
        return `${this.config.name} (${this.config.role}): ${this.metrics.completedTasks} tasks completed, ${this.metrics.successRate.toFixed(2)}% success rate`;
    }
}
exports.BaseAgent = BaseAgent;
//# sourceMappingURL=BaseAgent.js.map