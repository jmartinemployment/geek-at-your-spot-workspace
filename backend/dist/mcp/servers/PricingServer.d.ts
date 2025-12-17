import { MCPServer, MCPTool, MCPToolHandler, MCPExecutionContext } from '../types';
export declare class PricingServer implements MCPServer {
    name: string;
    description: string;
    tools: MCPTool[];
    handlers: Map<string, MCPToolHandler>;
    private readonly baseHourlyRate;
    private readonly contingencyFactor;
    private readonly complexityMultipliers;
    private readonly projectTypeMultipliers;
    private readonly featurePricing;
    constructor();
    private initializeTools;
    initialize(context: MCPExecutionContext): Promise<void>;
    healthCheck(): Promise<boolean>;
    private estimateProjectCost;
    private getFeaturePricing;
    private comparePricingOptions;
    private suggestCostOptimizations;
    private calculateTotalCost;
}
//# sourceMappingURL=PricingServer.d.ts.map