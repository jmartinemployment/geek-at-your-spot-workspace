import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekContactModalComponent } from '../geek-contact-modal/geek-contact-modal.component';

@Component({
  selector: 'geek-home-cta',
  imports: [CommonModule, GeekContactModalComponent],
  templateUrl: './geek-home-cta.component.html',
  styleUrl: './geek-home-cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekHomeCTAComponent {
  @ViewChild(GeekContactModalComponent) contactModal?: GeekContactModalComponent;

  readonly headline = signal('Ready to Transform Your Business?');
  readonly subheadline = signal('Let\'s discuss how AI and smart technology can give you a competitive edge.');
  readonly ctaText = signal('Start the Conversation');

  readonly phone = signal('+1 (561) 526-3512');
  readonly phoneHref = signal('tel:+15615263512');
  readonly email = signal('contact@geekatyourspot.com');
  readonly serviceArea = signal('Serving Southeastern Florida');

  openContactModal(): void {
    this.contactModal?.open();
  }
}
