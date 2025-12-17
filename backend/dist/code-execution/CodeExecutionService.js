"use strict";
// ============================================
// src/code-execution/CodeExecutionService.ts
// Code Execution Service - Orchestrates all execution & calculation features
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeExecutionService = void 0;
const JavaScriptExecutor_1 = require("./executors/JavaScriptExecutor");
const PythonExecutor_1 = require("./executors/PythonExecutor");
const CostCalculator_1 = require("./calculators/CostCalculator");
const TimelineGenerator_1 = require("./calculators/TimelineGenerator");
const FeasibilityChecker_1 = require("./calculators/FeasibilityChecker");
class CodeExecutionService {
    jsExecutor;
    pythonExecutor;
    costCalculator;
    timelineGenerator;
    feasibilityChecker;
    config;
    // Execution statistics
    stats = {
        totalExecutions: 0,
        successfulExecutions: 0,
        failedExecutions: 0,
        averageExecutionTime: 0,
        totalExecutionTime: 0,
    };
    constructor(config) {
        this.config = {
            enabled: config?.enabled ?? true,
            defaultTimeout: config?.defaultTimeout ?? 10000,
            defaultMemoryLimit: config?.defaultMemoryLimit ?? 256 * 1024 * 1024,
            allowedLanguages: config?.allowedLanguages ?? ['javascript', 'python'],
            pythonPath: config?.pythonPath,
            maxConcurrentExecutions: config?.maxConcurrentExecutions ?? 5,
        };
        // Initialize executors
        this.jsExecutor = new JavaScriptExecutor_1.JavaScriptExecutor({
            timeout: this.config.defaultTimeout,
            memoryLimit: this.config.defaultMemoryLimit,
        });
        this.pythonExecutor = new PythonExecutor_1.PythonExecutor(this.config.pythonPath, {
            timeout: this.config.defaultTimeout,
            memoryLimit: this.config.defaultMemoryLimit,
        });
        // Initialize calculators
        this.costCalculator = new CostCalculator_1.CostCalculator();
        this.timelineGenerator = new TimelineGenerator_1.TimelineGenerator();
        this.feasibilityChecker = new FeasibilityChecker_1.FeasibilityChecker();
    }
    /**
     * Execute code (auto-detect language)
     */
    async executeCode(request) {
        if (!this.config.enabled) {
            return {
                success: false,
                error: 'Code execution is disabled',
                executionTime: 0,
            };
        }
        if (!this.config.allowedLanguages.includes(request.language)) {
            return {
                success: false,
                error: `Language ${request.language} is not allowed`,
                executionTime: 0,
            };
        }
        const startTime = Date.now();
        this.stats.totalExecutions++;
        try {
            let result;
            if (request.language === 'javascript') {
                result = await this.jsExecutor.execute(request.code, request.input, request.context);
            }
            else if (request.language === 'python') {
                result = await this.pythonExecutor.execute(request.code, request.input, request.context);
            }
            else {
                return {
                    success: false,
                    error: `Unsupported language: ${request.language}`,
                    executionTime: 0,
                };
            }
            // Update stats
            const executionTime = Date.now() - startTime;
            this.stats.totalExecutionTime += executionTime;
            if (result.success) {
                this.stats.successfulExecutions++;
            }
            else {
                this.stats.failedExecutions++;
            }
            this.stats.averageExecutionTime =
                this.stats.totalExecutionTime / this.stats.totalExecutions;
            return result;
        }
        catch (error) {
            this.stats.failedExecutions++;
            return {
                success: false,
                error: error.message,
                executionTime: Date.now() - startTime,
            };
        }
    }
    /**
     * Calculate project cost
     */
    calculateCost(input) {
        return this.costCalculator.calculate(input);
    }
    /**
     * Generate project timeline
     */
    generateTimeline(input) {
        return this.timelineGenerator.generate(input);
    }
    /**
     * Check technical feasibility
     */
    checkFeasibility(input) {
        return this.feasibilityChecker.check(input);
    }
    /**
     * Validate data against rules
     */
    validate(data, rules) {
        const errors = [];
        for (const rule of rules) {
            const value = this.getNestedValue(data, rule.field);
            switch (rule.rule) {
                case 'required':
                    if (value === undefined || value === null || value === '') {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                        });
                    }
                    break;
                case 'min':
                    if (typeof value === 'number' && value < rule.value) {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                        });
                    }
                    else if (typeof value === 'string' && value.length < rule.value) {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                        });
                    }
                    break;
                case 'max':
                    if (typeof value === 'number' && value > rule.value) {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                        });
                    }
                    else if (typeof value === 'string' && value.length > rule.value) {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                        });
                    }
                    break;
                case 'pattern':
                    if (typeof value === 'string' && rule.value instanceof RegExp) {
                        if (!rule.value.test(value)) {
                            errors.push({
                                field: rule.field,
                                message: rule.message,
                                value,
                            });
                        }
                    }
                    break;
                case 'custom':
                    if (rule.validator && !rule.validator(value)) {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                        });
                    }
                    break;
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    /**
     * Execute calculation with dynamic code
     */
    async executeCalculation(language, calculationCode, parameters) {
        if (language === 'javascript') {
            return this.jsExecutor.executeCalculation(calculationCode, parameters);
        }
        else if (language === 'python') {
            return this.pythonExecutor.executeCalculation(calculationCode, parameters);
        }
        return {
            success: false,
            error: `Unsupported language: ${language}`,
            executionTime: 0,
        };
    }
    /**
     * Validate syntax without execution
     */
    async validateSyntax(language, code) {
        if (language === 'javascript') {
            return this.jsExecutor.validateSyntax(code);
        }
        else if (language === 'python') {
            return this.pythonExecutor.validateSyntax(code);
        }
        return {
            valid: false,
            error: `Unsupported language: ${language}`,
        };
    }
    /**
     * Get all available features
     */
    getAvailableFeatures() {
        return this.costCalculator.getAllFeatures();
    }
    /**
     * Get feature hours
     */
    getFeatureHours(feature) {
        return this.costCalculator.getFeatureHours(feature);
    }
    /**
     * Add custom feature to cost calculator
     */
    addCustomFeature(feature, hours, dependencies) {
        this.costCalculator.addCustomFeature(feature, hours, dependencies);
    }
    /**
     * Calculate earliest project completion date
     */
    calculateEarliestCompletion(input, startDate) {
        return this.timelineGenerator.calculateEarliestCompletion(input, startDate);
    }
    /**
     * Optimize timeline
     */
    optimizeTimeline(input) {
        return this.timelineGenerator.optimize(input);
    }
    /**
     * Compare cost scenarios
     */
    compareCostScenarios(baseInput, scenarios) {
        return this.costCalculator.compareScenarios(baseInput, scenarios);
    }
    /**
     * Check if Python is available
     */
    async isPythonAvailable() {
        return this.pythonExecutor.isPythonAvailable();
    }
    /**
     * Get Python version
     */
    async getPythonVersion() {
        return this.pythonExecutor.getPythonVersion();
    }
    /**
     * Get service statistics
     */
    getStats() {
        return {
            ...this.stats,
            config: this.config,
        };
    }
    /**
     * Reset statistics
     */
    resetStats() {
        this.stats = {
            totalExecutions: 0,
            successfulExecutions: 0,
            failedExecutions: 0,
            averageExecutionTime: 0,
            totalExecutionTime: 0,
        };
    }
    /**
     * Health check
     */
    async healthCheck() {
        return {
            enabled: this.config.enabled,
            javascript: true, // Always available
            python: await this.pythonExecutor.isPythonAvailable(),
            calculators: true, // Always available
        };
    }
    /**
     * Update configuration
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
        // Update executors
        if (config.defaultTimeout || config.defaultMemoryLimit) {
            this.jsExecutor.updateConfig({
                timeout: config.defaultTimeout || this.config.defaultTimeout,
                memoryLimit: config.defaultMemoryLimit || this.config.defaultMemoryLimit,
            });
            this.pythonExecutor.updateConfig({
                timeout: config.defaultTimeout || this.config.defaultTimeout,
                memoryLimit: config.defaultMemoryLimit || this.config.defaultMemoryLimit,
            });
        }
    }
    /**
     * Get configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Helper: Get nested value from object
     */
    getNestedValue(obj, path) {
        const keys = path.split('.');
        let value = obj;
        for (const key of keys) {
            if (value === undefined || value === null) {
                return undefined;
            }
            value = value[key];
        }
        return value;
    }
}
exports.CodeExecutionService = CodeExecutionService;
//# sourceMappingURL=CodeExecutionService.js.map