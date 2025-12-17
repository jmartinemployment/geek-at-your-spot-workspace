import { Job, CreateJobOptions, JobUpdate, QueueConfig, JobFilterOptions, QueueStatistics, QueueHealth } from '../types';
export declare class JobQueue {
    private config;
    private jobs;
    private queues;
    private processingJobs;
    private stats;
    constructor(config?: Partial<QueueConfig>);
    /**
     * Create and queue a job
     */
    createJob(options: CreateJobOptions): Job;
    /**
     * Queue a job for processing
     */
    private queueJob;
    /**
     * Get next job to process
     */
    getNextJob(): Job | null;
    /**
     * Check if job dependencies are satisfied
     */
    private areDependenciesSatisfied;
    /**
     * Update job status
     */
    updateJob(jobId: string, update: JobUpdate): void;
    /**
     * Schedule job retry
     */
    private scheduleRetry;
    /**
     * Check for jobs dependent on completed job
     */
    private checkDependentJobs;
    /**
     * Get job by ID
     */
    getJob(jobId: string): Job | undefined;
    /**
     * Get jobs by filter
     */
    getJobs(filter?: JobFilterOptions): Job[];
    /**
     * Cancel job
     */
    cancelJob(jobId: string): void;
    /**
     * Delete job
     */
    deleteJob(jobId: string): void;
    /**
     * Clear completed jobs
     */
    clearCompleted(): number;
    /**
     * Get queue statistics
     */
    getStatistics(): QueueStatistics;
    /**
     * Get queue health
     */
    getHealth(): QueueHealth;
    /**
     * Get queue size
     */
    getQueueSize(): number;
    /**
     * Get processing count
     */
    getProcessingCount(): number;
    /**
     * Check if queue is empty
     */
    isEmpty(): boolean;
    /**
     * Clear all jobs
     */
    clear(): void;
    /**
     * Get configuration
     */
    getConfig(): QueueConfig;
    /**
     * Update configuration
     */
    updateConfig(config: Partial<QueueConfig>): void;
}
//# sourceMappingURL=JobQueue.d.ts.map