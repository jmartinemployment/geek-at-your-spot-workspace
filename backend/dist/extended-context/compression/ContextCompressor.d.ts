import { ContextMessage, CompressionOptions, CompressionResult } from '../types';
export declare class ContextCompressor {
    private client;
    private model;
    constructor(anthropicApiKey: string, model?: string);
    /**
     * Compress messages using specified strategy
     */
    compress(messages: ContextMessage[], options: CompressionOptions): Promise<CompressionResult>;
    /**
     * Truncate strategy - Remove oldest messages
     */
    private compressByTruncation;
    /**
     * Summarize strategy - Summarize old messages
     */
    private compressBySummarization;
    /**
     * Hierarchical strategy - Multi-level summaries
     */
    private compressByHierarchical;
    /**
     * Importance strategy - Keep important messages
     */
    private compressByImportance;
    /**
     * Hybrid strategy - Combine multiple strategies
     */
    private compressByHybrid;
    /**
     * Calculate message importance
     */
    private calculateImportance;
    /**
     * Summarize messages using Claude
     */
    private summarizeMessages;
    /**
     * Build hierarchical summary tree
     */
    private buildHierarchicalSummary;
    /**
     * Calculate total tokens in hierarchical tree
     */
    private calculateTreeTokens;
    /**
     * Extract key points from text
     */
    private extractKeyPoints;
    /**
     * Extract decisions from conversation
     */
    private extractDecisions;
    /**
     * Extract action items from conversation
     */
    private extractActionItems;
}
//# sourceMappingURL=ContextCompressor.d.ts.map