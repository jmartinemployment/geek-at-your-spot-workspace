"use strict";
// ============================================
// src/code-execution/executors/PythonExecutor.ts
// Sandboxed Python Execution
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythonExecutor = void 0;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const os = __importStar(require("os"));
class PythonExecutor {
    defaultConfig = {
        timeout: 10000,
        memoryLimit: 256 * 1024 * 1024, // 256MB
        allowedModules: ['math', 'json', 'datetime', 're'],
        allowNetworkAccess: false,
        allowFileSystem: false,
        allowProcessSpawn: false,
    };
    pythonPath;
    constructor(pythonPath, config) {
        this.pythonPath = pythonPath || 'python3';
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }
    /**
     * Execute Python code in a sandboxed environment
     */
    async execute(code, input, context) {
        const startTime = Date.now();
        const logs = [];
        try {
            // Merge context with defaults
            const sandboxConfig = {
                ...this.defaultConfig,
                timeout: context?.timeout || this.defaultConfig.timeout,
                allowedModules: context?.allowedModules || this.defaultConfig.allowedModules,
            };
            // Create temporary file for Python code
            const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'python-exec-'));
            const scriptPath = path.join(tempDir, 'script.py');
            // Wrap code with safety restrictions and input handling
            const wrappedCode = this.wrapCode(code, input, sandboxConfig);
            // Write code to temporary file
            await fs.writeFile(scriptPath, wrappedCode, 'utf-8');
            // Execute Python script
            const result = await this.runPythonScript(scriptPath, sandboxConfig.timeout);
            // Cleanup
            await fs.rm(tempDir, { recursive: true, force: true });
            const executionTime = Date.now() - startTime;
            // Parse output
            const output = this.parseOutput(result.stdout);
            const errorLogs = result.stderr ? result.stderr.split('\n').filter(line => line.trim()) : [];
            return {
                success: result.exitCode === 0,
                output: output.result,
                error: result.exitCode !== 0 ? result.stderr : undefined,
                executionTime,
                logs: [...output.logs, ...errorLogs],
            };
        }
        catch (error) {
            const executionTime = Date.now() - startTime;
            return {
                success: false,
                error: error.message,
                executionTime,
                logs,
            };
        }
    }
    /**
     * Execute a calculation function
     */
    async executeCalculation(calculationCode, parameters) {
        const code = `
import json

# User's calculation function
${calculationCode}

# Execute calculation with input
if __name__ == '__main__':
    result = calculate(__input__)
    print('__RESULT__', json.dumps(result))
`;
        return this.execute(code, parameters);
    }
    /**
     * Validate Python syntax without execution
     */
    async validateSyntax(code) {
        try {
            const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'python-check-'));
            const scriptPath = path.join(tempDir, 'check.py');
            await fs.writeFile(scriptPath, code, 'utf-8');
            const result = await this.runCommand(this.pythonPath, ['-m', 'py_compile', scriptPath], 5000);
            await fs.rm(tempDir, { recursive: true, force: true });
            return {
                valid: result.exitCode === 0,
                error: result.exitCode !== 0 ? result.stderr : undefined,
            };
        }
        catch (error) {
            return {
                valid: false,
                error: error.message,
            };
        }
    }
    /**
     * Execute with retry logic
     */
    async executeWithRetry(code, input, context, maxRetries = 2) {
        let lastError;
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const result = await this.execute(code, input, context);
                if (result.success) {
                    return result;
                }
                lastError = result.error;
                // Don't retry on syntax errors
                if (result.error?.includes('SyntaxError') || result.error?.includes('IndentationError')) {
                    return result;
                }
            }
            catch (error) {
                lastError = error;
            }
            // Wait before retry
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
    /**
     * Wrap Python code with safety restrictions
     */
    wrapCode(code, input, config) {
        const inputJson = JSON.stringify(input || {});
        return `
import sys
import json
import signal

# Setup timeout
def timeout_handler(signum, frame):
    raise TimeoutError('Execution timeout')

signal.signal(signal.SIGALRM, timeout_handler)
signal.alarm(${Math.ceil(config.timeout / 1000)})

# Disable dangerous modules
_blocked_modules = ['os', 'subprocess', 'socket', 'http', 'urllib', 'requests']
_original_import = __builtins__.__import__

def _restricted_import(name, *args, **kwargs):
    if any(blocked in name for blocked in _blocked_modules):
        raise ImportError(f'Module {name} is not allowed')
    return _original_import(name, *args, **kwargs)

__builtins__.__import__ = _restricted_import

# Setup input
__input__ = json.loads('${inputJson.replace(/'/g, "\\'")}')

# Capture logs
_logs = []
_original_print = print

def print(*args, **kwargs):
    message = ' '.join(str(arg) for arg in args)
    if not message.startswith('__RESULT__') and not message.startswith('__LOG__'):
        _logs.append(message)
        _original_print('__LOG__', message)
    else:
        _original_print(*args, **kwargs)

__builtins__.print = print

# User code
try:
    ${code}
except Exception as e:
    print('__ERROR__', str(e))
    sys.exit(1)
`;
    }
    /**
     * Run Python script
     */
    async runPythonScript(scriptPath, timeout) {
        return this.runCommand(this.pythonPath, [scriptPath], timeout);
    }
    /**
     * Run command with timeout
     */
    async runCommand(command, args, timeout) {
        return new Promise((resolve, reject) => {
            const process = (0, child_process_1.spawn)(command, args);
            let stdout = '';
            let stderr = '';
            let timedOut = false;
            const timeoutId = setTimeout(() => {
                timedOut = true;
                process.kill('SIGTERM');
                // Force kill after 1 second
                setTimeout(() => {
                    if (!process.killed) {
                        process.kill('SIGKILL');
                    }
                }, 1000);
            }, timeout);
            process.stdout.on('data', (data) => {
                stdout += data.toString();
            });
            process.stderr.on('data', (data) => {
                stderr += data.toString();
            });
            process.on('close', (code) => {
                clearTimeout(timeoutId);
                if (timedOut) {
                    reject(new Error(`Execution timeout after ${timeout}ms`));
                }
                else {
                    resolve({
                        stdout,
                        stderr,
                        exitCode: code || 0,
                    });
                }
            });
            process.on('error', (error) => {
                clearTimeout(timeoutId);
                reject(error);
            });
        });
    }
    /**
     * Parse Python output
     */
    parseOutput(stdout) {
        const lines = stdout.split('\n');
        const logs = [];
        let result = undefined;
        for (const line of lines) {
            if (line.startsWith('__RESULT__')) {
                try {
                    const jsonStr = line.substring('__RESULT__'.length).trim();
                    result = JSON.parse(jsonStr);
                }
                catch {
                    result = line.substring('__RESULT__'.length).trim();
                }
            }
            else if (line.startsWith('__LOG__')) {
                logs.push(line.substring('__LOG__'.length).trim());
            }
            else if (line.startsWith('__ERROR__')) {
                logs.push('[ERROR] ' + line.substring('__ERROR__'.length).trim());
            }
            else if (line.trim()) {
                logs.push(line);
            }
        }
        return { result, logs };
    }
    /**
     * Helper: Sleep function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.defaultConfig };
    }
    /**
     * Update configuration
     */
    updateConfig(config) {
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }
    /**
     * Get Python version
     */
    async getPythonVersion() {
        try {
            const result = await this.runCommand(this.pythonPath, ['--version'], 5000);
            return result.stdout.trim() || result.stderr.trim();
        }
        catch {
            return 'Unknown';
        }
    }
    /**
     * Check if Python is available
     */
    async isPythonAvailable() {
        try {
            const result = await this.runCommand(this.pythonPath, ['--version'], 5000);
            return result.exitCode === 0;
        }
        catch {
            return false;
        }
    }
}
exports.PythonExecutor = PythonExecutor;
//# sourceMappingURL=PythonExecutor.js.map