"use strict";
// ============================================
// src/server.ts
// Main Express Server Entry Point
// ============================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
// Import routes
const chat_1 = __importDefault(require("./routes/chat"));
const admin_1 = __importDefault(require("./routes/admin"));
// Import middleware
const security_1 = require("./middleware/security");
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Initialize Prisma
const prisma = new client_1.PrismaClient();
// ==========================================
// MIDDLEWARE
// ==========================================
// Security headers
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false // Allow external scripts
}));
// CORS - Allow requests from your WordPress site
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'https://geekatyourspot.com',
    'http://localhost:4200',
    'http://localhost:3000',
    'https://geekatyourspot.com',
    'https://www.geekatyourspot.com'
];
console.log('🔍 Allowed Origins:', allowedOrigins);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) {
            callback(null, true);
            return;
        }
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.warn(`🚫 Blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'X-API-Key']
}));
// Rate limiting - Prevent abuse
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later',
        code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false
});
// Apply rate limiting to API routes
app.use('/api/', limiter);
// Body parser
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging
app.use(security_1.requestLogger);
// ==========================================
// ROUTES
// ==========================================
// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// API version info
app.get('/api', (req, res) => {
    res.json({
        name: 'GeekQuote AI API',
        version: '1.0.0',
        endpoints: {
            chat: '/api/chat',
            admin: '/api/admin/*'
        }
    });
});
// Mount route handlers
app.use('/api', chat_1.default);
app.use('/api/admin', admin_1.default);
// 404 handler - must come after all other routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        code: 'NOT_FOUND',
        path: req.path
    });
});
// Error handler (must be last)
app.use(security_1.errorHandler);
// ==========================================
// SERVER STARTUP
// ==========================================
/**
 * Start the server
 */
const startServer = async () => {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('✅ Database connected');
        // Start listening
        app.listen(PORT, () => {
            console.log('');
            console.log('🚀 ==========================================');
            console.log('🚀  GeekQuote AI Backend Server');
            console.log('🚀 ==========================================');
            console.log(`🚀  Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🚀  Port: ${PORT}`);
            console.log(`🚀  Health: http://localhost:${PORT}/health`);
            console.log(`🚀  API: http://localhost:${PORT}/api`);
            console.log('🚀 ==========================================');
            console.log('');
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
/**
 * Graceful shutdown
 */
const shutdown = async () => {
    console.log('\n🛑 Shutting down gracefully...');
    try {
        await prisma.$disconnect();
        console.log('✅ Database disconnected');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
    }
};
// Handle shutdown signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
// Start the server
startServer();
exports.default = app;
//# sourceMappingURL=server%20backup.js.map