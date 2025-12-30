import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Message } from '../services/geek-quote-ai.service';

@Component({
  selector: 'geek-quote-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './geek-quote-modal.component.html',
  styleUrls: ['./geek-quote-modal.component.css']
})
export class GeekQuoteModalComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('modalBody') modalBody!: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  
  @Input() isOpen = signal<boolean>(false);
  @Input() title = signal<string>('AI Assistant');
  @Input() showCloseButton = signal<boolean>(true);
  @Input() messages: Message[] = [];
  @Input() isSending: boolean = false;
  
  @Output() closed = new EventEmitter<void>();
  @Output() messageSent = new EventEmitter<string>();
  
  inputText = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    if (this.isOpen()) {
      setTimeout(() => {
        this.scrollToBottom();
        this.messageInput?.nativeElement?.focus();
      }, 100);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      // Scroll after messages change
      setTimeout(() => {
        this.scrollToBottom();
        this.messageInput?.nativeElement?.focus();
      }, 0);
    }
    
    if (changes['isOpen'] && this.isOpen()) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        this.scrollToBottom();
        this.messageInput?.nativeElement?.focus();
      }, 100);
    } else if (changes['isOpen'] && !this.isOpen()) {
      document.body.style.overflow = 'unset';
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'unset';
  }

  get displayMessages(): Message[] {
    return this.messages.filter(m => m.role !== 'system');
  }

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  close(): void {
    this.closed.emit();
  }

  sendMessage(): void {
    if (this.inputText.trim() && !this.isSending) {
      this.messageSent.emit(this.inputText.trim());
      this.inputText = '';
    }
  }

  private scrollToBottom(): void {
    if (this.modalBody?.nativeElement) {
      // Force scroll to bottom
      const element = this.modalBody.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
