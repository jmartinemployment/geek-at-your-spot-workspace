import { Injectable, signal } from '@angular/core';

export interface DialogConfig {
  title?: string;
  content?: string;
  showCloseButton?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // Signals for dialog state
  isOpen = signal(false);
  title = signal('');
  content = signal('');
  showCloseButton = signal(true);

  open(config: DialogConfig = {}) {
    this.title.set(config.title || '');
    this.content.set(config.content || '');
    this.showCloseButton.set(config.showCloseButton !== false);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }
}
