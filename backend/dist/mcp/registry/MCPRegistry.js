"use strict";
// ============================================
// src/mcp/registry/MCPRegistry.ts
// MCP Registry: Central Tool Management
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPRegistry = void 0;
exports.getMCPRegistry = getMCPRegistry;
const ProjectKnowledgeServer_1 = require("../servers/ProjectKnowledgeServer");
const ServiceCatalogServer_1 = require("../servers/ServiceCatalogServer");
const PricingServer_1 = require("../servers/PricingServer");
class MCPRegistry {
    servers = new Map();
    tools = new Map();
    context;
    config;
    stats = {
        totalExecutions: 0,
        successfulExecutions: 0,
        failedExecutions: 0,
        totalExecutionTime: 0,
    };
    constructor(config) {
        this.config = config;
        this.context = {
            prisma: config.prisma,
            timeout: config.timeout || 10000,
        };
    }
    async initialize() {
        if (!this.config.enabled) {
            console.log('[MCPRegistry] MCP is disabled');
            return;
        }
        try {
            const projectServer = new ProjectKnowledgeServer_1.ProjectKnowledgeServer();
            const serviceServer = new ServiceCatalogServer_1.ServiceCatalogServer();
            const pricingServer = new PricingServer_1.PricingServer();
            await projectServer.initialize(this.context);
            await serviceServer.initialize(this.context);
            await pricingServer.initialize(this.context);
            this.servers.set(projectServer.name, projectServer);
            this.servers.set(serviceServer.name, serviceServer);
            this.servers.set(pricingServer.name, pricingServer);
            for (const server of this.servers.values()) {
                for (const tool of server.tools) {
                    const handler = server.handlers.get(tool.name);
                    if (handler) {
                        this.tools.set(tool.name, { server, handler });
                    }
                }
            }
            console.log(`[MCPRegistry] Initialized with ${this.servers.size} servers and ${this.tools.size} tools`);
        }
        catch (error) {
            console.error('[MCPRegistry] Initialization failed:', error);
            throw error;
        }
    }
    getTools() {
        const tools = [];
        for (const server of this.servers.values()) {
            tools.push(...server.tools);
        }
        return tools;
    }
    async executeTool(toolName, params, options = {}) {
        const startTime = Date.now();
        this.stats.totalExecutions++;
        try {
            const toolEntry = this.tools.get(toolName);
            if (!toolEntry) {
                this.stats.failedExecutions++;
                return {
                    success: false,
                    error: `Tool not found: ${toolName}`,
                };
            }
            const execContext = {
                ...this.context,
                timeout: options.timeout || this.context.timeout,
            };
            const timeoutMs = execContext.timeout || 10000;
            const result = await this.executeWithTimeout(toolEntry.handler(params, execContext), timeoutMs);
            const executionTime = Date.now() - startTime;
            this.stats.totalExecutionTime += executionTime;
            if (result.success) {
                this.stats.successfulExecutions++;
            }
            else {
                this.stats.failedExecutions++;
            }
            return {
                ...result,
                metadata: {
                    ...result.metadata,
                    executionTime,
                },
            };
        }
        catch (error) {
            this.stats.failedExecutions++;
            const executionTime = Date.now() - startTime;
            return {
                success: false,
                error: `Tool execution failed: ${error.message}`,
                metadata: {
                    executionTime,
                },
            };
        }
    }
    async executeWithTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Tool execution timeout')), timeoutMs)),
        ]);
    }
    getTool(toolName) {
        const toolEntry = this.tools.get(toolName);
        if (!toolEntry)
            return undefined;
        return toolEntry.server.tools.find((t) => t.name === toolName);
    }
    hasTool(toolName) {
        return this.tools.has(toolName);
    }
    getServers() {
        return Array.from(this.servers.values());
    }
    getServer(serverName) {
        return this.servers.get(serverName);
    }
    async healthCheck() {
        const health = {};
        for (const [name, server] of this.servers.entries()) {
            try {
                health[name] = await server.healthCheck();
            }
            catch {
                health[name] = false;
            }
        }
        return health;
    }
    getStats() {
        const successRate = this.stats.totalExecutions > 0
            ? this.stats.successfulExecutions / this.stats.totalExecutions
            : 0;
        const averageExecutionTime = this.stats.totalExecutions > 0
            ? this.stats.totalExecutionTime / this.stats.totalExecutions
            : 0;
        let projectTools = 0;
        let serviceTools = 0;
        let pricingTools = 0;
        for (const [toolName, { server }] of this.tools.entries()) {
            if (server.name === 'ProjectKnowledgeServer')
                projectTools++;
            if (server.name === 'ServiceCatalogServer')
                serviceTools++;
            if (server.name === 'PricingServer')
                pricingTools++;
        }
        return {
            totalTools: this.tools.size,
            projectTools,
            serviceTools,
            pricingTools,
            totalExecutions: this.stats.totalExecutions,
            successRate,
            averageExecutionTime,
        };
    }
    resetStats() {
        this.stats = {
            totalExecutions: 0,
            successfulExecutions: 0,
            failedExecutions: 0,
            totalExecutionTime: 0,
        };
    }
    isEnabled() {
        return this.config.enabled;
    }
}
exports.MCPRegistry = MCPRegistry;
async function getMCPRegistry(config) {
    const registry = new MCPRegistry(config);
    if (config.enabled) {
        await registry.initialize();
    }
    return registry;
}
//# sourceMappingURL=MCPRegistry.js.map