import { CodeExecutionResult, ExecutionContext, SandboxConfig } from '../types';
export declare class JavaScriptExecutor {
    private config?;
    private defaultConfig;
    constructor(config?: Partial<SandboxConfig>);
    execute(code: string, input?: any, context?: ExecutionContext): Promise<CodeExecutionResult>;
    executeCalculation(calculationCode: string, parameters: Record<string, any>): Promise<CodeExecutionResult>;
    validateSyntax(code: string): {
        valid: boolean;
        error?: string;
    };
    executeWithRetry(code: string, input?: any, context?: ExecutionContext, maxRetries?: number): Promise<CodeExecutionResult>;
    executeParallel(executions: Array<{
        code: string;
        input?: any;
        context?: ExecutionContext;
    }>): Promise<CodeExecutionResult[]>;
    private stringify;
    private sleep;
    getConfig(): SandboxConfig;
    updateConfig(config: Partial<SandboxConfig>): void;
}
//# sourceMappingURL=JavaScriptExecutor.d.ts.map