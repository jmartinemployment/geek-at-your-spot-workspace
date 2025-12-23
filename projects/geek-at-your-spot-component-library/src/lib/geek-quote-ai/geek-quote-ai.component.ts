import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeekQuoteAiService, LeadInfo, Message } from '../services/geek-quote-ai.service';
import { DialogService } from '../services/dialog.service';
import { DialogComponent } from '../dialog/dialog-component';
import { ConversationPhase } from '../services/api.service';

@Component({
  selector: 'lib-geek-quote-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogComponent],
  templateUrl: './geek-quote-ai.component.html',
  styleUrls: ['./geek-quote-ai.component.css']
})
export class GeekQuoteAiComponent implements OnInit {
  userInput: string = '';
  messages: Message[] = [];
  conversationId: string | null = null;
  isLoading = false;

  // New properties for Path B
  currentPhase: ConversationPhase = 'gathering';
  readinessScore: number = 0;
  estimateReady: boolean = false;
  escalationReason: string = '';

  leadInfo: LeadInfo = {
    name: 'Prospective Client',
    email: '',
    phone: '',
    company: ''
  };

  constructor(
    private geekQuoteService: GeekQuoteAiService,
    public dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  async sendMessage(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.userInput.trim() || this.isLoading) {
      return;
    }

    const userMessage = this.userInput.trim();
    this.userInput = '';

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

    try {
      const response = await this.geekQuoteService.sendMessage(
        this.messages,
        this.leadInfo
      );

      this.messages.push({
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      });

      // Update Path B state
      this.currentPhase = response.phase || 'gathering';
      this.readinessScore = response.readinessScore || 0;
      this.estimateReady = response.estimateReady || false;
      this.escalationReason = response.escalationReason || '';

      this.isLoading = false;
      this.cdr.detectChanges();

      // Open dialog if not already open
      if (!this.dialogService.isOpen()) {
        setTimeout(() => {
          this.dialogService.open({
            title: this.getDialogTitle(),
            content: response.response
          });
        }, 0);
      }

    } catch (error) {
      console.error('Chat Error:', error);
      this.messages.push({
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date()
      });
      this.isLoading = false;
    }
  }

  private getDialogTitle(): string {
    switch (this.currentPhase) {
      case 'gathering':
        return `Requirements Gathering (${this.readinessScore}%)`;
      case 'confirmation_first':
      case 'confirmation_second':
        return 'Please Confirm';
      case 'complete':
        return '✅ Estimate Ready';
      case 'human_escalation':
        return 'Human Review Needed';
      default:
        return 'AI Assistant';
    }
  }

  isThinking(): boolean {
    return this.isLoading;
  }

  getPhaseDisplay(): string {
    switch (this.currentPhase) {
      case 'gathering': return 'Gathering Requirements';
      case 'confirmation_first': return 'Confirming Details';
      case 'clarifying': return 'Clarifying Requirements';
      case 'confirmation_second': return 'Final Confirmation';
      case 'human_escalation': return 'Connecting You with Team';
      case 'complete': return 'Ready for Estimate';
      default: return 'In Progress';
    }
  }
}
