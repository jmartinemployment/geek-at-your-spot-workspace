"use strict";
// ============================================
// src/services/ClaudeService.ts
// Anthropic Claude API Integration
// ============================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeService = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
class ClaudeService {
    client;
    model = 'claude-sonnet-4-20250514';
    constructor(apiKey) {
        this.client = new sdk_1.default({
            apiKey: apiKey
        });
    }
    /**
     * Get system prompt for GeekQuote AI
     */
    getSystemPrompt() {
        return `You are GeekQuote AI, an intelligent project estimator for Geek @ Your Spot, a web development agency specializing in WordPress, Angular, React, and custom web applications.

Your role:
1. Have natural, friendly conversations with potential clients
2. Ask clarifying questions to understand their project needs
3. Provide accurate project estimates based on their requirements
4. Be helpful, professional, and enthusiastic

Services offered:
- WordPress websites (basic to advanced)
- E-commerce stores (WooCommerce, Shopify)
- Custom web applications (Angular, React)
- Website redesigns and migrations
- API integrations
- Ongoing maintenance and support

Pricing guidelines:
- Basic WordPress site (5-10 pages): $2,000 - $5,000, 2-3 weeks
- WordPress + E-commerce: $5,000 - $12,000, 4-6 weeks
- Custom Angular/React SPA: $8,000 - $20,000, 6-10 weeks
- Website redesign: $3,000 - $10,000, 3-5 weeks
- API integrations: $1,500 - $5,000, 1-3 weeks
- Hourly rate for consulting: $100/hour

Location: Delray Beach, Florida (serving local and remote clients)

When providing estimates:
- Ask about key features, integrations, and timeline
- Consider complexity factors (payment gateways, user auth, real-time features)
- Provide a realistic range, not a single number
- Explain what's included in the estimate
- Offer to schedule a consultation for detailed proposals

After understanding their needs, use the generate_quote tool to create a formal estimate.

Be conversational, not robotic. Show genuine interest in helping them succeed.`;
    }
    /**
     * Chat with Claude and get response
     */
    async chat(messages) {
        try {
            const response = await this.client.messages.create({
                model: this.model,
                max_tokens: 4096,
                system: this.getSystemPrompt(),
                messages: messages.map(msg => ({
                    role: msg.role === 'system' ? 'user' : msg.role,
                    content: msg.content
                })),
                tools: [
                    {
                        name: 'generate_quote',
                        description: 'Generate a formal project quote/estimate when you have enough information about the client\'s needs',
                        input_schema: {
                            type: 'object',
                            properties: {
                                projectType: {
                                    type: 'string',
                                    description: 'Type of project (e.g., "WordPress E-commerce Site", "Custom Angular Application")'
                                },
                                minBudget: {
                                    type: 'number',
                                    description: 'Minimum estimated budget in USD'
                                },
                                maxBudget: {
                                    type: 'number',
                                    description: 'Maximum estimated budget in USD'
                                },
                                timeline: {
                                    type: 'string',
                                    description: 'Estimated timeline (e.g., "4-6 weeks", "2-3 months")'
                                },
                                features: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: 'List of included features'
                                },
                                description: {
                                    type: 'string',
                                    description: 'Brief description of the project scope'
                                }
                            },
                            required: ['projectType', 'minBudget', 'maxBudget', 'timeline', 'features']
                        }
                    }
                ]
            });
            let responseText = '';
            let estimate;
            // Process response content
            for (const block of response.content) {
                if (block.type === 'text') {
                    responseText += block.text;
                }
                else if (block.type === 'tool_use' && block.name === 'generate_quote') {
                    estimate = block.input;
                }
            }
            return {
                response: responseText,
                estimate,
                tokenCount: response.usage.input_tokens + response.usage.output_tokens
            };
        }
        catch (error) {
            console.error('Claude API error:', error);
            throw new Error('Failed to get AI response');
        }
    }
    /**
     * Estimate API cost for a conversation
     */
    calculateCost(tokenCount) {
        // Claude Sonnet 4 pricing (approximate)
        const inputCostPer1M = 3.0; // $3 per million input tokens
        const outputCostPer1M = 15.0; // $15 per million output tokens
        // Simplified: assume 50/50 split input/output
        const avgCostPer1M = (inputCostPer1M + outputCostPer1M) / 2;
        return (tokenCount / 1_000_000) * avgCostPer1M;
    }
}
exports.ClaudeService = ClaudeService;
//# sourceMappingURL=ClaudeService.js.map