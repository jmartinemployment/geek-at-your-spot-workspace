import { ExtendedContextConfig, ContextWindow, ContextMessage, CompressionStrategy, ContextSnapshot, OptimizationResult, ContextManagerStats, SummarizationRequest, SummarizationResult, MessageRetrievalOptions, ContextSplitOptions, ConversationChunk } from './types';
export declare class ExtendedContextService {
    private config;
    private windowManager;
    private compressor;
    private initialized;
    private stats;
    constructor(config: Partial<ExtendedContextConfig>);
    /**
     * Initialize service
     */
    initialize(): Promise<void>;
    /**
     * Add message to conversation
     */
    addMessage(conversationId: string, role: 'user' | 'assistant' | 'system', content: string, metadata?: Record<string, any>): Promise<ContextMessage>;
    /**
     * Get messages from conversation
     */
    getMessages(conversationId: string, options?: MessageRetrievalOptions): ContextMessage[];
    /**
     * Get context window
     */
    getWindow(conversationId: string): ContextWindow | undefined;
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
    };
    /**
     * Compress conversation manually
     */
    compress(conversationId: string, strategy?: CompressionStrategy): Promise<OptimizationResult>;
    /**
     * Create snapshot
     */
    createSnapshot(conversationId: string, description?: string): Promise<ContextSnapshot>;
    /**
     * Restore from snapshot
     */
    restoreSnapshot(conversationId: string, snapshotId: string): Promise<void>;
    /**
     * Get snapshots
     */
    getSnapshots(conversationId: string): ContextSnapshot[];
    /**
     * Summarize conversation
     */
    summarize(request: SummarizationRequest): Promise<SummarizationResult>;
    /**
     * Split conversation into chunks
     */
    splitIntoChunks(conversationId: string, options: ContextSplitOptions): ConversationChunk[];
    /**
     * Get overlap messages for chunking
     */
    private getOverlapMessages;
    /**
     * Count tokens in text
     */
    countTokens(text: string): number;
    /**
     * Estimate conversation tokens
     */
    estimateTokens(params: {
        systemPrompt?: string;
        messages: Array<{
            role: string;
            content: string;
        }>;
        tools?: any[];
        maxResponseTokens?: number;
    }): {
        system: number;
        messages: number;
        tools: number;
        maxResponse: number;
        total: number;
    };
    /**
     * Check if conversation needs compression
     */
    needsCompression(conversationId: string): boolean;
    /**
     * Get service statistics
     */
    getStats(): ContextManagerStats & typeof this.stats;
    /**
     * Health check
     */
    healthCheck(): Promise<{
        enabled: boolean;
        initialized: boolean;
        activeWindows: number;
        averageUsage: number;
    }>;
    /**
     * Clear conversation
     */
    clearConversation(conversationId: string): void;
    /**
     * Update configuration
     */
    updateConfig(config: Partial<ExtendedContextConfig>): void;
    /**
     * Get configuration
     */
    getConfig(): ExtendedContextConfig;
    /**
     * Check if enabled
     */
    isEnabled(): boolean;
    /**
     * Check if initialized
     */
    isInitialized(): boolean;
    /**
     * Get events for conversation
     */
    getEvents(conversationId: string): import("./types").ContextEvent[];
    /**
     * Update compression strategy
     */
    updateStrategy(conversationId: string, strategy: CompressionStrategy): void;
}
//# sourceMappingURL=ExtendedContextService.d.ts.map