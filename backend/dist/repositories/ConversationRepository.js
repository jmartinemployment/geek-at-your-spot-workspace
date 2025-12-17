"use strict";
// ============================================
// src/repositories/ConversationRepository.ts
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRepository = void 0;
class ConversationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    /**
     * Create a new conversation
     */
    async create(data) {
        return await this.prisma.conversation.create({
            data: {
                leadId: data.leadId,
                messages: data.messages, // Prisma Json type
                aiModel: data.aiModel || 'claude-sonnet-4',
                tokenCount: data.tokenCount,
                cost: data.cost
            }
        });
    }
    /**
     * Find conversation by ID
     */
    async findById(id) {
        return await this.prisma.conversation.findUnique({
            where: { id },
            include: {
                lead: true
            }
        });
    }
    /**
     * Get all conversations for a lead
     */
    async findByLeadId(leadId) {
        return await this.prisma.conversation.findMany({
            where: { leadId },
            orderBy: { createdAt: 'desc' }
        });
    }
    /**
     * Get the most recent conversation for a lead
     */
    async findLatestByLeadId(leadId) {
        return await this.prisma.conversation.findFirst({
            where: { leadId },
            orderBy: { createdAt: 'desc' }
        });
    }
    /**
     * Update conversation (add messages)
     */
    async appendMessages(id, newMessages) {
        const conversation = await this.findById(id);
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        const existingMessages = conversation.messages;
        const updatedMessages = [...existingMessages, ...newMessages];
        return await this.prisma.conversation.update({
            where: { id },
            data: {
                messages: updatedMessages
            }
        });
    }
    /**
     * Get total API cost for a lead
     */
    async getTotalCostByLeadId(leadId) {
        const result = await this.prisma.conversation.aggregate({
            where: { leadId },
            _sum: {
                cost: true
            }
        });
        return Number(result._sum.cost || 0);
    }
    /**
     * Get total token usage
     */
    async getTotalTokens() {
        const result = await this.prisma.conversation.aggregate({
            _sum: {
                tokenCount: true
            }
        });
        return result._sum.tokenCount || 0;
    }
}
exports.ConversationRepository = ConversationRepository;
//# sourceMappingURL=ConversationRepository.js.map