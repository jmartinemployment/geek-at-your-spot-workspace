"use strict";
// ============================================
// src/extended-context/manager/ContextWindowManager.ts
// Context Window Manager - Manages conversation context windows
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextWindowManager = void 0;
const uuid_1 = require("uuid");
const TokenCounter_1 = require("../utils/TokenCounter");
const ContextCompressor_1 = require("../compression/ContextCompressor");
class ContextWindowManager {
    windows = new Map();
    snapshots = new Map();
    events = new Map();
    compressor;
    config;
    constructor(anthropicApiKey, config) {
        this.config = {
            maxTokens: config?.maxTokens || 180000, // 180K tokens (leave room for response)
            warningThreshold: config?.warningThreshold || 0.8, // 80%
            autoCompress: config?.autoCompress ?? true,
            compressionStrategy: config?.compressionStrategy || 'hybrid',
            preserveSystemMessages: config?.preserveSystemMessages ?? true,
            enableImportanceScoring: config?.enableImportanceScoring ?? true,
        };
        this.compressor = new ContextCompressor_1.ContextCompressor(anthropicApiKey);
    }
    /**
     * Create a new context window
     */
    createWindow(conversationId) {
        const window = {
            id: (0, uuid_1.v4)(),
            conversationId,
            messages: [],
            totalTokens: 0,
            maxTokens: this.config.maxTokens,
            strategy: this.config.compressionStrategy,
            lastUpdated: new Date(),
        };
        this.windows.set(conversationId, window);
        this.emitEvent(conversationId, 'message_added');
        return window;
    }
    /**
     * Get context window
     */
    getWindow(conversationId) {
        return this.windows.get(conversationId);
    }
    /**
     * Add message to context window
     */
    async addMessage(conversationId, role, content, metadata) {
        let window = this.windows.get(conversationId);
        if (!window) {
            window = this.createWindow(conversationId);
        }
        // Create message
        const message = {
            id: (0, uuid_1.v4)(),
            role,
            content,
            tokenCount: TokenCounter_1.TokenCounter.countTokens(content),
            timestamp: new Date(),
            metadata,
        };
        // Calculate importance if enabled
        if (this.config.enableImportanceScoring) {
            message.importance = this.calculateMessageImportance(message, window.messages);
        }
        // Add message
        window.messages.push(message);
        window.totalTokens += message.tokenCount;
        window.lastUpdated = new Date();
        this.emitEvent(conversationId, 'message_added', { messageId: message.id });
        // Check if we need to compress
        await this.checkAndCompress(conversationId);
        return message;
    }
    /**
     * Get messages from window
     */
    getMessages(conversationId, options) {
        const window = this.windows.get(conversationId);
        if (!window) {
            return [];
        }
        let messages = [...window.messages];
        // Apply filters
        if (options?.startIndex !== undefined) {
            messages = messages.slice(options.startIndex);
        }
        if (options?.endIndex !== undefined) {
            messages = messages.slice(0, options.endIndex + 1);
        }
        if (options?.limit) {
            messages = messages.slice(-options.limit);
        }
        if (options?.includeCompressed === false) {
            messages = messages.filter((msg) => !msg.compressed);
        }
        if (options?.minImportance !== undefined) {
            messages = messages.filter((msg) => (msg.importance || 0) >= options.minImportance);
        }
        return messages;
    }
    /**
     * Check if compression is needed and compress if necessary
     */
    async checkAndCompress(conversationId) {
        const window = this.windows.get(conversationId);
        if (!window) {
            return;
        }
        const usagePercent = (window.totalTokens / window.maxTokens) * 100;
        // Emit warning if approaching limit
        if (usagePercent >= this.config.warningThreshold * 100) {
            this.emitEvent(conversationId, 'threshold_warning', {
                usagePercent,
                totalTokens: window.totalTokens,
                maxTokens: window.maxTokens,
            });
        }
        // Auto-compress if enabled and threshold exceeded
        if (this.config.autoCompress && usagePercent >= this.config.warningThreshold * 100) {
            await this.compressWindow(conversationId);
        }
        // Hard limit - must compress
        if (usagePercent >= 95) {
            this.emitEvent(conversationId, 'threshold_exceeded', {
                usagePercent,
                totalTokens: window.totalTokens,
            });
            await this.compressWindow(conversationId);
        }
    }
    /**
     * Compress context window
     */
    async compressWindow(conversationId) {
        const window = this.windows.get(conversationId);
        if (!window) {
            throw new Error(`Window not found: ${conversationId}`);
        }
        // Create snapshot before compression
        await this.createSnapshot(conversationId, 'Before compression');
        const originalTokens = window.totalTokens;
        const targetTokens = Math.floor(window.maxTokens * 0.6); // Compress to 60%
        // Separate system messages if preserving
        const systemMessages = this.config.preserveSystemMessages
            ? window.messages.filter((msg) => msg.role === 'system')
            : [];
        const otherMessages = this.config.preserveSystemMessages
            ? window.messages.filter((msg) => msg.role !== 'system')
            : window.messages;
        // Compress
        const compressionResult = await this.compressor.compress(otherMessages, {
            strategy: window.strategy,
            targetTokens,
            preserveRecent: 5,
            preserveSystem: this.config.preserveSystemMessages,
            minImportance: 0.3,
        });
        if (!compressionResult.success) {
            throw new Error(`Compression failed: ${compressionResult.error}`);
        }
        // Create summary message if available
        if (compressionResult.summary) {
            const summaryMessage = {
                id: (0, uuid_1.v4)(),
                role: 'system',
                content: `[Conversation Summary]\n${compressionResult.summary}`,
                tokenCount: TokenCounter_1.TokenCounter.countTokens(compressionResult.summary),
                timestamp: new Date(),
                compressed: true,
                metadata: {
                    compressionRatio: compressionResult.compressionRatio,
                    messagesRemoved: compressionResult.messagesRemoved,
                },
            };
            // Update window
            const recentMessages = otherMessages.slice(-compressionResult.messagesPreserved);
            window.messages = [...systemMessages, summaryMessage, ...recentMessages];
            window.totalTokens = window.messages.reduce((sum, msg) => sum + msg.tokenCount, 0);
        }
        window.lastUpdated = new Date();
        this.emitEvent(conversationId, 'compressed', {
            originalTokens,
            compressedTokens: window.totalTokens,
            compressionRatio: compressionResult.compressionRatio,
        });
        const changes = [
            {
                type: 'summarized',
                messageId: 'summary',
                tokensSaved: originalTokens - window.totalTokens,
            },
        ];
        return {
            optimized: true,
            originalTokens,
            optimizedTokens: window.totalTokens,
            tokensSaved: originalTokens - window.totalTokens,
            changes,
        };
    }
    /**
     * Create snapshot of current window state
     */
    async createSnapshot(conversationId, description) {
        const window = this.windows.get(conversationId);
        if (!window) {
            throw new Error(`Window not found: ${conversationId}`);
        }
        const snapshot = {
            id: (0, uuid_1.v4)(),
            conversationId,
            timestamp: new Date(),
            window: JSON.parse(JSON.stringify(window)), // Deep copy
            description,
        };
        if (!this.snapshots.has(conversationId)) {
            this.snapshots.set(conversationId, []);
        }
        const snapshots = this.snapshots.get(conversationId);
        snapshots.push(snapshot);
        // Keep only last N snapshots (default: 5)
        const maxSnapshots = 5;
        if (snapshots.length > maxSnapshots) {
            snapshots.shift();
        }
        this.emitEvent(conversationId, 'snapshot_created', {
            snapshotId: snapshot.id,
        });
        return snapshot;
    }
    /**
     * Restore window from snapshot
     */
    async restoreFromSnapshot(conversationId, snapshotId) {
        const snapshots = this.snapshots.get(conversationId);
        if (!snapshots) {
            throw new Error(`No snapshots found for conversation: ${conversationId}`);
        }
        const snapshot = snapshots.find((s) => s.id === snapshotId);
        if (!snapshot) {
            throw new Error(`Snapshot not found: ${snapshotId}`);
        }
        // Restore window
        this.windows.set(conversationId, JSON.parse(JSON.stringify(snapshot.window)));
        this.emitEvent(conversationId, 'rollback_performed', {
            snapshotId,
        });
    }
    /**
     * Get snapshots for conversation
     */
    getSnapshots(conversationId) {
        return this.snapshots.get(conversationId) || [];
    }
    /**
     * Calculate message importance
     */
    calculateMessageImportance(message, existingMessages) {
        let score = 0;
        // User messages slightly more important
        if (message.role === 'user') {
            score += 0.2;
        }
        // Longer messages might be more important
        const avgLength = existingMessages.reduce((sum, msg) => sum + msg.content.length, 0) /
            (existingMessages.length || 1);
        if (message.content.length > avgLength) {
            score += 0.15;
        }
        // Keywords
        const importantKeywords = [
            'important',
            'critical',
            'must',
            'required',
            'decision',
            'action',
        ];
        const content = message.content.toLowerCase();
        for (const keyword of importantKeywords) {
            if (content.includes(keyword)) {
                score += 0.1;
            }
        }
        // Code blocks
        if (message.content.includes('```')) {
            score += 0.2;
        }
        // Questions
        if (message.content.includes('?')) {
            score += 0.1;
        }
        return Math.min(1, score);
    }
    /**
     * Get window statistics
     */
    getWindowStats(conversationId) {
        const window = this.windows.get(conversationId);
        if (!window) {
            return null;
        }
        const compressedMessages = window.messages.filter((msg) => msg.compressed).length;
        return {
            totalMessages: window.messages.length,
            totalTokens: window.totalTokens,
            maxTokens: window.maxTokens,
            usagePercent: (window.totalTokens / window.maxTokens) * 100,
            averageMessageTokens: window.messages.length > 0
                ? window.totalTokens / window.messages.length
                : 0,
            compressedMessages,
        };
    }
    /**
     * Update compression strategy
     */
    updateStrategy(conversationId, strategy) {
        const window = this.windows.get(conversationId);
        if (window) {
            window.strategy = strategy;
            window.lastUpdated = new Date();
        }
    }
    /**
     * Clear window
     */
    clearWindow(conversationId) {
        this.windows.delete(conversationId);
        this.snapshots.delete(conversationId);
        this.events.delete(conversationId);
    }
    /**
     * Get events
     */
    getEvents(conversationId) {
        return this.events.get(conversationId) || [];
    }
    /**
     * Emit event
     */
    emitEvent(conversationId, type, data) {
        const event = {
            type,
            conversationId,
            timestamp: new Date(),
            data,
        };
        if (!this.events.has(conversationId)) {
            this.events.set(conversationId, []);
        }
        this.events.get(conversationId).push(event);
        // Keep only last 100 events
        const events = this.events.get(conversationId);
        if (events.length > 100) {
            events.shift();
        }
    }
    /**
     * Get all windows
     */
    getAllWindows() {
        return Array.from(this.windows.values());
    }
    /**
     * Check if window exists
     */
    hasWindow(conversationId) {
        return this.windows.has(conversationId);
    }
    /**
     * Get configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Update configuration
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
}
exports.ContextWindowManager = ContextWindowManager;
//# sourceMappingURL=ContextWindowManager.js.map