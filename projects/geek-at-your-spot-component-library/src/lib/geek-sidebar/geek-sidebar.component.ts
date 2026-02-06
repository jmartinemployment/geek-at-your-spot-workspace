import { Component, input, output, effect, HostListener, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface MenuItem {
  name: string;
  href?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'geek-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geek-sidebar.component.html',
  styleUrl: './geek-sidebar.component.scss',
})
export class GeekSidebarComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isOpen = input<boolean>(false);
  close = output<void>();

  menuItems = signal<MenuItem[]>([
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Services', href: '/services/' },
    {
      name: 'Demo',
      children: [
        { name: 'Taipa Demo', href: '/taipa-demo/' },
        { name: 'ACORD PCS Demo', href: '/acord-pcs-demo/' }
      ]
    }
  ]);

  expandedItems = signal<Set<string>>(new Set());

  toggleExpand(itemName: string): void {
    const current = this.expandedItems();
    const updated = new Set(current);
    if (updated.has(itemName)) {
      updated.delete(itemName);
    } else {
      updated.add(itemName);
    }
    this.expandedItems.set(updated);
  }

  isExpanded(itemName: string): boolean {
    return this.expandedItems().has(itemName);
  }

  constructor() {
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
