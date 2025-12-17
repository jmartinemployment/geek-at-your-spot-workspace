"use strict";
// ============================================
// src/batch/types/index.ts
// Batch Processing Type Definitions
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchService = exports.JobQueue = void 0;
// Export types
/* export * from './types';
 */
// Export queue
var JobQueue_1 = require("./queue/JobQueue");
Object.defineProperty(exports, "JobQueue", { enumerable: true, get: function () { return JobQueue_1.JobQueue; } });
/* // Export processor
export { JobProcessor, DefaultProcessors } from './processor/JobProcessor'; */
// Export main service
var BatchService_1 = require("./BatchService");
Object.defineProperty(exports, "BatchService", { enumerable: true, get: function () { return BatchService_1.BatchService; } });
//# sourceMappingURL=index.js.map