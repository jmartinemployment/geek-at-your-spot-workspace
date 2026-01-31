import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekQuoteAiComponent } from '../geek-quote-ai/geek-quote-ai.component';
/*import { GeekScrollAnimationDirective } from '../directives/scroll-animation.directive';*/

@Component({
  selector: 'geek-quote-section',
  imports: [CommonModule, GeekQuoteAiComponent],
    /*GeekScrollAnimationDirective*/
  templateUrl: './geek-quote-section.component.html',
  styleUrl: './geek-quote-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekQuoteSectionComponent {
  readonly headline = signal('Get an Instant Project Estimate');
  readonly subheadline = signal('Our AI analyzes your needs and delivers accurate quotes in seconds - not days.');
}
