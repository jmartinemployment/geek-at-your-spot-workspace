import { ContextWindow, ContextMessage, ContextWindowConfig, CompressionStrategy, ContextSnapshot, ContextEvent, MessageRetrievalOptions, OptimizationResult } from '../types';
export declare class ContextWindowManager {
    private windows;
    private snapshots;
    private events;
    private compressor;
    private config;
    constructor(anthropicApiKey: string, config?: Partial<ContextWindowConfig>);
    /**
     * Create a new context window
     */
    createWindow(conversationId: string): ContextWindow;
    /**
     * Get context window
     */
    getWindow(conversationId: string): ContextWindow | undefined;
    /**
     * Add message to context window
     */
    addMessage(conversationId: string, role: 'user' | 'assistant' | 'system', content: string, metadata?: Record<string, any>): Promise<ContextMessage>;
    /**
     * Get messages from window
     */
    getMessages(conversationId: string, options?: MessageRetrievalOptions): ContextMessage[];
    /**
     * Check if compression is needed and compress if necessary
     */
    private checkAndCompress;
    /**
     * Compress context window
     */
    compressWindow(conversationId: string): Promise<OptimizationResult>;
    /**
     * Create snapshot of current window state
     */
    createSnapshot(conversationId: string, description?: string): Promise<ContextSnapshot>;
    /**
     * Restore window from snapshot
     */
    restoreFromSnapshot(conversationId: string, snapshotId: string): Promise<void>;
    /**
     * Get snapshots for conversation
     */
    getSnapshots(conversationId: string): ContextSnapshot[];
    /**
     * Calculate message importance
     */
    private calculateMessageImportance;
    /**
     * Get window statistics
     */
    getWindowStats(conversationId: string): {
        totalMessages: number;
        totalTokens: number;
        maxTokens: number;
        usagePercent: number;
        averageMessageTokens: number;
        compressedMessages: number;
    } | null;
    /**
     * Update compression strategy
     */
    updateStrategy(conversationId: string, strategy: CompressionStrategy): void;
    /**
     * Clear window
     */
    clearWindow(conversationId: string): void;
    /**
     * Get events
     */
    getEvents(conversationId: string): ContextEvent[];
    /**
     * Emit event
     */
    private emitEvent;
    /**
     * Get all windows
     */
    getAllWindows(): ContextWindow[];
    /**
     * Check if window exists
     */
    hasWindow(conversationId: string): boolean;
    /**
     * Get configuration
     */
    getConfig(): ContextWindowConfig;
    /**
     * Update configuration
     */
    updateConfig(config: Partial<ContextWindowConfig>): void;
}
//# sourceMappingURL=ContextWindowManager.d.ts.map