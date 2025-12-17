"use strict";
// ============================================
// src/a2a/agents/SpecializedAgents.ts
// Specialized Agent Implementations
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicalArchitectAgent = exports.CostEstimatorAgent = exports.ProjectManagerAgent = exports.QATesterAgent = exports.WriterAgent = exports.AnalystAgent = exports.DesignerAgent = exports.DeveloperAgent = exports.ResearcherAgent = exports.CoordinatorAgent = void 0;
const BaseAgent_1 = require("./BaseAgent");
/**
 * CoordinatorAgent - Orchestrates multi-agent workflows
 */
class CoordinatorAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        // Coordinator analyzes the task and creates a plan
        const prompt = `
As a Coordinator Agent, analyze this task and create an execution plan:

Task: ${task.title}
Description: ${task.description}
Input: ${JSON.stringify(task.input)}

Provide:
1. Required agents and their roles
2. Task breakdown with dependencies
3. Estimated timeline
4. Success criteria

Format as JSON.
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const content = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            plan: content,
            taskBreakdown: this.parseTaskBreakdown(content),
        };
    }
    parseTaskBreakdown(content) {
        try {
            // Try to extract JSON from response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        }
        catch {
            // Return raw content if parsing fails
        }
        return { rawPlan: content };
    }
}
exports.CoordinatorAgent = CoordinatorAgent;
/**
 * ResearcherAgent - Gathers and analyzes information
 */
class ResearcherAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a Researcher Agent, conduct research on this topic:

Task: ${task.title}
Description: ${task.description}
Context: ${JSON.stringify(task.input)}

Provide:
1. Key findings
2. Relevant data and statistics
3. Best practices
4. Recommendations
5. Sources and references
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const findings = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            findings,
            keyPoints: this.extractKeyPoints(findings),
            recommendations: this.extractRecommendations(findings),
        };
    }
    extractKeyPoints(text) {
        const lines = text.split('\n');
        return lines
            .filter(line => line.trim().match(/^[-•*]\s+/))
            .map(line => line.trim().replace(/^[-•*]\s+/, ''));
    }
    extractRecommendations(text) {
        const recommendationSection = text.match(/recommendations?:?([\s\S]*?)(?=\n\n|\n#|$)/i);
        if (recommendationSection) {
            return this.extractKeyPoints(recommendationSection[1]);
        }
        return [];
    }
}
exports.ResearcherAgent = ResearcherAgent;
/**
 * DeveloperAgent - Writes and reviews code
 */
class DeveloperAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a Developer Agent, work on this development task:

Task: ${task.title}
Description: ${task.description}
Requirements: ${JSON.stringify(task.input)}

Provide:
1. Implementation approach
2. Code structure
3. Key functions/components needed
4. Testing strategy
5. Potential challenges
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const implementation = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            implementation,
            codeBlocks: this.extractCodeBlocks(implementation),
            approach: implementation,
        };
    }
    extractCodeBlocks(text) {
        const blocks = [];
        const regex = /```(\w+)?\n([\s\S]*?)```/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            blocks.push({
                language: match[1] || 'text',
                code: match[2].trim(),
            });
        }
        return blocks;
    }
}
exports.DeveloperAgent = DeveloperAgent;
/**
 * DesignerAgent - Creates designs and mockups
 */
class DesignerAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a Designer Agent, create a design solution for:

Task: ${task.title}
Description: ${task.description}
Requirements: ${JSON.stringify(task.input)}

Provide:
1. Design concept
2. Color scheme and typography
3. Layout structure
4. Component hierarchy
5. User experience flow
6. Accessibility considerations
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const design = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            designConcept: design,
            specifications: this.parseDesignSpecs(design),
        };
    }
    parseDesignSpecs(text) {
        return {
            colorScheme: this.extractSection(text, 'color'),
            typography: this.extractSection(text, 'typography'),
            layout: this.extractSection(text, 'layout'),
        };
    }
    extractSection(text, sectionName) {
        const regex = new RegExp(`${sectionName}[:\\s]+(.*?)(?=\\n\\n|\\n[A-Z]|$)`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : '';
    }
}
exports.DesignerAgent = DesignerAgent;
/**
 * AnalystAgent - Analyzes data and provides insights
 */
class AnalystAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As an Analyst Agent, analyze the following:

Task: ${task.title}
Description: ${task.description}
Data: ${JSON.stringify(task.input)}

Provide:
1. Data summary
2. Key metrics
3. Trends and patterns
4. Insights and findings
5. Recommendations
6. Risk assessment
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const analysis = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            analysis,
            keyMetrics: this.extractMetrics(analysis),
            insights: this.extractInsights(analysis),
            recommendations: this.extractRecommendations(analysis),
        };
    }
    extractMetrics(text) {
        const metrics = {};
        const lines = text.split('\n');
        for (const line of lines) {
            const match = line.match(/(\w+(?:\s+\w+)*?):\s*([0-9.]+%?)/);
            if (match) {
                metrics[match[1].toLowerCase().replace(/\s+/g, '_')] = match[2];
            }
        }
        return metrics;
    }
    extractInsights(text) {
        const insightsSection = text.match(/insights?:?([\s\S]*?)(?=\n\n|\n#|recommendations|$)/i);
        if (insightsSection) {
            return this.extractKeyPoints(insightsSection[1]);
        }
        return [];
    }
    extractKeyPoints(text) {
        const lines = text.split('\n');
        return lines
            .filter(line => line.trim().match(/^[-•*]\s+/))
            .map(line => line.trim().replace(/^[-•*]\s+/, ''));
    }
    extractRecommendations(text) {
        const recommendationSection = text.match(/recommendations?:?([\s\S]*?)(?=\n\n|\n#|$)/i);
        if (recommendationSection) {
            return this.extractKeyPoints(recommendationSection[1]);
        }
        return [];
    }
}
exports.AnalystAgent = AnalystAgent;
/**
 * WriterAgent - Creates documentation and content
 */
class WriterAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a Writer Agent, create content for:

Task: ${task.title}
Description: ${task.description}
Requirements: ${JSON.stringify(task.input)}

Provide well-structured, clear, and professional content.
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const content = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            content,
            wordCount: content.split(/\s+/).length,
            sections: this.extractSections(content),
        };
    }
    extractSections(text) {
        const headers = text.match(/^#+\s+.+$/gm);
        return headers ? headers.map(h => h.replace(/^#+\s+/, '')) : [];
    }
}
exports.WriterAgent = WriterAgent;
/**
 * QATesterAgent - Tests and ensures quality
 */
class QATesterAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a QA Tester Agent, review and test:

Task: ${task.title}
Description: ${task.description}
Artifact to test: ${JSON.stringify(task.input)}

Provide:
1. Test plan
2. Test cases
3. Quality assessment
4. Issues found
5. Recommendations for improvement
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const testResults = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            testResults,
            testCases: this.extractTestCases(testResults),
            issues: this.extractIssues(testResults),
            qualityScore: this.calculateQualityScore(testResults),
        };
    }
    extractTestCases(text) {
        const testSection = text.match(/test cases?:?([\s\S]*?)(?=\n\n|\n#|quality|$)/i);
        if (testSection) {
            return this.extractKeyPoints(testSection[1]);
        }
        return [];
    }
    extractIssues(text) {
        const issuesSection = text.match(/issues? found:?([\s\S]*?)(?=\n\n|\n#|recommendations|$)/i);
        if (issuesSection) {
            return this.extractKeyPoints(issuesSection[1]);
        }
        return [];
    }
    extractKeyPoints(text) {
        const lines = text.split('\n');
        return lines
            .filter(line => line.trim().match(/^[-•*]\s+/))
            .map(line => line.trim().replace(/^[-•*]\s+/, ''));
    }
    calculateQualityScore(text) {
        // Simple heuristic: fewer issues = higher score
        const issues = this.extractIssues(text);
        const baseScore = 100;
        const deduction = issues.length * 10;
        return Math.max(0, baseScore - deduction);
    }
}
exports.QATesterAgent = QATesterAgent;
/**
 * ProjectManagerAgent - Manages projects and coordinates teams
 */
class ProjectManagerAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a Project Manager Agent, manage this project aspect:

Task: ${task.title}
Description: ${task.description}
Context: ${JSON.stringify(task.input)}

Provide:
1. Project plan
2. Timeline and milestones
3. Resource allocation
4. Risk assessment
5. Success metrics
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const plan = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            projectPlan: plan,
            milestones: this.extractMilestones(plan),
            risks: this.extractRisks(plan),
        };
    }
    extractMilestones(text) {
        const milestoneSection = text.match(/milestones?:?([\s\S]*?)(?=\n\n|\n#|resources|$)/i);
        if (milestoneSection) {
            return this.extractKeyPoints(milestoneSection[1]);
        }
        return [];
    }
    extractRisks(text) {
        const riskSection = text.match(/risks?:?([\s\S]*?)(?=\n\n|\n#|success|$)/i);
        if (riskSection) {
            return this.extractKeyPoints(riskSection[1]);
        }
        return [];
    }
    extractKeyPoints(text) {
        const lines = text.split('\n');
        return lines
            .filter(line => line.trim().match(/^[-•*]\s+/))
            .map(line => line.trim().replace(/^[-•*]\s+/, ''));
    }
}
exports.ProjectManagerAgent = ProjectManagerAgent;
/**
 * CostEstimatorAgent - Estimates costs and budgets
 */
class CostEstimatorAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a Cost Estimator Agent, estimate costs for:

Task: ${task.title}
Description: ${task.description}
Requirements: ${JSON.stringify(task.input)}

Provide:
1. Detailed cost breakdown
2. Total estimated cost
3. Cost assumptions
4. Risk factors affecting cost
5. Cost optimization suggestions
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const estimate = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            costEstimate: estimate,
            breakdown: this.extractCostBreakdown(estimate),
            totalCost: this.extractTotalCost(estimate),
            assumptions: this.extractAssumptions(estimate),
        };
    }
    extractCostBreakdown(text) {
        const breakdown = {};
        const lines = text.split('\n');
        for (const line of lines) {
            const match = line.match(/(.+?):\s*\$?([\d,]+(?:\.\d{2})?)/);
            if (match) {
                const key = match[1].trim().toLowerCase().replace(/\s+/g, '_');
                const value = parseFloat(match[2].replace(/,/g, ''));
                breakdown[key] = value;
            }
        }
        return breakdown;
    }
    extractTotalCost(text) {
        const match = text.match(/total.*?:\s*\$?([\d,]+(?:\.\d{2})?)/i);
        if (match) {
            return parseFloat(match[1].replace(/,/g, ''));
        }
        return 0;
    }
    extractAssumptions(text) {
        const assumptionSection = text.match(/assumptions?:?([\s\S]*?)(?=\n\n|\n#|risk|$)/i);
        if (assumptionSection) {
            return this.extractKeyPoints(assumptionSection[1]);
        }
        return [];
    }
    extractKeyPoints(text) {
        const lines = text.split('\n');
        return lines
            .filter(line => line.trim().match(/^[-•*]\s+/))
            .map(line => line.trim().replace(/^[-•*]\s+/, ''));
    }
}
exports.CostEstimatorAgent = CostEstimatorAgent;
/**
 * TechnicalArchitectAgent - Designs system architecture
 */
class TechnicalArchitectAgent extends BaseAgent_1.BaseAgent {
    async executeTaskLogic(task) {
        const prompt = `
As a Technical Architect Agent, design architecture for:

Task: ${task.title}
Description: ${task.description}
Requirements: ${JSON.stringify(task.input)}

Provide:
1. Architecture overview
2. Technology stack recommendations
3. System components
4. Data flow
5. Scalability considerations
6. Security considerations
`;
        const response = await this.client.messages.create({
            model: this.config.model || 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: this.config.systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });
        const architecture = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        return {
            architecture,
            techStack: this.extractTechStack(architecture),
            components: this.extractComponents(architecture),
        };
    }
    extractTechStack(text) {
        const techSection = text.match(/technology stack:?([\s\S]*?)(?=\n\n|\n#|system|$)/i);
        if (techSection) {
            return this.extractKeyPoints(techSection[1]);
        }
        return [];
    }
    extractComponents(text) {
        const componentSection = text.match(/components?:?([\s\S]*?)(?=\n\n|\n#|data|$)/i);
        if (componentSection) {
            return this.extractKeyPoints(componentSection[1]);
        }
        return [];
    }
    extractKeyPoints(text) {
        const lines = text.split('\n');
        return lines
            .filter(line => line.trim().match(/^[-•*]\s+/))
            .map(line => line.trim().replace(/^[-•*]\s+/, ''));
    }
}
exports.TechnicalArchitectAgent = TechnicalArchitectAgent;
//# sourceMappingURL=SpecializedAgents.js.map