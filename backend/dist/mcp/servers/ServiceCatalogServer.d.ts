import { MCPServer, MCPTool, MCPToolHandler, MCPExecutionContext } from '../types';
export declare class ServiceCatalogServer implements MCPServer {
    name: string;
    description: string;
    tools: MCPTool[];
    handlers: Map<string, MCPToolHandler>;
    private serviceCatalog;
    constructor();
    private initializeTools;
    initialize(context: MCPExecutionContext): Promise<void>;
    healthCheck(): Promise<boolean>;
    private searchServices;
    private getServiceDetails;
    private recommendServices;
    private calculateServicePackage;
    private generateReasons;
}
//# sourceMappingURL=ServiceCatalogServer.d.ts.map