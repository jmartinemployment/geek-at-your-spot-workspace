"use strict";
// ============================================
// src/code-execution/executors/JavaScriptExecutor.ts
// Sandboxed JavaScript Execution using VM2
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaScriptExecutor = void 0;
// @ts-ignore - VM2 doesn't have official types
const vm2_1 = require("vm2");
class JavaScriptExecutor {
    config;
    defaultConfig = {
        timeout: 5000,
        memoryLimit: 128 * 1024 * 1024, // 128MB
        allowedModules: ['lodash', 'moment', 'date-fns'],
        allowNetworkAccess: false,
        allowFileSystem: false,
        allowProcessSpawn: false,
    };
    constructor(config) {
        this.config = config;
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }
    async execute(code, input, context) {
        const startTime = Date.now();
        const logs = [];
        try {
            const sandboxConfig = {
                ...this.defaultConfig,
                timeout: context?.timeout || this.defaultConfig.timeout,
                allowedModules: context?.allowedModules || this.defaultConfig.allowedModules,
            };
            const vm = new vm2_1.VM({
                timeout: sandboxConfig.timeout,
                allowAsync: true,
                sandbox: {
                    input: input || {},
                    console: {
                        log: (...args) => {
                            logs.push(args.map(arg => this.stringify(arg)).join(' '));
                        },
                        error: (...args) => {
                            logs.push('[ERROR] ' + args.map(arg => this.stringify(arg)).join(' '));
                        },
                        warn: (...args) => {
                            logs.push('[WARN] ' + args.map(arg => this.stringify(arg)).join(' '));
                        },
                        info: (...args) => {
                            logs.push('[INFO] ' + args.map(arg => this.stringify(arg)).join(' '));
                        },
                    },
                    Math: Math,
                    Date: Date,
                    JSON: JSON,
                    Array: Array,
                    Object: Object,
                    String: String,
                    Number: Number,
                    __result: undefined,
                },
            });
            const wrappedCode = `
        (async () => {
          ${code}
        })().then(result => {
          __result = result;
        }).catch(error => {
          throw error;
        });
      `;
            await vm.run(wrappedCode);
            const output = vm.sandbox.__result;
            const executionTime = Date.now() - startTime;
            return {
                success: true,
                output,
                executionTime,
                logs,
            };
        }
        catch (error) {
            const executionTime = Date.now() - startTime;
            let errorMessage = error.message;
            if (error.message?.includes('Script execution timed out')) {
                errorMessage = `Execution timeout after ${this.defaultConfig.timeout}ms`;
            }
            else if (error.message?.includes('memory limit')) {
                errorMessage = 'Memory limit exceeded';
            }
            return {
                success: false,
                error: errorMessage,
                executionTime,
                logs,
            };
        }
    }
    async executeCalculation(calculationCode, parameters) {
        const code = `
      const calculate = ${calculationCode};
      return calculate(input);
    `;
        return this.execute(code, parameters);
    }
    validateSyntax(code) {
        try {
            new Function(code);
            return { valid: true };
        }
        catch (error) {
            return {
                valid: false,
                error: error.message,
            };
        }
    }
    async executeWithRetry(code, input, context, maxRetries = 2) {
        let lastError;
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const result = await this.execute(code, input, context);
                if (result.success) {
                    return result;
                }
                lastError = result.error;
                if (result.error?.includes('SyntaxError')) {
                    return result;
                }
            }
            catch (error) {
                lastError = error;
            }
            if (attempt < maxRetries) {
                await this.sleep(Math.pow(2, attempt) * 100);
            }
        }
        return {
            success: false,
            error: `Failed after ${maxRetries + 1} attempts: ${lastError}`,
            executionTime: 0,
            logs: [],
        };
    }
    async executeParallel(executions) {
        const promises = executions.map(({ code, input, context }) => this.execute(code, input, context));
        return Promise.all(promises);
    }
    stringify(value) {
        try {
            if (typeof value === 'string')
                return value;
            if (typeof value === 'undefined')
                return 'undefined';
            if (value === null)
                return 'null';
            if (typeof value === 'function')
                return '[Function]';
            return JSON.stringify(value, null, 2);
        }
        catch {
            return String(value);
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getConfig() {
        return { ...this.defaultConfig };
    }
    updateConfig(config) {
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }
}
exports.JavaScriptExecutor = JavaScriptExecutor;
//# sourceMappingURL=JavaScriptExecutor.js.map