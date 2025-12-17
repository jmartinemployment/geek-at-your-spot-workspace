import { ChatMessage, QuoteEstimate } from '../types';
export declare class ClaudeService {
    private client;
    private model;
    constructor(apiKey: string);
    /**
     * Get system prompt for GeekQuote AI
     */
    private getSystemPrompt;
    /**
     * Chat with Claude and get response
     */
    chat(messages: ChatMessage[]): Promise<{
        response: string;
        estimate?: QuoteEstimate;
        tokenCount: number;
    }>;
    /**
     * Estimate API cost for a conversation
     */
    calculateCost(tokenCount: number): number;
}
//# sourceMappingURL=ClaudeService.d.ts.map