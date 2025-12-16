import { Component, input, output, effect, HostListener, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface MenuItem {
  name: string;
  href: string;
}

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Input signals (equivalent to React props)
  isOpen = input<boolean>(false);

  // Output signals (equivalent to React event handlers)
  close = output<void>();

  // Internal state signal (equivalent to React useState)
  menuItems = signal<MenuItem[]>([
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'Services', href: '#services' }
  ]);

  constructor() {
    // Effect to manage body scroll (equivalent to React useEffect)
    effect(() => {
      if (!this.isBrowser) return;

      const open = this.isOpen();
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen()) {
      this.handleClose();
    }
  }

  handleClose(): void {
    this.close.emit();
  }

  ngOnDestroy() {
    // Cleanup on component destroy
    if (this.isBrowser) {
      document.body.style.overflow = 'unset';
    }
  }
}
