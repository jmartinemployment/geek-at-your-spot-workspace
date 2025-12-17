"use strict";
// @ts-nocheck
// ============================================
// src/batch/BatchService.ts
// Batch Service - Main orchestrator for batch processing
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchService = void 0;
const JobQueue_1 = require("./queue/JobQueue");
const JobProcessor_1 = require("./processor/JobProcessor");
class BatchService {
    config;
    queue;
    processor;
    initialized = false;
    batches = new Map();
    constructor(config) {
        this.config = {
            enabled: config.enabled ?? true,
            defaultConcurrency: config.defaultConcurrency || 5,
            defaultMaxRetries: config.defaultMaxRetries || 3,
            defaultTimeout: config.defaultTimeout || 60000,
            defaultRetryDelay: config.defaultRetryDelay || 1000,
            maxJobAge: config.maxJobAge || 86400000, // 24 hours
            enableScheduledJobs: config.enableScheduledJobs ?? false,
            enableMetrics: config.enableMetrics ?? true,
            storageType: config.storageType || 'memory',
            redisUrl: config.redisUrl,
        };
        // Initialize components
        this.queue = new JobQueue_1.JobQueue({
            name: 'main',
            concurrency: this.config.defaultConcurrency,
            maxRetries: this.config.defaultMaxRetries,
            retryDelay: this.config.defaultRetryDelay,
            timeout: this.config.defaultTimeout,
        });
        this.processor = new JobProcessor_1.JobProcessor(this.queue);
    }
    /**
     * Initialize service
     */
    async initialize() {
        if (this.initialized) {
            return;
        }
        // Register default processors
        this.processor.registerProcessors(JobProcessor_1.DefaultProcessors.getAll());
        // Start processor
        this.processor.start(1000);
        this.initialized = true;
        console.log('[Batch Service] Initialized');
    }
    /**
     * Create a job
     */
    async createJob(options) {
        if (!this.config.enabled) {
            throw new Error('Batch Service is disabled');
        }
        if (!this.initialized) {
            await this.initialize();
        }
        const job = this.queue.createJob(options);
        console.log(`[Batch Service] Created job ${job.id} (${job.type})`);
        return job;
    }
    /**
     * Create multiple jobs at once
     */
    async createJobs(options) {
        const jobs = [];
        for (const opt of options) {
            const job = await this.createJob(opt);
            jobs.push(job);
        }
        return jobs;
    }
    /**
     * Create a batch of jobs
     */
    async createBatch(options) {
        const jobs = [];
        // Create all jobs
        for (let i = 0; i < options.jobs.length; i++) {
            const jobOptions = options.jobs[i];
            // Add dependencies for sequential execution
            if (options.sequential && i > 0) {
                jobOptions.dependencies = [jobs[i - 1].id];
            }
            const job = await this.createJob(jobOptions);
            jobs.push(job);
        }
        // Create batch record
        const batch = {
            id: `batch-${Date.now()}`,
            name: options.name,
            jobs: jobs.map((j) => j.id),
            status: 'queued',
            progress: 0,
            completedJobs: 0,
            totalJobs: jobs.length,
            createdAt: new Date(),
            userId: options.userId,
            metadata: options.metadata,
        };
        this.batches.set(batch.id, batch);
        console.log(`[Batch Service] Created batch ${batch.id} with ${jobs.length} jobs`);
        return batch;
    }
    /**
     * Get job by ID
     */
    getJob(jobId) {
        return this.queue.getJob(jobId);
    }
    /**
     * Get jobs by filter
     */
    getJobs(filter) {
        return this.queue.getJobs(filter);
    }
    /**
     * Get batch by ID
     */
    getBatch(batchId) {
        const batch = this.batches.get(batchId);
        if (batch) {
            // Update batch status
            this.updateBatchStatus(batch);
        }
        return batch;
    }
    /**
     * Update batch status based on job statuses
     */
    updateBatchStatus(batch) {
        const jobs = batch.jobs.map((id) => this.queue.getJob(id)).filter(Boolean);
        const completedJobs = jobs.filter((j) => j.status === 'completed' || j.status === 'failed' || j.status === 'cancelled');
        batch.completedJobs = completedJobs.length;
        batch.progress = Math.floor((completedJobs.length / batch.totalJobs) * 100);
        // Determine batch status
        if (completedJobs.length === batch.totalJobs) {
            const failedJobs = jobs.filter((j) => j.status === 'failed');
            if (failedJobs.length > 0) {
                batch.status = 'failed';
            }
            else {
                batch.status = 'completed';
                batch.completedAt = new Date();
            }
        }
        else if (jobs.some((j) => j.status === 'processing')) {
            batch.status = 'processing';
        }
    }
    /**
     * Cancel job
     */
    cancelJob(jobId) {
        this.processor.cancelJob(jobId);
        console.log(`[Batch Service] Cancelled job ${jobId}`);
    }
    /**
     * Cancel batch
     */
    cancelBatch(batchId) {
        const batch = this.batches.get(batchId);
        if (!batch) {
            throw new Error(`Batch not found: ${batchId}`);
        }
        // Cancel all jobs in batch
        for (const jobId of batch.jobs) {
            try {
                this.cancelJob(jobId);
            }
            catch (error) {
                // Continue cancelling other jobs
            }
        }
        batch.status = 'cancelled';
        console.log(`[Batch Service] Cancelled batch ${batchId}`);
    }
    /**
     * Delete job
     */
    deleteJob(jobId) {
        this.queue.deleteJob(jobId);
    }
    /**
     * Get job result
     */
    getJobResult(jobId) {
        const job = this.queue.getJob(jobId);
        if (!job) {
            return null;
        }
        const duration = job.completedAt && job.startedAt
            ? job.completedAt.getTime() - job.startedAt.getTime()
            : 0;
        return {
            jobId: job.id,
            status: job.status,
            result: job.result,
            error: job.error,
            duration,
            attempts: job.attempts,
            createdAt: job.createdAt,
            completedAt: job.completedAt,
        };
    }
    /**
     * Wait for job completion
     */
    async waitForJob(jobId, timeout = 60000) {
        const startTime = Date.now();
        return new Promise((resolve, reject) => {
            const checkInterval = setInterval(() => {
                const job = this.queue.getJob(jobId);
                if (!job) {
                    clearInterval(checkInterval);
                    reject(new Error('Job not found'));
                    return;
                }
                if (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') {
                    clearInterval(checkInterval);
                    resolve(this.getJobResult(jobId));
                    return;
                }
                // Check timeout
                if (Date.now() - startTime > timeout) {
                    clearInterval(checkInterval);
                    reject(new Error('Job wait timeout'));
                }
            }, 100);
        });
    }
    /**
     * Wait for batch completion
     */
    async waitForBatch(batchId, timeout = 300000) {
        const startTime = Date.now();
        return new Promise((resolve, reject) => {
            const checkInterval = setInterval(() => {
                const batch = this.getBatch(batchId);
                if (!batch) {
                    clearInterval(checkInterval);
                    reject(new Error('Batch not found'));
                    return;
                }
                if (batch.status === 'completed' ||
                    batch.status === 'failed' ||
                    batch.status === 'cancelled') {
                    clearInterval(checkInterval);
                    resolve(batch);
                    return;
                }
                // Check timeout
                if (Date.now() - startTime > timeout) {
                    clearInterval(checkInterval);
                    reject(new Error('Batch wait timeout'));
                }
            }, 500);
        });
    }
    /**
     * Get job statistics
     */
    getJobStatistics() {
        const allJobs = this.queue.getJobs();
        const byStatus = {
            pending: 0,
            queued: 0,
            processing: 0,
            completed: 0,
            failed: 0,
            cancelled: 0,
            retrying: 0,
        };
        const byType = {};
        const byPriority = {};
        let totalProcessingTime = 0;
        let processedCount = 0;
        for (const job of allJobs) {
            // Count by status
            byStatus[job.status]++;
            // Count by type
            byType[job.type] = (byType[job.type] || 0) + 1;
            // Count by priority
            byPriority[job.priority] = (byPriority[job.priority] || 0) + 1;
            // Calculate processing time
            if (job.startedAt && job.completedAt) {
                totalProcessingTime += job.completedAt.getTime() - job.startedAt.getTime();
                processedCount++;
            }
        }
        const averageProcessingTime = processedCount > 0 ? totalProcessingTime / processedCount : 0;
        const successRate = byStatus.completed + byStatus.failed > 0
            ? byStatus.completed / (byStatus.completed + byStatus.failed)
            : 0;
        return {
            total: allJobs.length,
            pending: byStatus.pending,
            queued: byStatus.queued,
            processing: byStatus.processing,
            completed: byStatus.completed,
            failed: byStatus.failed,
            cancelled: byStatus.cancelled,
            retrying: byStatus.retrying,
            averageProcessingTime,
            successRate,
            byType,
            byPriority,
        };
    }
    /**
     * Get queue statistics
     */
    getQueueStatistics() {
        return this.queue.getStatistics();
    }
    /**
     * Get queue health
     */
    getQueueHealth() {
        return this.queue.getHealth();
    }
    /**
     * Register custom processor
     */
    registerProcessor(type, processor) {
        this.processor.registerProcessor(type, processor);
    }
    /**
     * Add event listener
     */
    on(eventType, listener) {
        this.processor.on(eventType, listener);
    }
    /**
     * Remove event listener
     */
    off(eventType, listener) {
        this.processor.off(eventType, listener);
    }
    /**
     * Clear completed jobs
     */
    clearCompleted() {
        return this.queue.clearCompleted();
    }
    /**
     * Cleanup old jobs
     */
    cleanupOldJobs() {
        const cutoffTime = Date.now() - this.config.maxJobAge;
        const oldJobs = this.queue
            .getJobs()
            .filter((job) => (job.status === 'completed' || job.status === 'failed') &&
            job.completedAt &&
            job.completedAt.getTime() < cutoffTime);
        for (const job of oldJobs) {
            this.queue.deleteJob(job.id);
        }
        return oldJobs.length;
    }
    /**
     * Retry failed job
     */
    retryJob(jobId) {
        const job = this.queue.getJob(jobId);
        if (!job) {
            throw new Error(`Job not found: ${jobId}`);
        }
        if (job.status !== 'failed') {
            throw new Error(`Job is not failed: ${job.status}`);
        }
        // Reset job
        this.queue.updateJob(jobId, {
            status: 'queued',
            error: undefined,
            attempts: 0,
        });
    }
    /**
     * Bulk retry failed jobs
     */
    retryFailedJobs(filter) {
        const failedJobs = this.queue.getJobs({
            ...filter,
            status: 'failed',
        });
        const results = [];
        for (const job of failedJobs) {
            try {
                this.retryJob(job.id);
                results.push({ jobId: job.id, success: true });
            }
            catch (error) {
                results.push({ jobId: job.id, success: false, error: error.message });
            }
        }
        return {
            total: failedJobs.length,
            successful: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            results,
        };
    }
    /**
     * Health check
     */
    async healthCheck() {
        return {
            enabled: this.config.enabled,
            initialized: this.initialized,
            processing: this.processor.isProcessing(),
            queueHealth: this.queue.getHealth(),
        };
    }
    /**
     * Shutdown service
     */
    async shutdown() {
        console.log('[Batch Service] Shutting down...');
        this.processor.stop();
        // Wait for processing jobs to complete (with timeout)
        const timeout = 30000;
        const startTime = Date.now();
        while (this.queue.getProcessingCount() > 0) {
            if (Date.now() - startTime > timeout) {
                console.warn('[Batch Service] Shutdown timeout, some jobs may not have completed');
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        this.initialized = false;
        console.log('[Batch Service] Shutdown complete');
    }
    /**
     * Get configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Update configuration
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
        // Update queue config if needed
        if (config.defaultConcurrency !== undefined) {
            this.queue.updateConfig({ concurrency: config.defaultConcurrency });
        }
    }
    /**
     * Check if enabled
     */
    isEnabled() {
        return this.config.enabled;
    }
    /**
     * Check if initialized
     */
    isInitialized() {
        return this.initialized;
    }
}
exports.BatchService = BatchService;
//# sourceMappingURL=BatchService.js.map