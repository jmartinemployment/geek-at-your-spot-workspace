import { TimelineInput, TimelineResult, DependencyAnalysisResult } from '../types';
export declare class TimelineGenerator {
    private workHoursPerDay;
    private workDaysPerWeek;
    private bufferPercentage;
    constructor(config?: {
        workHoursPerDay?: number;
        workDaysPerWeek?: number;
        bufferPercentage?: number;
    });
    /**
     * Generate complete project timeline with dependencies
     */
    generate(input: TimelineInput): TimelineResult;
    /**
     * Build dependency graph from phases
     */
    private buildDependencyGraph;
    /**
     * Calculate critical path using topological sort
     */
    private calculateCriticalPath;
    /**
     * Identify tasks that can be done in parallel
     */
    private identifyParallelTasks;
    /**
     * Generate a single phase
     */
    private generatePhase;
    /**
     * Generate milestones for a phase
     */
    private generateMilestones;
    /**
     * Generate warnings based on timeline analysis
     */
    private generateWarnings;
    /**
     * Analyze dependencies and return detailed analysis
     */
    analyzeDependencies(input: TimelineInput): DependencyAnalysisResult;
    /**
     * Optimize timeline by parallelizing tasks
     */
    optimize(input: TimelineInput): TimelineResult;
    /**
     * Calculate earliest possible completion date
     */
    calculateEarliestCompletion(input: TimelineInput, startDate: Date): Date;
    /**
     * Get configuration
     */
    getConfig(): {
        workHoursPerDay: number;
        workDaysPerWeek: number;
        bufferPercentage: number;
    };
    /**
     * Update configuration
     */
    updateConfig(config: {
        workHoursPerDay?: number;
        workDaysPerWeek?: number;
        bufferPercentage?: number;
    }): void;
}
//# sourceMappingURL=TimelineGenerator.d.ts.map