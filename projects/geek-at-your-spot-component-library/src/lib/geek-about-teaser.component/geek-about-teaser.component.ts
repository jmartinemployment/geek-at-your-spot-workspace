import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
/*import { GeekScrollAnimationDirective } from '../directives/scroll-animation.directive';*/

@Component({
  selector: 'geek-about-teaser',
  imports: [CommonModule, GeekScrollAnimationDirective],
  templateUrl: './geek-about-teaser.component.html',
  styleUrl: './geek-about-teaser.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekAboutTeaserComponent {
  readonly tagline = signal('From Timex Sinclair to Claude AI');
  readonly headline = signal('Coding Through Every Revolution');
  readonly description = signal('Three decades of staying ahead of technology curves. From the earliest home computers to today\'s AI revolution, I\'ve been building solutions that help businesses thrive. Now I bring that experience to small businesses ready to compete with the big players.');
  readonly imageUrl = signal('https://geekatyourspot.com/wp-content/uploads/2025/12/action-figure.jpeg');
  readonly imageAlt = signal('Geek At Your Spot founder - 30+ years of technology experience helping small businesses with AI, web development, and digital marketing');
  readonly aboutPageUrl = signal('/about');
  readonly ctaText = signal('Learn My Story');
}
