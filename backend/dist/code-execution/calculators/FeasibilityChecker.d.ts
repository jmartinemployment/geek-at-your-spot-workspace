import { FeasibilityCheckInput, FeasibilityResult } from '../types';
export declare class FeasibilityChecker {
    private technologyCompatibility;
    private featureComplexity;
    private experienceMultipliers;
    /**
     * Check technical feasibility of a project
     */
    check(input: FeasibilityCheckInput): FeasibilityResult;
    /**
     * Check technology compatibility
     */
    private checkTechnologyCompatibility;
    /**
     * Check known technology conflicts
     */
    private hasKnownConflict;
    /**
     * Check feature complexity
     */
    private checkFeatureComplexity;
    /**
     * Check constraints
     */
    private checkConstraints;
    /**
     * Check project type feasibility
     */
    private checkProjectType;
    /**
     * Generate technology recommendations
     */
    private generateTechnologyRecommendations;
    /**
     * Generate process recommendations
     */
    private generateProcessRecommendations;
    /**
     * Calculate feasibility score (0-100)
     */
    private calculateFeasibilityScore;
    /**
     * Identify technical constraints
     */
    private identifyTechnicalConstraints;
    /**
     * Suggest alternative approaches
     */
    private suggestAlternativeApproaches;
    /**
     * Estimate cost (rough estimate)
     */
    private estimateCost;
    /**
     * Estimate timeline (rough estimate in weeks)
     */
    private estimateTimeline;
}
//# sourceMappingURL=FeasibilityChecker.d.ts.map