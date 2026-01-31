import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekContactModalComponent } from '../geek-contact-modal/geek-contact-modal.component';
/*import { GeekScrollAnimationDirective } from '../directives/scroll-animation.directive';*/

@Component({
  selector: 'geek-home-hero',
  imports: [CommonModule, GeekContactModalComponent],
    /*GeekScrollAnimationDirective*/

  templateUrl: './geek-home-hero.component.html',
  styleUrl: './geek-home-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekHomeHeroComponent {
  @ViewChild(GeekContactModalComponent) contactModal?: GeekContactModalComponent;

  readonly headline = signal('Your competitors are using AI.');
  readonly headlineAccent = signal('Are you?');
  readonly subtext = signal('While you\'re still doing things the old way, your competitors are automating workflows, generating leads 24/7, and making data-driven decisions. Small businesses that embrace AI now will dominate their markets. Those that don\'t will struggle to keep up.');
  readonly ctaText = signal('Get Your Free AI Assessment');
  readonly imageUrl = signal('https://geekatyourspot.com/wp-content/uploads/2025/10/geek@yourSpot-1.jpeg');
  readonly imageAlt = signal('AI-powered business transformation - Geek At Your Spot helps small businesses compete with intelligent automation');

  openContactModal(): void {
    this.contactModal?.open();
  }
}
