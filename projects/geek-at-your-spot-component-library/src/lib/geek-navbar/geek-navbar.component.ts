import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekSidebarComponent } from '../geek-sidebar/geek-sidebar.component';

@Component({
  selector: 'geek-navbar',
  standalone: true,
  imports: [CommonModule, GeekSidebarComponent],
  templateUrl: './geek-navbar.component.html',
  styleUrl: './geek-navbar.component.scss',
})
export class GeekNavbarComponent {
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
