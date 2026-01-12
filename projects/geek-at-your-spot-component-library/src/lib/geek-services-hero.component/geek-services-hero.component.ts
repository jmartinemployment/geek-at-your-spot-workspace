import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekContactModalComponent } from '../geek-contact-modal/geek-contact-modal.component';

@Component({
  selector: 'lib-geek-services-hero.component',
  standalone: true,
  imports: [CommonModule, GeekContactModalComponent],
  templateUrl: './geek-services-hero.component.html',
  styleUrl: './geek-services-hero.component.css',
})
export class GeekServicesHeroComponent {
  @ViewChild(GeekContactModalComponent) contactModal?: GeekContactModalComponent;

  title = signal<string>('Enterprise Expertise. Small Business Focus.');
  subtitle = signal<string>('Enterprise-level technology expertise, distilled 30 years to serve you.');
  imageUrl = signal<string>('https://geekatyourspot.com/wp-content/uploads/2026/01/services.jpg');

  openContactModal(): void {
    this.contactModal?.open();
  }
}
