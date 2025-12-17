import { PrismaClient, Conversation } from '@prisma/client';
import { ChatMessage } from '../types';
export declare class ConversationRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    /**
     * Create a new conversation
     */
    create(data: {
        leadId: number;
        messages: ChatMessage[];
        aiModel?: string;
        tokenCount?: number;
        cost?: number;
    }): Promise<Conversation>;
    /**
     * Find conversation by ID
     */
    findById(id: number): Promise<Conversation | null>;
    /**
     * Get all conversations for a lead
     */
    findByLeadId(leadId: number): Promise<Conversation[]>;
    /**
     * Get the most recent conversation for a lead
     */
    findLatestByLeadId(leadId: number): Promise<Conversation | null>;
    /**
     * Update conversation (add messages)
     */
    appendMessages(id: number, newMessages: ChatMessage[]): Promise<Conversation>;
    /**
     * Get total API cost for a lead
     */
    getTotalCostByLeadId(leadId: number): Promise<number>;
    /**
     * Get total token usage
     */
    getTotalTokens(): Promise<number>;
}
//# sourceMappingURL=ConversationRepository.d.ts.map