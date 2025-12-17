export declare class OrchestrationService {
    constructor(config: any);
    getAgentStats(): {
        totalAgents: number;
        activeAgents: number;
        message: string;
    };
    cleanup(): Promise<void>;
}
//# sourceMappingURL=OrchestrationService.d.ts.map