import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogService } from '../services/dialog.service';
import { Message } from '../services/geek-quote-ai.service';

@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <dialog #dialog class="custom-dialog">
      <!-- Bootstrap Modal Dialog Structure -->
      <div class="modal-dialog modal-fullscreen-xl-down modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header bg-gradient text-white">
            <h3 class="modal-title">{{ dialogService.title() }}</h3>
            <button 
              *ngIf="dialogService.showCloseButton()"
              type="button" 
              class="btn-close" 
              (click)="dialogService.close()"
              aria-label="Close">
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="modal-body" #dialogBody>
            <div class="message-container">
              <div *ngFor="let message of displayMessages" 
                   class="mb-3"
                   [class.text-end]="message.role === 'user'">
                
                <!-- User Message -->
                <div *ngIf="message.role === 'user'" class="d-inline-block user-message-width">
                  <div class="badge bg-primary mb-1">You</div>
                  <div class="card bg-primary text-white">
                    <div class="card-body p-3">
                      <div [innerHTML]="getSafeHtml(message.content)"></div>
                      <small class="opacity-75 d-block mt-2" *ngIf="message.timestamp">
                        {{ message.timestamp | date:'short' }}
                      </small>
                    </div>
                  </div>
                </div>
                
                <!-- Assistant Message -->
                <div *ngIf="message.role === 'assistant'" class="d-inline-block assistant-message-width">
                  <div class="badge bg-secondary mb-1">AI Assistant</div>
                  <div class="card">
                    <div class="card-body p-3">
                      <div [innerHTML]="getSafeHtml(message.content)"></div>
                      <small class="text-muted d-block mt-2" *ngIf="message.timestamp">
                        {{ message.timestamp | date:'short' }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Loading indicator in dialog -->
              <div *ngIf="isSending" class="text-center my-3">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Thinking...</p>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="modal-footer">
            <div class="input-group w-100">
              <input 
                #messageInput
                type="text" 
                class="form-control" 
                placeholder="Type your message..."
                [(ngModel)]="inputText"
                (keyup.enter)="sendMessage()"
                [disabled]="isSending">
              <button 
                class="btn btn-primary" 
                type="button"
                (click)="sendMessage()"
                [disabled]="!inputText.trim() || isSending">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  `,
  styleUrls: ['./dialog-component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogBody') dialogBody!: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @Input() messages: Message[] = [];
  @Input() isSending: boolean = false;
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
        // Focus the input when dialog opens
        setTimeout(() => {
          this.messageInput?.nativeElement?.focus();
        }, 100);
      } else if (!isOpen && dialogIsOpen) {
        this.dialog.nativeElement.close();
      }
    }, 50);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      setTimeout(() => {
        this.scrollToBottom();
        // Refocus input after new message
        this.messageInput?.nativeElement?.focus();
      }, 100);
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
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  sendMessage(): void {
    if (this.inputText.trim() && !this.isSending) {
      this.messageSent.emit(this.inputText.trim());
      this.inputText = '';
    }
  }

  private scrollToBottom(): void {
    if (this.dialogBody?.nativeElement) {
      this.dialogBody.nativeElement.scrollTop = this.dialogBody.nativeElement.scrollHeight;
    }
  }
}
