import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeekQuoteAiService, LeadInfo, Message } from '../services/geek-quote-ai.service';
import { GeekQuoteModalComponent } from '../geek-quote-modal/geek-quote-modal.component';
import { ConversationPhase } from '../services/api.service';
import { GeekEmailService } from '../services/geek-email-service';

@Component({
  selector: 'geek-quote-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, GeekQuoteModalComponent],
  templateUrl: './geek-quote-ai.component.html',
  styleUrls: ['./geek-quote-ai.component.css']
})
export class GeekQuoteAiComponent implements OnInit {
  userInput: string = '';
  messages: Message[] = [];
  conversationId: string | null = null;
  isLoading = false;
  private emailSent = false; // Track if email was already sent

  // Modal controls
  isModalOpen = signal<boolean>(false);
  modalTitle = signal<string>('AI Quote Assistant');
  showModalCloseButton = signal<boolean>(true);

  // New properties for Path B
  currentPhase: ConversationPhase = 'gathering';
  readinessScore: number = 0;
  estimateReady: boolean = false;
  escalationReason: string = '';

  leadInfo: LeadInfo = {
    name: 'Prospective Client',
    email: '',
    phone: ''
  };

  constructor(
    private geekQuoteService: GeekQuoteAiService,
    private emailService: GeekEmailService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeConversation();
  }

  private initializeConversation(): void {
    const welcomeMessage: Message = {
      role: 'assistant',
      content: 'Hello! I\'m here to help you get a quote for your project. What can I help you with today?',
      timestamp: new Date()
    };
    this.messages = [welcomeMessage];
  }

  isThinking(): boolean {
    return this.isLoading;
  }

  async sendMessage(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.userInput.trim() || this.isLoading) {
      return;
    }

    const userMessage = this.userInput.trim();
    this.userInput = '';
    
    // Open modal when first message is sent
    if (!this.isModalOpen()) {
      this.isModalOpen.set(true);
    }

    await this.processMessage(userMessage);
  }

  async onDialogMessage(message: string): Promise<void> {
    await this.processMessage(message);
  }

  private async processMessage(content: string): Promise<void> {
    this.messages.push({
      role: 'user',
      content,
      timestamp: new Date()
    });

    this.isLoading = true;
    this.cdr.detectChanges();

    try {
      const response = await this.geekQuoteService.sendMessage(
        this.messages,
        this.leadInfo
      );

      // Add assistant's response
      this.messages.push({
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      });

      // Update Path B state
      const wasEstimateReady = this.estimateReady;
      this.currentPhase = response.phase || 'gathering';
      this.readinessScore = response.readinessScore || 0;
      this.estimateReady = response.estimateReady || false;
      this.escalationReason = response.escalationReason || '';

      this.isLoading = false;
      this.cdr.detectChanges();

      // Update dialog title based on current phase
      this.updateModalTitle();

      // AUTO-SEND EMAIL when quote becomes ready (only once)
      if (this.estimateReady && !wasEstimateReady && !this.emailSent) {
        await this.autoSendQuoteEmail();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.messages.push({
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      });
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  // AUTO-SEND email when quote is displayed
  private async autoSendQuoteEmail(): Promise<void> {
    this.emailSent = true; // Prevent duplicate sends
    
    try {
      // Validate email exists
      if (!this.leadInfo.email || this.leadInfo.email === 'noreply@geekatyourspot.com') {
        this.appendToLastMessage('\n\n---\n⚠️ Please provide your email address to receive this quote.');
        return;
      }

      // Format conversation summary
      const conversationSummary = this.formatConversationSummary();
      
      // Send email silently in background
      const result = await this.emailService.sendQuoteRequest(
        {
          name: this.leadInfo.name,
          email: this.leadInfo.email,
          phone: this.leadInfo.phone,
          message: 'Quote request from GeekQuoteAI',
          service: 'AI Quote Generation'
        },
        conversationSummary
      ).toPromise();

      if (result?.success) {
        // Append success notification to the quote message
        this.appendToLastMessage(`\n\n---\n✉️ This quote has been sent to your email: ${this.leadInfo.email}`);
      } else {
        throw new Error('Email send failed');
      }
    } catch (error) {
      console.error('Error auto-sending quote email:', error);
      // Append failure notification
      this.appendToLastMessage('\n\n---\n❌ Email delivery failed. Please contact us at sales@geekatyourspot.com or save this quote.');
    }
  }

  // Helper to append text to the last assistant message
  private appendToLastMessage(text: string): void {
    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.content += text;
      this.cdr.detectChanges();
    }
  }

  // Format conversation for email
  private formatConversationSummary(): string {
    let summary = '=== GeekQuoteAI Conversation ===\n\n';
    
    summary += `Lead Information:\n`;
    summary += `Name: ${this.leadInfo.name}\n`;
    summary += `Email: ${this.leadInfo.email || 'Not provided'}\n`;
    summary += `Phone: ${this.leadInfo.phone || 'Not provided'}\n\n`;
    
    summary += `Conversation Phase: ${this.currentPhase}\n`;
    summary += `Readiness Score: ${this.readinessScore}%\n`;
    summary += `Estimate Ready: ${this.estimateReady ? 'Yes' : 'No'}\n\n`;
    
    summary += `=== Conversation History ===\n\n`;
    
    this.messages
      .filter(m => m.role !== 'system')
      .forEach((msg, index) => {
        const role = msg.role === 'user' ? 'Customer' : 'AI Assistant';
        summary += `[${role}]:\n${this.stripHtml(msg.content)}\n\n`;
      });
    
    return summary;
  }

  // Strip HTML tags for email
  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  private updateModalTitle(): void {
    const titleMap: Record<ConversationPhase, string> = {
      'gathering': 'Gathering Requirements',
      'confirmation_first': 'Confirming Details',
      'clarifying': 'Clarifying Requirements',
      'confirmation_second': 'Final Confirmation',
      'human_escalation': 'Escalating to Team',
      'complete': 'Quote Complete'
    };
    this.modalTitle.set(titleMap[this.currentPhase] || 'AI Quote Assistant');
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}
