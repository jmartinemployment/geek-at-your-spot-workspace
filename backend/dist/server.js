"use strict";
// ============================================
// src/server.ts
// Clean Minimal Server - MCP ONLY
// ============================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
// Import MCP ONLY
const mcp_1 = require("./mcp");
const mcp_2 = __importDefault(require("./routes/mcp"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Initialize Prisma
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ============================================
// ENVIRONMENT VARIABLES
// ============================================
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const MCP_ENABLED = process.env.MCP_ENABLED !== 'false'; // Enabled by default
// ============================================
// SERVICE INITIALIZATION
// ============================================
let mcpRegistry;
let mcpClient;
async function initializeServices() {
    console.log('[Server] Initializing services...');
    // ============================================
    // MCP INITIALIZATION
    // ============================================
    if (MCP_ENABLED) {
        try {
            console.log('[Server] Initializing MCP...');
            mcpRegistry = await (0, mcp_1.getMCPRegistry)({
                prisma: prisma,
                enabled: true,
            });
            if (ANTHROPIC_API_KEY) {
                mcpClient = new mcp_1.MCPClient(mcpRegistry, {
                    apiKey: ANTHROPIC_API_KEY,
                    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
                    maxTokens: 4096,
                });
                console.log('[Server] MCP Client initialized');
            }
            console.log('[Server] MCP initialized successfully');
        }
        catch (error) {
            console.error('[Server] MCP initialization failed:', error);
            console.log('[Server] Continuing without MCP...');
        }
    }
    else {
        console.log('[Server] MCP is disabled');
    }
    // Make services available to routes
    app.locals.mcpRegistry = mcpRegistry;
    app.locals.mcpClient = mcpClient;
    console.log('[Server] All services initialized');
}
// ============================================
// ROUTES
// ============================================
// Health check endpoint
app.get('/health', async (_req, res) => {
    const healthStatus = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'connected',
        mcp: {
            enabled: MCP_ENABLED,
            status: 'unknown',
            tools: 0,
        },
    };
    // Check database
    try {
        await prisma.$queryRaw `SELECT 1`;
    }
    catch (error) {
        healthStatus.database = 'disconnected';
        healthStatus.status = 'degraded';
    }
    // Check MCP
    if (MCP_ENABLED && mcpRegistry) {
        try {
            const serverHealth = await mcpRegistry.healthCheck();
            const allHealthy = Object.values(serverHealth).every((h) => h === true);
            healthStatus.mcp.status = allHealthy ? 'healthy' : 'degraded';
            healthStatus.mcp.tools = mcpRegistry.getTools().length;
            if (!allHealthy) {
                healthStatus.status = 'degraded';
            }
        }
        catch (error) {
            healthStatus.mcp.status = 'error';
            healthStatus.status = 'degraded';
        }
    }
    const statusCode = healthStatus.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(healthStatus);
});
// Register MCP API routes
app.use('/api/mcp', mcp_2.default);
// Root endpoint
app.get('/', (_req, res) => {
    res.json({
        message: 'GeekQuote AI Backend API',
        version: '1.0.0',
        services: {
            mcp: MCP_ENABLED,
        },
        endpoints: {
            health: '/health',
            mcp: '/api/mcp',
        },
    });
});
// ============================================
// GRACEFUL SHUTDOWN
// ============================================
async function gracefulShutdown(signal) {
    console.log(`\n[Server] ${signal} received, shutting down gracefully...`);
    // Close Prisma connection
    await prisma.$disconnect();
    console.log('[Server] Shutdown complete');
    process.exit(0);
}
// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// ============================================
// START SERVER
// ============================================
async function startServer() {
    try {
        // Initialize all services
        await initializeServices();
        // Start Express server
        app.listen(port, () => {
            console.log(`\n===========================================`);
            console.log(`🚀 GeekQuote Backend running on port ${port}`);
            console.log(`===========================================`);
            console.log(`📡 Health: http://localhost:${port}/health`);
            console.log(`🤖 MCP API: http://localhost:${port}/api/mcp`);
            console.log(`===========================================\n`);
        });
    }
    catch (error) {
        console.error('[Server] Failed to start:', error);
        process.exit(1);
    }
}
// Start the server
startServer();
//# sourceMappingURL=server.js.map