import { BaseAgent } from './BaseAgent';
import { AgentTask } from '../types';
/**
 * CoordinatorAgent - Orchestrates multi-agent workflows
 */
export declare class CoordinatorAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private parseTaskBreakdown;
}
/**
 * ResearcherAgent - Gathers and analyzes information
 */
export declare class ResearcherAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractKeyPoints;
    private extractRecommendations;
}
/**
 * DeveloperAgent - Writes and reviews code
 */
export declare class DeveloperAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractCodeBlocks;
}
/**
 * DesignerAgent - Creates designs and mockups
 */
export declare class DesignerAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private parseDesignSpecs;
    private extractSection;
}
/**
 * AnalystAgent - Analyzes data and provides insights
 */
export declare class AnalystAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractMetrics;
    private extractInsights;
    private extractKeyPoints;
    private extractRecommendations;
}
/**
 * WriterAgent - Creates documentation and content
 */
export declare class WriterAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractSections;
}
/**
 * QATesterAgent - Tests and ensures quality
 */
export declare class QATesterAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractTestCases;
    private extractIssues;
    private extractKeyPoints;
    private calculateQualityScore;
}
/**
 * ProjectManagerAgent - Manages projects and coordinates teams
 */
export declare class ProjectManagerAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractMilestones;
    private extractRisks;
    private extractKeyPoints;
}
/**
 * CostEstimatorAgent - Estimates costs and budgets
 */
export declare class CostEstimatorAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractCostBreakdown;
    private extractTotalCost;
    private extractAssumptions;
    private extractKeyPoints;
}
/**
 * TechnicalArchitectAgent - Designs system architecture
 */
export declare class TechnicalArchitectAgent extends BaseAgent {
    protected executeTaskLogic(task: AgentTask): Promise<any>;
    private extractTechStack;
    private extractComponents;
    private extractKeyPoints;
}
//# sourceMappingURL=SpecializedAgents.d.ts.map