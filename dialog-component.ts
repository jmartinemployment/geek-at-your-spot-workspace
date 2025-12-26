import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogService } from './projects/geek-at-your-spot-component-library/src/lib/services/dialog.service';
import { Message } from './projects/geek-at-your-spot-component-library/src/lib/services/geek-quote-ai.service';

@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <dialog #dialog class="modal fade">
      <div class="dialog-header">
        <span><h3>{{ dialogService.title() }}</h3>
        <button
          *ngIf="dialogService.showCloseButton()"
          class="btn-close"
          (click)="dialogService.close()"
          aria-label="Close dialog">
        </button></span>
      </div>

      <div #dialogContent class="dialog-content">
        <div class="message-container">
          <div *ngFor="let message of displayMessages; let i = index"
               class="message"
               [class.user-message]="message.role === 'user'"
               [class.assistant-message]="message.role === 'assistant'">
            <div class="message-role">{{ message.role === 'user' ? 'You' : 'AI Assistant' }}</div>
            <div class="message-content" [innerHTML]="getSafeHtml(message.content)"></div>
            <div class="message-time" *ngIf="message.timestamp">
              {{ message.timestamp | date:'short' }}
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-footer">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Type your message..."
            [(ngModel)]="inputText"
            (keyup.enter)="sendMessage()"
            [disabled]="isSending">
          <button
            class="btn btn-primary"
            (click)="sendMessage()"
            [disabled]="!inputText.trim() || isSending">
            {{ isSending ? 'Sending...' : 'Send' }}
          </button>
        </div>
      </div>
    </dialog>
  `,
  styleUrls: ['./dialog-component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogContent') dialogContent!: ElementRef<HTMLDivElement>;
  @Input() messages: Message[] = [];
  @Input() isSending = false;
  @Output() messageSent = new EventEmitter<string>();

  inputText = '';
  private intervalId?: number;

  constructor(
    public dialogService: DialogService,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
    this.intervalId = window.setInterval(() => {
      const isOpen = this.dialogService.isOpen();
      const dialogIsOpen = this.dialog?.nativeElement?.open || false;

      if (isOpen && !dialogIsOpen) {
        this.dialog.nativeElement.showModal();
        this.scrollToBottom();
      } else if (!isOpen && dialogIsOpen) {
        this.dialog.nativeElement.close();
      }
    }, 50);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get displayMessages(): Message[] {
    return this.messages.filter(m => m.role !== 'system');
  }

  getSafeHtml(content: string): SafeHtml {
    // Trust HTML from our backend since we control it
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  sendMessage(): void {
    if (this.inputText.trim() && !this.isSending) {
      this.messageSent.emit(this.inputText.trim());
      this.inputText = '';
    }
  }

  private scrollToBottom(): void {
    if (this.dialogContent?.nativeElement) {
      this.dialogContent.nativeElement.scrollTop = this.dialogContent.nativeElement.scrollHeight;
    }
  }
}
