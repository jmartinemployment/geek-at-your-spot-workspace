import {Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  // State signals (equivalent to React useState)
  isSidebarOpen = signal<boolean>(false);
  logoUrl = signal<string>('https://geekatyourspot.com/wp-content/uploads/2025/10/GeekAtYourSpot.svg');
  logoAlt = signal<string>('Company Logo');

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  // Example: Method to update logo dynamically
  updateLogo(url: string, alt: string): void {
    this.logoUrl.set(url);
    this.logoAlt.set(alt);
  }
}
