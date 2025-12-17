import { BatchConfig, Job, CreateJobOptions, JobFilterOptions, JobStatistics, JobType, BatchJob, CreateBatchOptions, JobResult, QueueStatistics, QueueHealth, JobEvent, JobEventType, BulkOperationResult } from './types';
export declare class BatchService {
    private config;
    private queue;
    private processor;
    private initialized;
    private batches;
    constructor(config: Partial<BatchConfig>);
    /**
     * Initialize service
     */
    initialize(): Promise<void>;
    /**
     * Create a job
     */
    createJob(options: CreateJobOptions): Promise<Job>;
    /**
     * Create multiple jobs at once
     */
    createJobs(options: CreateJobOptions[]): Promise<Job[]>;
    /**
     * Create a batch of jobs
     */
    createBatch(options: CreateBatchOptions): Promise<BatchJob>;
    /**
     * Get job by ID
     */
    getJob(jobId: string): Job | undefined;
    /**
     * Get jobs by filter
     */
    getJobs(filter?: JobFilterOptions): Job[];
    /**
     * Get batch by ID
     */
    getBatch(batchId: string): BatchJob | undefined;
    /**
     * Update batch status based on job statuses
     */
    private updateBatchStatus;
    /**
     * Cancel job
     */
    cancelJob(jobId: string): void;
    /**
     * Cancel batch
     */
    cancelBatch(batchId: string): void;
    /**
     * Delete job
     */
    deleteJob(jobId: string): void;
    /**
     * Get job result
     */
    getJobResult<T = any>(jobId: string): JobResult<T> | null;
    /**
     * Wait for job completion
     */
    waitForJob<T = any>(jobId: string, timeout?: number): Promise<JobResult<T>>;
    /**
     * Wait for batch completion
     */
    waitForBatch(batchId: string, timeout?: number): Promise<BatchJob>;
    /**
     * Get job statistics
     */
    getJobStatistics(): JobStatistics;
    /**
     * Get queue statistics
     */
    getQueueStatistics(): QueueStatistics;
    /**
     * Get queue health
     */
    getQueueHealth(): QueueHealth;
    /**
     * Register custom processor
     */
    registerProcessor(type: JobType, processor: any): void;
    /**
     * Add event listener
     */
    on(eventType: JobEventType, listener: (event: JobEvent) => void): void;
    /**
     * Remove event listener
     */
    off(eventType: JobEventType, listener: (event: JobEvent) => void): void;
    /**
     * Clear completed jobs
     */
    clearCompleted(): number;
    /**
     * Cleanup old jobs
     */
    cleanupOldJobs(): number;
    /**
     * Retry failed job
     */
    retryJob(jobId: string): void;
    /**
     * Bulk retry failed jobs
     */
    retryFailedJobs(filter?: JobFilterOptions): BulkOperationResult;
    /**
     * Health check
     */
    healthCheck(): Promise<{
        enabled: boolean;
        initialized: boolean;
        processing: boolean;
        queueHealth: QueueHealth;
    }>;
    /**
     * Shutdown service
     */
    shutdown(): Promise<void>;
    /**
     * Get configuration
     */
    getConfig(): BatchConfig;
    /**
     * Update configuration
     */
    updateConfig(config: Partial<BatchConfig>): void;
    /**
     * Check if enabled
     */
    isEnabled(): boolean;
    /**
     * Check if initialized
     */
    isInitialized(): boolean;
}
//# sourceMappingURL=BatchService.d.ts.map