// ============================================
// geek-quote-ai.ts (replace your existing file with this)
// GeekQuote AI Chatbot Component - Refactored & Clean
// ============================================

import {
  Component,
  signal,
  computed,
  PLATFORM_ID,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import service and types from shared services folder
import {
  GeekQuoteAiService,
  Message,
  QuoteEstimate,
  LeadInfo
} from '../services/geek-quote-ai.service';

// ============================================
// COMPONENT
// ============================================

@Component({
  selector: 'lib-geek-quote-ai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './geek-quote-ai.component.html',
  styleUrl: './geek-quote-ai.component.scss',
})

export class GeekQuoteAiComponent implements AfterViewInit {

imageUrl = 'https://geekatyourspot.com/wp-content/uploads/2025/10/geek@yourSpot-1.jpeg';
title = 'Empower Your Small Business with Smart Technology';
subtitle = 'Empower Your Small Business with Smart Technology';

  // ============================================
  // DEPENDENCY INJECTION
  // ============================================

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly geekQuoteService = inject(GeekQuoteAiService);

  // ============================================
  // VIEW CHILDREN - Proper DOM access
  // ============================================

  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  // ============================================
  // CONSTANTS
  // ============================================

  private readonly SCROLL_DELAY_MS = 100;

  // ============================================
  // STATE SIGNALS
  // ============================================

  /** Array of chat messages */
  messages = signal<Message[]>([]);

  /** Current user input text */
  userInput = '';

  /** Whether AI is processing a response */
  isThinking = signal(false);

  /** Current quote estimate from AI */
  currentEstimate = signal<QuoteEstimate | null>(null);

  /** Whether conversation has started */
  conversationStarted = signal(false);

  // ============================================
  // LEAD INFORMATION SIGNALS
  // ============================================

  /** Lead's name (persisted) */
  leadName = signal<string>('');

  /** Lead's email (persisted) */
  leadEmail = signal<string>('');

  /** Lead's phone (persisted) */
  leadPhone = signal<string>('');

  // ============================================
  // TEMPORARY FORM VARIABLES (converted to signals for consistency)
  // ============================================

  /** Temporary name input (before submission) */
  tempName = signal('');

  /** Temporary email input (before submission) */
  tempEmail = signal('');

  /** Temporary phone input (before submission) */
  tempPhone = signal('');

  // ============================================
  // COMPUTED PROPERTIES
  // ============================================

  /** Total number of messages in conversation */
  messageCount = computed(() => this.messages().length);

  /** Whether lead info has been captured */
  hasLeadInfo = computed(() => !!(this.leadName() && this.leadEmail()));

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  constructor() {
    // Initialize with welcome message
    this.addMessage('assistant', this.getWelcomeMessage());
  }

  ngAfterViewInit(): void {
    // Initial scroll to bottom after view is initialized
    setTimeout(() => this.scrollToBottom(), this.SCROLL_DELAY_MS);
  }

  // ============================================
  // PUBLIC METHODS
  // ============================================

  /**
   * Handle message send from user
   * @param event - Form submit event
   */
  async sendMessage(event: Event): Promise<void> {
    event.preventDefault();

    // Validation: Don't send if input is empty or AI is thinking
    if (!this.userInput.trim() || this.isThinking()) {
      return;
    }

    const userMessage = this.userInput.trim();

    // Add user message to chat
    this.addMessage('user', userMessage);

    // Clear input field
    this.userInput = '';

    // Set thinking state
    this.isThinking.set(true);
    this.conversationStarted.set(true);

    // Scroll to show user message
    setTimeout(() => this.scrollToBottom(), this.SCROLL_DELAY_MS);

    try {
      // Prepare lead info
      const leadInfo: LeadInfo = {
        name: this.leadName(),
        email: this.leadEmail(),
        phone: this.leadPhone()
      };

      // Call service (no API logic in component!)
      const response = await this.geekQuoteService.sendMessage(
        this.messages(),
        leadInfo
      );

      // Add AI response to chat
      this.addMessage('assistant', response.response);

      // Update estimate if provided
      if (response.estimate) {
        this.currentEstimate.set(response.estimate);
      }

      // Success - stop thinking
      this.isThinking.set(false);

      // Scroll to show AI response
      setTimeout(() => this.scrollToBottom(), this.SCROLL_DELAY_MS);

    } catch (error) {
      // Error handling
      console.error('Chat Error:', error);

      const errorMessage = error instanceof Error
        ? error.message
        : 'Unknown error occurred';

      this.addMessage(
        'assistant',
        `Sorry, I encountered an error: ${errorMessage}. Please try again or contact us directly at contact@geekatyourspot.com`
      );

      this.isThinking.set(false);
    }
  }

  /**
   * Capture lead information from form
   * @param event - Form submit event
   */
  captureLeadInfo(event: Event): void {
    event.preventDefault();

    // Validate required fields
    if (!this.tempName() || !this.tempEmail()) {
      console.warn('Name and email are required');
      return;
    }

    // Persist to lead signals
    this.leadName.set(this.tempName());
    this.leadEmail.set(this.tempEmail());
    this.leadPhone.set(this.tempPhone());

    // Confirmation message
    this.addMessage(
      'assistant',
      `Thanks ${this.tempName()}! I've got your contact info. Let me continue helping you with your project...`
    );

    // Clear temp fields
    this.tempName.set('');
    this.tempEmail.set('');
    this.tempPhone.set('');
  }

  /**
   * Format message content with simple markdown-like syntax
   * @param content - Raw message content
   * @returns HTML string with formatting
   *
   * NOTE: In production, consider using DomSanitizer for XSS protection
   */
  formatMessage(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
      .replace(/\n/g, '<br>')                             // Line breaks
      .replace(/^- (.*)/gm, '<li>$1</li>')               // List items
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');        // Wrap lists
  }

  /**
   * Format timestamp for display
   * @param date - Message timestamp
   * @returns Formatted time string
   */
  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Get welcome message for new conversations
   */
  private getWelcomeMessage(): string {
    return `Hi! I'm GeekQuote AI, your instant project estimator. 🚀

I can help you get a quick quote for your web development project. Just tell me what you're looking to build, and I'll ask a few questions to give you an accurate estimate.

**What kind of project do you have in mind?**

Some examples:
- "I need a website for my restaurant"
- "I want an e-commerce store for selling products"
- "I need a custom web application"
- "I want to redesign my existing website"`;
  }

  /**
   * Add a message to the conversation
   * @param role - Message sender role
   * @param content - Message content
   */
  private addMessage(role: 'user' | 'assistant', content: string): void {
    this.messages.update(msgs => [
      ...msgs,
      {
        role,
        content,
        timestamp: new Date()
      }
    ]);
  }

  /**
   * Scroll chat container to bottom
   * Uses ViewChild for proper Angular DOM access
   */
  private scrollToBottom(): void {
    // Guard: Only run in browser
    if (!this.isBrowser) return;

    // Guard: Ensure element exists
    if (!this.messagesContainer) return;

    const element = this.messagesContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }
}
