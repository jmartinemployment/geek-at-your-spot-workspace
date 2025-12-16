import { InjectionToken } from '@angular/core';

/**
 * Configuration interface for GeekQuoteAI
 */
export interface GeekQuoteAiConfig {
  apiUrl: string;
  apiKey: string;
}

/**
 * Injection token for GeekQuoteAI configuration
 * Use this to provide configuration from the consuming application
 */
export const GEEK_QUOTE_AI_CONFIG = new InjectionToken<GeekQuoteAiConfig>(
  'GeekQuoteAI Configuration',
  {
    providedIn: 'root',
    factory: () => ({
      apiUrl: 'http://localhost:3000/api/mcp/chat',
      apiKey: 'm9rBdZs8xe1h5omHTNGnVismQB0lywnsYlhFWtj6sqk='
    })
  }
);


//'http://localhost:3000/api/chat',
