"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * POST /api/extended-context/messages
 * Add message to conversation
 */
router.post('/messages', async (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService || !extContextService.isEnabled()) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId, role, content, metadata } = req.body;
        if (!conversationId || !role || !content) {
            return res.status(400).json({
                error: 'Missing required fields: conversationId, role, content',
            });
        }
        const message = await extContextService.addMessage(conversationId, role, content, metadata);
        return res.status(200).json(message);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to add message',
            message: error.message,
        });
    }
});
/**
 * GET /api/extended-context/messages/:conversationId
 * Get messages from conversation
 */
router.get('/messages/:conversationId', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const { startIndex, endIndex, limit, includeCompressed, minImportance } = req.query;
        const messages = extContextService.getMessages(conversationId, {
            startIndex: startIndex ? parseInt(startIndex) : undefined,
            endIndex: endIndex ? parseInt(endIndex) : undefined,
            limit: limit ? parseInt(limit) : undefined,
            includeCompressed: includeCompressed === 'true',
            minImportance: minImportance ? parseFloat(minImportance) : undefined,
        });
        return res.status(200).json({
            conversationId,
            messages,
            total: messages.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get messages',
            message: error.message,
        });
    }
});
/**
 * GET /api/extended-context/window/:conversationId
 * Get context window
 */
router.get('/window/:conversationId', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const window = extContextService.getWindow(conversationId);
        if (!window) {
            return res.status(404).json({
                error: 'Window not found',
            });
        }
        return res.status(200).json(window);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get window',
            message: error.message,
        });
    }
});
/**
 * GET /api/extended-context/stats/:conversationId
 * Get window statistics
 */
router.get('/stats/:conversationId', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const stats = extContextService.getWindowStats(conversationId);
        if (!stats) {
            return res.status(404).json({
                error: 'Stats not found',
            });
        }
        return res.status(200).json(stats);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get stats',
            message: error.message,
        });
    }
});
/**
 * POST /api/extended-context/compress/:conversationId
 * Compress conversation
 */
router.post('/compress/:conversationId', async (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const { strategy } = req.body;
        const result = await extContextService.compress(conversationId, strategy);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Compression failed',
            message: error.message,
        });
    }
});
/**
 * POST /api/extended-context/snapshots/:conversationId
 * Create snapshot
 */
router.post('/snapshots/:conversationId', async (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const { description } = req.body;
        const snapshot = await extContextService.createSnapshot(conversationId, description);
        return res.status(200).json(snapshot);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to create snapshot',
            message: error.message,
        });
    }
});
/**
 * GET /api/extended-context/snapshots/:conversationId
 * Get snapshots
 */
router.get('/snapshots/:conversationId', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const snapshots = extContextService.getSnapshots(conversationId);
        return res.status(200).json({
            conversationId,
            snapshots,
            total: snapshots.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get snapshots',
            message: error.message,
        });
    }
});
/**
 * POST /api/extended-context/restore/:conversationId
 * Restore from snapshot
 */
router.post('/restore/:conversationId', async (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const { snapshotId } = req.body;
        if (!snapshotId) {
            return res.status(400).json({
                error: 'Missing required field: snapshotId',
            });
        }
        await extContextService.restoreSnapshot(conversationId, snapshotId);
        return res.status(200).json({
            message: 'Snapshot restored successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to restore snapshot',
            message: error.message,
        });
    }
});
/**
 * POST /api/extended-context/summarize
 * Summarize conversation
 */
router.post('/summarize', async (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId, targetLength, focusAreas, includeDecisions, includeActionItems } = req.body;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing required field: conversationId',
            });
        }
        const result = await extContextService.summarize({
            conversationId,
            messages: extContextService.getMessages(conversationId),
            targetLength,
            focusAreas,
            includeDecisions,
            includeActionItems,
        });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Summarization failed',
            message: error.message,
        });
    }
});
/**
 * POST /api/extended-context/split/:conversationId
 * Split conversation into chunks
 */
router.post('/split/:conversationId', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const { chunkSize, overlapSize, preserveMessageBoundaries } = req.body;
        if (!chunkSize) {
            return res.status(400).json({
                error: 'Missing required field: chunkSize',
            });
        }
        const chunks = extContextService.splitIntoChunks(conversationId, {
            conversationId,
            chunkSize,
            overlapSize: overlapSize || 0,
            preserveMessageBoundaries: preserveMessageBoundaries ?? true,
        });
        return res.status(200).json({
            conversationId,
            chunks,
            total: chunks.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to split conversation',
            message: error.message,
        });
    }
});
/**
 * POST /api/extended-context/count-tokens
 * Count tokens in text
 */
router.post('/count-tokens', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({
                error: 'Missing required field: text',
            });
        }
        const tokens = extContextService.countTokens(text);
        return res.status(200).json({
            text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
            tokens,
            characters: text.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to count tokens',
            message: error.message,
        });
    }
});
/**
 * GET /api/extended-context/events/:conversationId
 * Get events
 */
router.get('/events/:conversationId', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        const events = extContextService.getEvents(conversationId);
        return res.status(200).json({
            conversationId,
            events,
            total: events.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get events',
            message: error.message,
        });
    }
});
/**
 * DELETE /api/extended-context/:conversationId
 * Clear conversation
 */
router.delete('/:conversationId', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                error: 'Missing parameter: conversationId',
            });
        }
        extContextService.clearConversation(conversationId);
        return res.status(200).json({
            message: 'Conversation cleared successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to clear conversation',
            message: error.message,
        });
    }
});
/**
 * GET /api/extended-context/health
 * Health check
 */
router.get('/health', async (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(200).json({
                enabled: false,
                initialized: false,
            });
        }
        const health = await extContextService.healthCheck();
        return res.status(200).json(health);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Health check failed',
            message: error.message,
        });
    }
});
/**
 * GET /api/extended-context/stats
 * Get service statistics
 */
router.get('/stats', (req, res) => {
    try {
        const extContextService = req.app.locals.extendedContextService;
        if (!extContextService) {
            return res.status(400).json({
                error: 'Extended Context service is not available',
            });
        }
        const stats = extContextService.getStats();
        return res.status(200).json(stats);
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get stats',
            message: error.message,
        });
    }
});
exports.default = router;
//# sourceMappingURL=extended-context.js.map