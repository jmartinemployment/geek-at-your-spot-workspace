import { CostCalculationInput, CostCalculationResult } from '../types';
export declare class CostCalculator {
    private baseHourlyRate;
    private complexityMultipliers;
    private projectTypeMultipliers;
    private featureHours;
    private featureDependencies;
    constructor(baseHourlyRate?: number);
    /**
     * Calculate project cost with detailed breakdown
     */
    calculate(input: CostCalculationInput): CostCalculationResult;
    /**
     * Calculate cost for a single feature (with dependencies)
     */
    private calculateFeatureCost;
    /**
     * Estimate hours for unknown features
     */
    private estimateUnknownFeature;
    /**
     * Categorize feature by name
     */
    private categorizeFeature;
    /**
     * Generate project timeline
     */
    private generateTimeline;
    /**
     * Compare different scenarios
     */
    compareScenarios(baseInput: CostCalculationInput, scenarios: Array<Partial<CostCalculationInput>>): Array<{
        name: string;
        result: CostCalculationResult;
    }>;
    /**
     * Get feature hours
     */
    getFeatureHours(feature: string): number;
    /**
     * Get feature dependencies
     */
    getFeatureDependencies(feature: string): string[];
    /**
     * Update base hourly rate
     */
    setBaseHourlyRate(rate: number): void;
    /**
     * Get base hourly rate
     */
    getBaseHourlyRate(): number;
    /**
     * Add custom feature
     */
    addCustomFeature(feature: string, hours: number, dependencies?: string[]): void;
    /**
     * Get all available features
     */
    getAllFeatures(): string[];
}
//# sourceMappingURL=CostCalculator.d.ts.map