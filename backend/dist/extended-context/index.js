"use strict";
// ============================================
// src/extended-context/index.ts
// Extended Context Module Exports
// ============================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedContextService = exports.ContextWindowManager = exports.ContextCompressor = exports.TokenCounter = void 0;
// Export types
__exportStar(require("./types"), exports);
// Export utilities
var TokenCounter_1 = require("./utils/TokenCounter");
Object.defineProperty(exports, "TokenCounter", { enumerable: true, get: function () { return TokenCounter_1.TokenCounter; } });
// Export compression
var ContextCompressor_1 = require("./compression/ContextCompressor");
Object.defineProperty(exports, "ContextCompressor", { enumerable: true, get: function () { return ContextCompressor_1.ContextCompressor; } });
// Export manager
var ContextWindowManager_1 = require("./manager/ContextWindowManager");
Object.defineProperty(exports, "ContextWindowManager", { enumerable: true, get: function () { return ContextWindowManager_1.ContextWindowManager; } });
// Export main service
var ExtendedContextService_1 = require("./ExtendedContextService");
Object.defineProperty(exports, "ExtendedContextService", { enumerable: true, get: function () { return ExtendedContextService_1.ExtendedContextService; } });
//# sourceMappingURL=index.js.map