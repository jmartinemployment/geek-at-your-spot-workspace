import { CodeExecutionResult, ExecutionContext, SandboxConfig } from '../types';
export declare class PythonExecutor {
    private defaultConfig;
    private pythonPath;
    constructor(pythonPath?: string, config?: Partial<SandboxConfig>);
    /**
     * Execute Python code in a sandboxed environment
     */
    execute(code: string, input?: any, context?: ExecutionContext): Promise<CodeExecutionResult>;
    /**
     * Execute a calculation function
     */
    executeCalculation(calculationCode: string, parameters: Record<string, any>): Promise<CodeExecutionResult>;
    /**
     * Validate Python syntax without execution
     */
    validateSyntax(code: string): Promise<{
        valid: boolean;
        error?: string;
    }>;
    /**
     * Execute with retry logic
     */
    executeWithRetry(code: string, input?: any, context?: ExecutionContext, maxRetries?: number): Promise<CodeExecutionResult>;
    /**
     * Wrap Python code with safety restrictions
     */
    private wrapCode;
    /**
     * Run Python script
     */
    private runPythonScript;
    /**
     * Run command with timeout
     */
    private runCommand;
    /**
     * Parse Python output
     */
    private parseOutput;
    /**
     * Helper: Sleep function
     */
    private sleep;
    /**
     * Get current configuration
     */
    getConfig(): SandboxConfig;
    /**
     * Update configuration
     */
    updateConfig(config: Partial<SandboxConfig>): void;
    /**
     * Get Python version
     */
    getPythonVersion(): Promise<string>;
    /**
     * Check if Python is available
     */
    isPythonAvailable(): Promise<boolean>;
}
//# sourceMappingURL=PythonExecutor.d.ts.map