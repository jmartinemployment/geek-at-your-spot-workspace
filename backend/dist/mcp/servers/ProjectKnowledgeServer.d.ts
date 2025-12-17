import { MCPServer, MCPTool, MCPToolHandler, MCPExecutionContext } from '../types';
export declare class ProjectKnowledgeServer implements MCPServer {
    name: string;
    description: string;
    tools: MCPTool[];
    handlers: Map<string, MCPToolHandler>;
    private context;
    constructor();
    private initializeTools;
    initialize(context: MCPExecutionContext): Promise<void>;
    healthCheck(): Promise<boolean>;
    /**
     * Handler: Search Past Projects
     */
    private searchPastProjects;
    /**
     * Handler: Get Project Statistics
     */
    private getProjectStatistics;
    /**
     * Handler: Get Technology Recommendations
     */
    private getTechnologyRecommendations;
}
//# sourceMappingURL=ProjectKnowledgeServer.d.ts.map