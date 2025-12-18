import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService, MCPChatRequest } from './api.service';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface QuoteEstimate {
  projectType: string;
  minBudget: number;
  maxBudget: number;
  timeline: string;
  features: string[];
}

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface ChatResponse {
  response: string;
  estimate?: QuoteEstimate;
}

@Injectable({
  providedIn: 'root',
})
export class GeekQuoteAiService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly apiService = inject(ApiService);

  constructor() {
    console.log('GeekQuoteAI Service initialized with MCP backend');
  }

  /**
   * Send chat message via MCP backend
   */
  async sendMessage(
    messages: Message[],
    leadInfo: LeadInfo
  ): Promise<ChatResponse> {

    if (!this.isBrowser) {
      throw new Error('API calls only available in browser');
    }

    if (!messages || messages.length === 0) {
      throw new Error('Messages array cannot be empty');
    }

    try {
      // Convert to MCP format (filter out system messages)
      const mcpMessages = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));

      // Build comprehensive system prompt with lead context
      const systemPrompt = this.buildSystemPrompt(leadInfo);

      // Prepare MCP request
      const mcpRequest: MCPChatRequest = {
        messages: mcpMessages,
        system_prompt: systemPrompt,
        max_tool_uses: 10,
        temperature: 0.7
      };

      // Call MCP backend
      const mcpResponse = await this.apiService.chat(mcpRequest).toPromise();

      if (!mcpResponse) {
        throw new Error('No response from MCP backend');
      }

      // Extract text from response
      const responseText = this.extractTextFromResponse(mcpResponse);

      // Try to extract quote estimate if Claude generated one
      const estimate = this.extractEstimate(responseText);

      return {
        response: responseText,
        estimate: estimate
      };

    } catch (error) {
      console.error('GeekQuoteAI Service Error:', error);

      if (error instanceof Error) {
        throw new Error(`Failed to send message: ${error.message}`);
      }
      throw new Error('Failed to send message: Unknown error');
    }
  }

  /**
   * Build system prompt with lead context and MCP instructions
   */
  private buildSystemPrompt(leadInfo: LeadInfo): string {
    return `You are an expert AI assistant for GeekQuote, a professional software development company.

CURRENT CLIENT CONTEXT:
- Name: ${leadInfo.name || 'Prospective Client'}
- Email: ${leadInfo.email || 'Not provided yet'}
- Phone: ${leadInfo.phone || 'Not provided yet'}
- Company: ${leadInfo.company || 'Not provided yet'}

AVAILABLE MCP TOOLS (use them proactively):
1. search_past_projects - Find similar completed projects with costs and timelines
2. get_project_statistics - Get aggregate data about project types, costs, durations
3. get_technology_recommendations - Suggest tech stacks based on requirements
4. search_services - Find relevant services we offer
5. get_service_details - Get detailed info about specific services
6. recommend_services - AI-powered service recommendations
7. calculate_service_package - Calculate bundled service costs
8. estimate_project_cost - Detailed project cost breakdown with confidence scores
9. get_feature_pricing - Pricing for specific features
10. compare_pricing_options - Compare MVP vs Standard vs Premium tiers
11. suggest_cost_optimizations - Budget optimization strategies

YOUR OBJECTIVES:
1. Qualify the lead by understanding their project requirements
2. Use MCP tools to provide accurate, data-driven estimates
3. Reference past similar projects when relevant
4. Suggest appropriate technologies and services
5. Provide transparent pricing with clear breakdowns
6. Build trust through specific examples and data

CONVERSATION GUIDELINES:
- Be professional, friendly, and consultative
- Ask clarifying questions when requirements are unclear
- Use tools proactively (don't wait to be asked)
- Provide specific numbers and examples
- Reference past projects and success metrics
- Explain your reasoning and confidence levels
- Offer options (MVP, standard, premium approaches)
- Suggest cost-saving alternatives when appropriate

When discussing pricing:
- Always use estimate_project_cost or calculate_service_package tools
- Show breakdown by feature/phase
- Include timeline estimates
- Explain what's included vs optional
- Mention factors that could affect cost

Remember: You have access to real data through MCP tools. Use them to provide accurate, personalized recommendations!`;
  }

  /**
   * Extract text from MCP response
   */
  private extractTextFromResponse(response: any): string {
    // Backend now returns content as a string directly
    if (typeof response.content === 'string') {
      return response.content;
    }

    // Fallback to old format (array of blocks)
    if (!response.content || !Array.isArray(response.content)) {
      return 'Sorry, I received an invalid response.';
    }

    return response.content
      .filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n\n');
  }

  /**
   * Extract quote estimate from Claude's response
   */
  private extractEstimate(text: string): QuoteEstimate | undefined {
    // Look for budget range patterns
    const budgetPatterns = [
      /\$([0-9,]+)\s*-\s*\$([0-9,]+)/,  // $5,000 - $10,000
      /\$([0-9,]+)\s*to\s*\$([0-9,]+)/, // $5,000 to $10,000
      /between\s*\$([0-9,]+)\s*and\s*\$([0-9,]+)/i, // between $5,000 and $10,000
    ];

    let minBudget = 0;
    let maxBudget = 0;

    for (const pattern of budgetPatterns) {
      const match = text.match(pattern);
      if (match) {
        minBudget = parseInt(match[1].replace(/,/g, ''));
        maxBudget = parseInt(match[2].replace(/,/g, ''));
        break;
      }
    }

    // Look for timeline patterns
    const timelinePatterns = [
      /(\d+)\s*-\s*(\d+)\s*(weeks?|months?)/i,  // 8-12 weeks
      /(\d+)\s*(weeks?|months?)/i,              // 10 weeks
    ];

    let timeline = 'TBD';

    for (const pattern of timelinePatterns) {
      const match = text.match(pattern);
      if (match) {
        timeline = match[0];
        break;
      }
    }

    // Extract project type (look for common keywords)
    const projectTypes = [
      'web application', 'mobile app', 'e-commerce', 'dashboard',
      'API', 'website', 'platform', 'portal', 'SaaS'
    ];

    let projectType = 'Custom Project';
    const lowerText = text.toLowerCase();

    for (const type of projectTypes) {
      if (lowerText.includes(type)) {
        projectType = type.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
      }
    }

    // Extract features (look for bullet points or numbered lists)
    const features: string[] = [];
    const featurePatterns = [
      /[-•]\s*([^\n]+)/g,           // Bullet points
      /\d+\.\s*([^\n]+)/g,          // Numbered lists
    ];

    for (const pattern of featurePatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const feature = match[1].trim();
        if (feature.length > 10 && feature.length < 100) {
          features.push(feature);
        }
      }
    }

    // Only return estimate if we found meaningful data
    if (minBudget > 0 || timeline !== 'TBD' || features.length > 0) {
      return {
        projectType,
        minBudget,
        maxBudget,
        timeline,
        features: features.slice(0, 8) // Limit to 8 features
      };
    }

    return undefined;
  }

  /**
   * Check if service is configured
   */
  isConfigured(): boolean {
    // MCP backend is always ready (no API key needed in frontend)
    return true;
  }
}
/* ```

---

## 🗑️ **What to Remove:**

From your old service:
- ❌ `API_URL` config (not needed, using environment.apiUrl from api.service)
- ❌ `API_KEY` config (backend handles Anthropic key now)
- ❌ `ChatRequest` interface (using MCP format)
- ❌ `getConversation()` method (unless your backend supports this)
- ❌ Direct `fetch()` calls (using api.service)

---

## ✨ **What You Gain:**

1. ✅ **11 MCP Tools** - Claude can search projects, calculate costs, recommend tech
2. ✅ **Better Estimates** - Data-driven from actual past projects
3. ✅ **Smarter Responses** - Claude uses tools automatically
4. ✅ **Lead Context** - System prompt includes lead info
5. ✅ **Auto Extraction** - Pulls out budget/timeline/features from response
6. ✅ **No Frontend API Key** - More secure (key stays on backend)

---

## 📋 **Summary:**

**Architecture:**
```
Component → geek-quote-ai.service → api.service → MCP Backend → Claude + Tools */
