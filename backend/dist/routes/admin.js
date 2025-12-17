"use strict";
// ============================================
// src/routes/admin.ts
// Admin API Routes (IP Protected)
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const LeadRepository_1 = require("../repositories/LeadRepository");
const ConversationRepository_1 = require("../repositories/ConversationRepository");
const security_1 = require("../middleware/security");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const leadRepo = new LeadRepository_1.LeadRepository(prisma);
const conversationRepo = new ConversationRepository_1.ConversationRepository(prisma);
// Apply security to all admin routes
router.use(security_1.checkApiKey);
router.use(security_1.checkIPWhitelist);
/**
 * GET /api/admin/leads
 * Get all leads with filtering and pagination
 */
router.get('/leads', async (req, res) => {
    try {
        const { status, source, search, skip = '0', take = '50' } = req.query;
        const result = await leadRepo.findAll({
            status: status,
            source: source,
            search: search,
            skip: parseInt(skip),
            take: parseInt(take)
        });
        res.json(result);
    }
    catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({
            error: 'Failed to fetch leads',
            code: 'FETCH_ERROR'
        });
    }
});
/**
 * GET /api/admin/leads/:id
 * Get single lead with full details
 */
router.get('/leads/:id', async (req, res) => {
    try {
        const leadId = parseInt(req.params.id);
        const lead = await leadRepo.findById(leadId);
        if (!lead) {
            res.status(404).json({
                error: 'Lead not found',
                code: 'NOT_FOUND'
            });
            return;
        }
        res.json(lead);
    }
    catch (error) {
        console.error('Error fetching lead:', error);
        res.status(500).json({
            error: 'Failed to fetch lead',
            code: 'FETCH_ERROR'
        });
    }
});
/**
 * PATCH /api/admin/leads/:id/status
 * Update lead status
 */
router.patch('/leads/:id/status', async (req, res) => {
    try {
        const leadId = parseInt(req.params.id);
        const { status } = req.body;
        if (!status) {
            res.status(400).json({
                error: 'Status is required',
                code: 'INVALID_REQUEST'
            });
            return;
        }
        const lead = await leadRepo.updateStatus(leadId, status);
        res.json(lead);
    }
    catch (error) {
        console.error('Error updating lead status:', error);
        res.status(500).json({
            error: 'Failed to update lead status',
            code: 'UPDATE_ERROR'
        });
    }
});
/**
 * GET /api/admin/stats
 * Get dashboard statistics
 */
router.get('/stats', async (req, res) => {
    try {
        const [conversionStats, statusCounts, recentLeads, totalTokens] = await Promise.all([
            leadRepo.getConversionStats(),
            leadRepo.countByStatus(),
            leadRepo.getRecentlyActive(7),
            conversationRepo.getTotalTokens()
        ]);
        res.json({
            conversion: conversionStats,
            statusCounts,
            recentLeads,
            totalTokens
        });
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            error: 'Failed to fetch statistics',
            code: 'FETCH_ERROR'
        });
    }
});
/**
 * GET /api/admin/conversations/:leadId
 * Get all conversations for a lead
 */
router.get('/conversations/:leadId', async (req, res) => {
    try {
        const leadId = parseInt(req.params.leadId);
        const conversations = await conversationRepo.findByLeadId(leadId);
        res.json(conversations);
    }
    catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({
            error: 'Failed to fetch conversations',
            code: 'FETCH_ERROR'
        });
    }
});
/**
 * DELETE /api/admin/leads/:id
 * Soft delete a lead
 */
router.delete('/leads/:id', async (req, res) => {
    try {
        const leadId = parseInt(req.params.id);
        const lead = await leadRepo.softDelete(leadId);
        res.json({
            message: 'Lead deleted successfully',
            lead
        });
    }
    catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({
            error: 'Failed to delete lead',
            code: 'DELETE_ERROR'
        });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map