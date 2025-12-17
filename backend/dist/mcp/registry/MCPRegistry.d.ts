import { MCPServer, MCPTool, MCPToolResult, MCPRegistryConfig, ToolExecutionOptions, RegistryStats } from '../types';
export declare class MCPRegistry {
    private servers;
    private tools;
    private context;
    private config;
    private stats;
    constructor(config: MCPRegistryConfig);
    initialize(): Promise<void>;
    getTools(): MCPTool[];
    executeTool(toolName: string, params: any, options?: ToolExecutionOptions): Promise<MCPToolResult>;
    private executeWithTimeout;
    getTool(toolName: string): MCPTool | undefined;
    hasTool(toolName: string): boolean;
    getServers(): MCPServer[];
    getServer(serverName: string): MCPServer | undefined;
    healthCheck(): Promise<Record<string, boolean>>;
    getStats(): RegistryStats;
    resetStats(): void;
    isEnabled(): boolean;
}
export declare function getMCPRegistry(config: MCPRegistryConfig): Promise<MCPRegistry>;
//# sourceMappingURL=MCPRegistry.d.ts.map