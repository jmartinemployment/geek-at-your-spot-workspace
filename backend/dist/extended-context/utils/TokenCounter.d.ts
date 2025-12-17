import { TokenCountOptions } from '../types';
export declare class TokenCounter {
    private static readonly RATIOS;
    /**
     * Count tokens in text (approximate)
     * Uses character-based estimation since we don't have tiktoken in Node.js
     */
    static countTokens(text: string, options?: TokenCountOptions): number;
    /**
     * Count tokens in multiple messages
     */
    static countMessagesTokens(messages: Array<{
        role: string;
        content: string;
    }>): number;
    /**
     * Detect content type for better token estimation
     */
    private static detectContentType;
    /**
     * Count special tokens (emojis, special characters, etc.)
     */
    private static countSpecialTokens;
    /**
     * Estimate tokens for a conversation with history
     */
    static estimateConversationTokens(params: {
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
     * Calculate how many messages fit in token budget
     */
    static calculateMessageLimit(messages: Array<{
        role: string;
        content: string;
    }>, maxTokens: number, systemTokens?: number): {
        messageCount: number;
        totalTokens: number;
        remainingTokens: number;
    };
    /**
     * Split text into chunks that fit within token limit
     */
    static splitIntoChunks(text: string, maxTokensPerChunk: number, overlapTokens?: number): string[];
    /**
     * Get last N tokens from text (approximate)
     */
    private static getLastNTokens;
    /**
     * Trim text to fit within token limit
     */
    static trimToTokenLimit(text: string, maxTokens: number): string;
    /**
     * Get token budget breakdown
     */
    static calculateTokenBudget(maxTokens: number, allocations: {
        system?: number;
        history?: number;
        current?: number;
        response?: number;
        buffer?: number;
    }): {
        total: number;
        system: number;
        history: number;
        current: number;
        response: number;
        buffer: number;
    };
    /**
     * Check if text exceeds token limit
     */
    static exceedsLimit(text: string, limit: number): boolean;
    /**
     * Get token usage percentage
     */
    static getUsagePercentage(currentTokens: number, maxTokens: number): number;
    /**
     * Estimate compression ratio needed
     */
    static estimateCompressionNeeded(currentTokens: number, targetTokens: number): number;
}
//# sourceMappingURL=TokenCounter.d.ts.map