import { CodeExecutionRequest, CodeExecutionResult, CodeExecutionConfig, CostCalculationInput, CostCalculationResult, TimelineInput, TimelineResult, FeasibilityCheckInput, FeasibilityResult, ValidationRule, ValidationResult } from './types';
export declare class CodeExecutionService {
    private jsExecutor;
    private pythonExecutor;
    private costCalculator;
    private timelineGenerator;
    private feasibilityChecker;
    private config;
    private stats;
    constructor(config?: Partial<CodeExecutionConfig>);
    /**
     * Execute code (auto-detect language)
     */
    executeCode(request: CodeExecutionRequest): Promise<CodeExecutionResult>;
    /**
     * Calculate project cost
     */
    calculateCost(input: CostCalculationInput): CostCalculationResult;
    /**
     * Generate project timeline
     */
    generateTimeline(input: TimelineInput): TimelineResult;
    /**
     * Check technical feasibility
     */
    checkFeasibility(input: FeasibilityCheckInput): FeasibilityResult;
    /**
     * Validate data against rules
     */
    validate(data: any, rules: ValidationRule[]): ValidationResult;
    /**
     * Execute calculation with dynamic code
     */
    executeCalculation(language: 'javascript' | 'python', calculationCode: string, parameters: Record<string, any>): Promise<CodeExecutionResult>;
    /**
     * Validate syntax without execution
     */
    validateSyntax(language: 'javascript' | 'python', code: string): Promise<{
        valid: boolean;
        error?: string;
    }>;
    /**
     * Get all available features
     */
    getAvailableFeatures(): string[];
    /**
     * Get feature hours
     */
    getFeatureHours(feature: string): number;
    /**
     * Add custom feature to cost calculator
     */
    addCustomFeature(feature: string, hours: number, dependencies?: string[]): void;
    /**
     * Calculate earliest project completion date
     */
    calculateEarliestCompletion(input: TimelineInput, startDate: Date): Date;
    /**
     * Optimize timeline
     */
    optimizeTimeline(input: TimelineInput): TimelineResult;
    /**
     * Compare cost scenarios
     */
    compareCostScenarios(baseInput: CostCalculationInput, scenarios: Array<Partial<CostCalculationInput>>): Array<{
        name: string;
        result: CostCalculationResult;
    }>;
    /**
     * Check if Python is available
     */
    isPythonAvailable(): Promise<boolean>;
    /**
     * Get Python version
     */
    getPythonVersion(): Promise<string>;
    /**
     * Get service statistics
     */
    getStats(): {
        config: CodeExecutionConfig;
        totalExecutions: number;
        successfulExecutions: number;
        failedExecutions: number;
        averageExecutionTime: number;
        totalExecutionTime: number;
    };
    /**
     * Reset statistics
     */
    resetStats(): void;
    /**
     * Health check
     */
    healthCheck(): Promise<{
        enabled: boolean;
        javascript: boolean;
        python: boolean;
        calculators: boolean;
    }>;
    /**
     * Update configuration
     */
    updateConfig(config: Partial<CodeExecutionConfig>): void;
    /**
     * Get configuration
     */
    getConfig(): CodeExecutionConfig;
    /**
     * Helper: Get nested value from object
     */
    private getNestedValue;
}
//# sourceMappingURL=CodeExecutionService.d.ts.map