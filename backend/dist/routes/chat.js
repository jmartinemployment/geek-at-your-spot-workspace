"use strict";
// ============================================
// src/routes/chat.ts
// Chat API Routes
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const LeadRepository_1 = require("../repositories/LeadRepository");
const ConversationRepository_1 = require("../repositories/ConversationRepository");
const ClaudeService_1 = require("../services/ClaudeService");
const security_1 = require("../middleware/security");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const leadRepo = new LeadRepository_1.LeadRepository(prisma);
const conversationRepo = new ConversationRepository_1.ConversationRepository(prisma);
const claudeService = new ClaudeService_1.ClaudeService(process.env.ANTHROPIC_API_KEY);
/**
 * POST /api/chat
 * Main chat endpoint for GeekQuote AI
 */
router.post('/chat', security_1.checkApiKey, security_1.validateChatRequest, async (req, res) => {
    try {
        const { messages, leadInfo } = req.body;
        console.log('💬 Chat request received:', {
            messageCount: messages.length,
            hasLeadInfo: !!leadInfo
        });
        // Find or create lead
        let lead;
        if (leadInfo?.email) {
            lead = await leadRepo.findByEmail(leadInfo.email);
            if (!lead) {
                console.log('📝 Creating new lead:', leadInfo.email);
                lead = await leadRepo.create({
                    name: leadInfo.name || 'Anonymous',
                    email: leadInfo.email,
                    phone: leadInfo.phone,
                    company: leadInfo.company,
                    projectDescription: messages[0]?.content || 'Initial inquiry',
                    source: 'geek-quote-ai',
                    ipAddress: req.ip,
                    userAgent: req.headers['user-agent']
                });
            }
            else {
                console.log('✅ Found existing lead:', lead.id);
            }
        }
        // Get AI response from Claude
        console.log('🤖 Calling Claude API...');
        const aiResult = await claudeService.chat(messages);
        console.log('✅ Claude response received:', {
            hasEstimate: !!aiResult.estimate,
            tokenCount: aiResult.tokenCount
        });
        // Save conversation if we have a lead
        let conversationId;
        if (lead) {
            const conversation = await conversationRepo.create({
                leadId: lead.id,
                messages: [...messages, { role: 'assistant', content: aiResult.response }],
                tokenCount: aiResult.tokenCount,
                cost: claudeService.calculateCost(aiResult.tokenCount)
            });
            conversationId = conversation.id;
            // If we got an estimate, update the lead
            if (aiResult.estimate) {
                console.log('💰 Updating lead with estimate');
                await leadRepo.addEstimate(lead.id, {
                    minBudget: aiResult.estimate.minBudget,
                    maxBudget: aiResult.estimate.maxBudget,
                    timeline: aiResult.estimate.timeline
                });
            }
        }
        const response = {
            response: aiResult.response,
            leadId: lead?.id,
            conversationId,
            estimate: aiResult.estimate
        };
        res.json(response);
    }
    catch (error) {
        console.error('❌ Chat error:', error);
        res.status(500).json({
            error: 'Failed to process chat request',
            code: 'CHAT_ERROR'
        });
    }
});
/**
 * GET /api/chat/conversation/:id
 * Get conversation by ID
 */
router.get('/conversation/:id', security_1.checkApiKey, async (req, res) => {
    try {
        const conversationId = parseInt(req.params.id);
        const conversation = await conversationRepo.findById(conversationId);
        if (!conversation) {
            res.status(404).json({
                error: 'Conversation not found',
                code: 'NOT_FOUND'
            });
            return;
        }
        res.json(conversation);
    }
    catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({
            error: 'Failed to fetch conversation',
            code: 'FETCH_ERROR'
        });
    }
});
exports.default = router;
//# sourceMappingURL=chat.js.map