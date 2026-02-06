import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekContactModalComponent } from '../geek-contact-modal/geek-contact-modal.component';

@Component({
  selector: 'geek-about-hero',
  standalone: true,
  imports: [CommonModule, GeekContactModalComponent],
  templateUrl: './geek-about-hero.component.html',
  styleUrl: './geek-about-hero.component.scss',
})
export class GeekAboutHeroComponent {
  @ViewChild(GeekContactModalComponent) contactModal?: GeekContactModalComponent;

  title = signal<string>('Enterprise Expertise. Small Business Focus.');
  subtitle = signal<string>('Enterprise-level technology expertise, distilled 30 years to serve you.');
  imageUrl = signal<string>('https://geekatyourspot.com/wp-content/uploads/2025/12/action-figure.jpeg');

  openContactModal(): void {
    this.contactModal?.open();
  }
}
