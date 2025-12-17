"use strict";
// ============================================
// src/routes/batch.ts
// Batch Processing API Routes
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * POST /api/batch/jobs
 * Create a job
 */
router.post('/jobs', async (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService || !batchService.isEnabled()) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { type, data, priority, userId, maxAttempts, timeout, dependencies, metadata } = req.body;
        if (!type || !data || !userId) {
            return res.status(400).json({
                error: 'Missing required fields: type, data, userId',
            });
        }
        const job = await batchService.createJob({
            type,
            data,
            priority,
            userId,
            maxAttempts,
            timeout,
            dependencies,
            metadata,
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to create job',
            message: error.message,
        });
    }
});
/**
 * POST /api/batch/jobs/bulk
 * Create multiple jobs
 */
router.post('/jobs/bulk', async (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { jobs } = req.body;
        if (!jobs || !Array.isArray(jobs)) {
            return res.status(400).json({
                error: 'Missing or invalid field: jobs (must be array)',
            });
        }
        const createdJobs = await batchService.createJobs(jobs);
        res.status(201).json({
            jobs: createdJobs,
            total: createdJobs.length,
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to create jobs',
            message: error.message,
        });
    }
});
/**
 * POST /api/batch/batches
 * Create a batch
 */
router.post('/batches', async (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { name, jobs, userId, sequential, stopOnError, metadata } = req.body;
        if (!name || !jobs || !userId) {
            return res.status(400).json({
                error: 'Missing required fields: name, jobs, userId',
            });
        }
        const batch = await batchService.createBatch({
            name,
            jobs,
            userId,
            sequential,
            stopOnError,
            metadata,
        });
        res.status(201).json(batch);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to create batch',
            message: error.message,
        });
    }
});
/**
 * GET /api/batch/jobs/:jobId
 * Get job by ID
 */
router.get('/jobs/:jobId', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { jobId } = req.params;
        const job = batchService.getJob(jobId);
        if (!job) {
            return res.status(404).json({
                error: 'Job not found',
            });
        }
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to get job',
            message: error.message,
        });
    }
});
/**
 * GET /api/batch/jobs/:jobId/result
 * Get job result
 */
router.get('/jobs/:jobId/result', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { jobId } = req.params;
        const result = batchService.getJobResult(jobId);
        if (!result) {
            return res.status(404).json({
                error: 'Job result not found',
            });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to get job result',
            message: error.message,
        });
    }
});
/**
 * GET /api/batch/jobs
 * Get jobs with filtering
 */
router.get('/jobs', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { status, type, priority, userId, limit, offset } = req.query;
        const jobs = batchService.getJobs({
            status: status,
            type: type,
            priority: priority,
            userId: userId,
            limit: limit ? parseInt(limit) : undefined,
            offset: offset ? parseInt(offset) : undefined,
        });
        res.status(200).json({
            jobs,
            total: jobs.length,
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to get jobs',
            message: error.message,
        });
    }
});
/**
 * GET /api/batch/batches/:batchId
 * Get batch by ID
 */
router.get('/batches/:batchId', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { batchId } = req.params;
        const batch = batchService.getBatch(batchId);
        if (!batch) {
            return res.status(404).json({
                error: 'Batch not found',
            });
        }
        res.status(200).json(batch);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to get batch',
            message: error.message,
        });
    }
});
/**
 * POST /api/batch/jobs/:jobId/cancel
 * Cancel job
 */
router.post('/jobs/:jobId/cancel', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { jobId } = req.params;
        batchService.cancelJob(jobId);
        res.status(200).json({
            message: 'Job cancelled successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to cancel job',
            message: error.message,
        });
    }
});
/**
 * POST /api/batch/batches/:batchId/cancel
 * Cancel batch
 */
router.post('/batches/:batchId/cancel', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { batchId } = req.params;
        batchService.cancelBatch(batchId);
        res.status(200).json({
            message: 'Batch cancelled successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to cancel batch',
            message: error.message,
        });
    }
});
/**
 * DELETE /api/batch/jobs/:jobId
 * Delete job
 */
router.delete('/jobs/:jobId', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { jobId } = req.params;
        batchService.deleteJob(jobId);
        res.status(200).json({
            message: 'Job deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to delete job',
            message: error.message,
        });
    }
});
/**
 * POST /api/batch/jobs/:jobId/retry
 * Retry failed job
 */
router.post('/jobs/:jobId/retry', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { jobId } = req.params;
        batchService.retryJob(jobId);
        res.status(200).json({
            message: 'Job retry initiated',
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to retry job',
            message: error.message,
        });
    }
});
/**
 * POST /api/batch/jobs/retry-failed
 * Retry all failed jobs
 */
router.post('/jobs/retry-failed', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const { userId, type } = req.body;
        const result = batchService.retryFailedJobs({
            userId,
            type,
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to retry jobs',
            message: error.message,
        });
    }
});
/**
 * POST /api/batch/cleanup
 * Cleanup completed jobs
 */
router.post('/cleanup', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const count = batchService.clearCompleted();
        res.status(200).json({
            message: 'Cleanup completed',
            jobsRemoved: count,
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Cleanup failed',
            message: error.message,
        });
    }
});
/**
 * GET /api/batch/statistics
 * Get job statistics
 */
router.get('/statistics', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const stats = batchService.getJobStatistics();
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to get statistics',
            message: error.message,
        });
    }
});
/**
 * GET /api/batch/queue/stats
 * Get queue statistics
 */
router.get('/queue/stats', (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(400).json({
                error: 'Batch service is not available',
            });
        }
        const stats = batchService.getQueueStatistics();
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to get queue statistics',
            message: error.message,
        });
    }
});
/**
 * GET /api/batch/health
 * Health check
 */
router.get('/health', async (req, res) => {
    try {
        const batchService = req.app.locals.batchService;
        if (!batchService) {
            return res.status(200).json({
                enabled: false,
                initialized: false,
            });
        }
        const health = await batchService.healthCheck();
        res.status(200).json(health);
    }
    catch (error) {
        res.status(500).json({
            error: 'Health check failed',
            message: error.message,
        });
    }
});
exports.default = router;
//# sourceMappingURL=batch.js.map