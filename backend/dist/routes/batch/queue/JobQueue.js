"use strict";
// @ts-nocheck
// ============================================
// src/batch/queue/JobQueue.ts
// Job Queue - Priority-based job queue management
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueue = void 0;
const uuid_1 = require("uuid");
class JobQueue {
    config;
    jobs = new Map();
    queues = new Map();
    processingJobs = new Set();
    // Statistics
    stats = {
        totalCreated: 0,
        totalCompleted: 0,
        totalFailed: 0,
        totalProcessingTime: 0,
    };
    constructor(config = {}) {
        this.config = {
            name: config.name || 'default',
            concurrency: config.concurrency || 5,
            maxRetries: config.maxRetries || 3,
            retryDelay: config.retryDelay || 1000,
            timeout: config.timeout || 60000,
            priorityLevels: config.priorityLevels || 4,
            processingInterval: config.processingInterval || 1000,
        };
        // Initialize priority queues
        this.queues.set('critical', []);
        this.queues.set('high', []);
        this.queues.set('normal', []);
        this.queues.set('low', []);
    }
    /**
     * Create and queue a job
     */
    createJob(options) {
        const job = {
            id: (0, uuid_1.v4)(),
            type: options.type,
            status: 'pending',
            priority: options.priority || 'normal',
            data: options.data,
            attempts: 0,
            maxAttempts: options.maxAttempts || this.config.maxRetries,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: options.userId,
            dependencies: options.dependencies,
            timeout: options.timeout || this.config.timeout,
            retryDelay: options.retryDelay || this.config.retryDelay,
            metadata: options.metadata,
        };
        this.jobs.set(job.id, job);
        this.stats.totalCreated++;
        // Queue the job if no dependencies
        if (!job.dependencies || job.dependencies.length === 0) {
            this.queueJob(job);
        }
        return job;
    }
    /**
     * Queue a job for processing
     */
    queueJob(job) {
        job.status = 'queued';
        job.updatedAt = new Date();
        const queue = this.queues.get(job.priority);
        queue.push(job);
        // Sort queue by creation time (FIFO within priority)
        queue.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    /**
     * Get next job to process
     */
    getNextJob() {
        // Check if we're at concurrency limit
        if (this.processingJobs.size >= this.config.concurrency) {
            return null;
        }
        // Check queues in priority order
        const priorities = ['critical', 'high', 'normal', 'low'];
        for (const priority of priorities) {
            const queue = this.queues.get(priority);
            if (queue.length > 0) {
                const job = queue.shift();
                // Check if dependencies are satisfied
                if (this.areDependenciesSatisfied(job)) {
                    job.status = 'processing';
                    job.startedAt = new Date();
                    job.updatedAt = new Date();
                    this.processingJobs.add(job.id);
                    return job;
                }
                else {
                    // Put back in queue if dependencies not satisfied
                    queue.push(job);
                }
            }
        }
        return null;
    }
    /**
     * Check if job dependencies are satisfied
     */
    areDependenciesSatisfied(job) {
        if (!job.dependencies || job.dependencies.length === 0) {
            return true;
        }
        for (const depId of job.dependencies) {
            const depJob = this.jobs.get(depId);
            if (!depJob || depJob.status !== 'completed') {
                return false;
            }
        }
        return true;
    }
    /**
     * Update job status
     */
    updateJob(jobId, update) {
        const job = this.jobs.get(jobId);
        if (!job) {
            throw new Error(`Job not found: ${jobId}`);
        }
        // Update fields
        if (update.status) {
            job.status = update.status;
        }
        if (update.progress !== undefined) {
            job.progress = update.progress;
        }
        if (update.result !== undefined) {
            job.result = update.result;
        }
        if (update.error !== undefined) {
            job.error = update.error;
        }
        if (update.attempts !== undefined) {
            job.attempts = update.attempts;
        }
        if (update.startedAt) {
            job.startedAt = update.startedAt;
        }
        if (update.completedAt) {
            job.completedAt = update.completedAt;
        }
        job.updatedAt = new Date();
        // Update statistics
        if (update.status === 'completed') {
            this.stats.totalCompleted++;
            this.processingJobs.delete(jobId);
            if (job.startedAt && job.completedAt) {
                const duration = job.completedAt.getTime() - job.startedAt.getTime();
                this.stats.totalProcessingTime += duration;
            }
            // Check for jobs waiting on this one
            this.checkDependentJobs(jobId);
        }
        else if (update.status === 'failed') {
            this.stats.totalFailed++;
            this.processingJobs.delete(jobId);
            // Check if should retry
            if (job.attempts < job.maxAttempts) {
                this.scheduleRetry(job);
            }
        }
        else if (update.status === 'cancelled') {
            this.processingJobs.delete(jobId);
        }
    }
    /**
     * Schedule job retry
     */
    scheduleRetry(job) {
        job.status = 'retrying';
        job.attempts++;
        job.updatedAt = new Date();
        // Calculate retry delay (exponential backoff)
        const delay = job.retryDelay * Math.pow(2, job.attempts - 1);
        setTimeout(() => {
            if (this.jobs.has(job.id)) {
                this.queueJob(job);
            }
        }, delay);
    }
    /**
     * Check for jobs dependent on completed job
     */
    checkDependentJobs(completedJobId) {
        for (const job of this.jobs.values()) {
            if (job.status === 'pending' &&
                job.dependencies?.includes(completedJobId)) {
                if (this.areDependenciesSatisfied(job)) {
                    this.queueJob(job);
                }
            }
        }
    }
    /**
     * Get job by ID
     */
    getJob(jobId) {
        return this.jobs.get(jobId);
    }
    /**
     * Get jobs by filter
     */
    getJobs(filter) {
        let jobs = Array.from(this.jobs.values());
        if (filter) {
            // Filter by status
            if (filter.status) {
                const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
                jobs = jobs.filter((job) => statuses.includes(job.status));
            }
            // Filter by type
            if (filter.type) {
                const types = Array.isArray(filter.type) ? filter.type : [filter.type];
                jobs = jobs.filter((job) => types.includes(job.type));
            }
            // Filter by priority
            if (filter.priority) {
                const priorities = Array.isArray(filter.priority)
                    ? filter.priority
                    : [filter.priority];
                jobs = jobs.filter((job) => priorities.includes(job.priority));
            }
            // Filter by userId
            if (filter.userId) {
                jobs = jobs.filter((job) => job.userId === filter.userId);
            }
            // Filter by date range
            if (filter.createdAfter) {
                jobs = jobs.filter((job) => job.createdAt >= filter.createdAfter);
            }
            if (filter.createdBefore) {
                jobs = jobs.filter((job) => job.createdAt <= filter.createdBefore);
            }
            // Sort
            if (filter.sortBy) {
                jobs.sort((a, b) => {
                    const aValue = a[filter.sortBy];
                    const bValue = b[filter.sortBy];
                    if (aValue instanceof Date && bValue instanceof Date) {
                        return filter.sortOrder === 'desc'
                            ? bValue.getTime() - aValue.getTime()
                            : aValue.getTime() - bValue.getTime();
                    }
                    return 0;
                });
            }
            // Pagination
            if (filter.offset) {
                jobs = jobs.slice(filter.offset);
            }
            if (filter.limit) {
                jobs = jobs.slice(0, filter.limit);
            }
        }
        return jobs;
    }
    /**
     * Cancel job
     */
    cancelJob(jobId) {
        const job = this.jobs.get(jobId);
        if (!job) {
            throw new Error(`Job not found: ${jobId}`);
        }
        if (job.status === 'completed' || job.status === 'failed') {
            throw new Error(`Cannot cancel ${job.status} job`);
        }
        // Remove from queue if queued
        if (job.status === 'queued') {
            const queue = this.queues.get(job.priority);
            const index = queue.findIndex((j) => j.id === jobId);
            if (index !== -1) {
                queue.splice(index, 1);
            }
        }
        job.status = 'cancelled';
        job.updatedAt = new Date();
        this.processingJobs.delete(jobId);
    }
    /**
     * Delete job
     */
    deleteJob(jobId) {
        const job = this.jobs.get(jobId);
        if (job) {
            this.cancelJob(jobId);
            this.jobs.delete(jobId);
        }
    }
    /**
     * Clear completed jobs
     */
    clearCompleted() {
        const completedJobs = this.getJobs({ status: 'completed' });
        let count = 0;
        for (const job of completedJobs) {
            this.jobs.delete(job.id);
            count++;
        }
        return count;
    }
    /**
     * Get queue statistics
     */
    getStatistics() {
        const allJobs = Array.from(this.jobs.values());
        const queuedJobs = this.getJobs({ status: 'queued' });
        const processingJobs = this.getJobs({ status: 'processing' });
        const completedJobs = this.getJobs({ status: 'completed' });
        const failedJobs = this.getJobs({ status: 'failed' });
        // Calculate average wait time (time from created to started)
        let totalWaitTime = 0;
        let waitCount = 0;
        for (const job of allJobs) {
            if (job.startedAt) {
                totalWaitTime += job.startedAt.getTime() - job.createdAt.getTime();
                waitCount++;
            }
        }
        const averageWaitTime = waitCount > 0 ? totalWaitTime / waitCount : 0;
        // Calculate average processing time
        const averageProcessingTime = this.stats.totalCompleted > 0
            ? this.stats.totalProcessingTime / this.stats.totalCompleted
            : 0;
        // Calculate throughput (jobs per minute)
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        const recentlyCompleted = completedJobs.filter((job) => job.completedAt && job.completedAt.getTime() > oneMinuteAgo);
        const throughput = recentlyCompleted.length;
        return {
            name: this.config.name,
            size: queuedJobs.length,
            processing: processingJobs.length,
            completed: completedJobs.length,
            failed: failedJobs.length,
            averageWaitTime,
            averageProcessingTime,
            throughput,
        };
    }
    /**
     * Get queue health
     */
    getHealth() {
        const stats = this.getStatistics();
        const issues = [];
        // Check queue size
        if (stats.size > 1000) {
            issues.push('Queue size is very large');
        }
        // Check error rate
        const totalJobs = stats.completed + stats.failed;
        const errorRate = totalJobs > 0 ? stats.failed / totalJobs : 0;
        if (errorRate > 0.1) {
            issues.push(`High error rate: ${(errorRate * 100).toFixed(1)}%`);
        }
        // Check for stale jobs
        const oldestPending = this.getJobs({ status: 'queued' })
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
        if (oldestPending) {
            const age = Date.now() - oldestPending.createdAt.getTime();
            if (age > 3600000) {
                // 1 hour
                issues.push('Jobs pending for over 1 hour');
            }
        }
        // Check processing capacity
        if (stats.processing >= this.config.concurrency) {
            issues.push('At maximum processing capacity');
        }
        return {
            healthy: issues.length === 0,
            queueSize: stats.size,
            processingCount: stats.processing,
            errorRate,
            averageLatency: stats.averageWaitTime + stats.averageProcessingTime,
            oldestPendingJob: oldestPending?.createdAt,
            issues,
        };
    }
    /**
     * Get queue size
     */
    getQueueSize() {
        return this.getJobs({ status: 'queued' }).length;
    }
    /**
     * Get processing count
     */
    getProcessingCount() {
        return this.processingJobs.size;
    }
    /**
     * Check if queue is empty
     */
    isEmpty() {
        return this.getQueueSize() === 0 && this.getProcessingCount() === 0;
    }
    /**
     * Clear all jobs
     */
    clear() {
        this.jobs.clear();
        this.queues.forEach((queue) => queue.splice(0));
        this.processingJobs.clear();
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
    }
}
exports.JobQueue = JobQueue;
//# sourceMappingURL=JobQueue.js.map