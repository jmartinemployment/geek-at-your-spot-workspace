import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'geek-navbar',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  // State signals
  isSidebarOpen = signal<boolean>(false);
  logoUrl = signal<string>('https://geekatyourspot.com/wp-content/uploads/2025/10/GeekAtYourSpot.svg');
  logoAlt = signal<string>('Geek @ Your Spot');

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
