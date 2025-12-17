import { Job, JobProcessor as JobProcessorFn, JobEvent, JobEventType, ProcessorRegistryEntry } from '../types';
import { JobQueue } from '../queue/JobQueue';
export declare class JobProcessor {
    private queue;
    private processors;
    private processingLoop;
    private isRunning;
    private eventListeners;
    private cancellationSignals;
    constructor(queue: JobQueue);
    /**
     * Register a job processor
     */
    registerProcessor(type: string, processor: JobProcessorFn): void;
    /**
     * Register multiple processors
     */
    registerProcessors(entries: ProcessorRegistryEntry[]): void;
    /**
     * Start processing jobs
     */
    start(interval?: number): void;
    /**
     * Stop processing jobs
     */
    stop(): void;
    /**
     * Process next available job
     */
    private processNextJob;
    /**
     * Process a specific job
     */
    processJob(job: Job): Promise<void>;
    /**
     * Cancel a job
     */
    cancelJob(jobId: string): void;
    /**
     * Emit event
     */
    private emitEvent;
    /**
     * Add event listener
     */
    on(eventType: JobEventType, listener: (event: JobEvent) => void): void;
    /**
     * Remove event listener
     */
    off(eventType: JobEventType, listener: (event: JobEvent) => void): void;
    /**
     * Get registered processors
     */
    getProcessors(): string[];
    /**
     * Check if processor is registered
     */
    hasProcessor(type: string): boolean;
    /**
     * Check if running
     */
    isProcessing(): boolean;
    /**
     * Get processing status
     */
    getStatus(): {
        running: boolean;
        registeredProcessors: number;
        queueSize: number;
        processing: number;
    };
}
/**
 * Default job processors for common tasks
 */
export declare class DefaultProcessors {
    /**
     * Code execution processor
     */
    static codeExecution: JobProcessorFn;
    /**
     * Cost calculation processor
     */
    static costCalculation: JobProcessorFn;
    /**
     * Timeline generation processor
     */
    static timelineGeneration: JobProcessorFn;
    /**
     * Feasibility check processor
     */
    static feasibilityCheck: JobProcessorFn;
    /**
     * A2A workflow processor
     */
    static a2aWorkflow: JobProcessorFn;
    /**
     * Context compression processor
     */
    static contextCompression: JobProcessorFn;
    /**
     * Bulk analysis processor
     */
    static bulkAnalysis: JobProcessorFn;
    /**
     * Report generation processor
     */
    static reportGeneration: JobProcessorFn;
    /**
     * Data export processor
     */
    static dataExport: JobProcessorFn;
    /**
     * Get all default processors
     */
    static getAll(): ProcessorRegistryEntry[];
}
//# sourceMappingURL=JobProcessor.d.ts.map