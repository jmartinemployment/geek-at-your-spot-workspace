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
export class SidebarComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Input signals
  isOpen = input<boolean>(false);

  // Output signals
  close = output<void>();

  // Menu items with real URLs
  menuItems = signal<MenuItem[]>([
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Services', href: '/services/' }
  ]);

  constructor() {
    // Effect to manage body scroll
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
    if (this.isBrowser) {
      document.body.style.overflow = 'unset';
    }
  }
}
