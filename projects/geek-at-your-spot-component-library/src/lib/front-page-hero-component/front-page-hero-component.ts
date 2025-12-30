import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekContactModalComponent } from '../geek-contact-modal/geek-contact-modal.component';

@Component({
  selector: 'lib-front-page-hero',
  standalone: true,
  imports: [CommonModule, GeekContactModalComponent],
  templateUrl: './front-page-hero-component.html',
  styleUrls: ['./front-page-hero-component.scss']
})
export class FrontPageHeroComponent {
  @ViewChild(GeekContactModalComponent) contactModal?: GeekContactModalComponent;

  title = signal<string>('Empower Your Small Business with Smart Technology');
  subtitle = signal<string>('Transform your business with intelligent automation, data-driven insights, and cutting-edge technology. From web development to workflow automation, we help small businesses compete like enterprises.');
  imageUrl = signal<string>('https://geekatyourspot.com/wp-content/uploads/2025/10/geek@yourSpot-1.jpeg');

  openContactModal(): void {
    this.contactModal?.open();
  }
}
