import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
/*import { GeekScrollAnimationDirective } from '../directives/scroll-animation.directive';*/

interface TrustStat {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'geek-trust-bar',
  imports: [CommonModule],
    /*GeekScrollAnimationDirective*/
  templateUrl: './geek-trust-bar.component.html',
  styleUrl: './geek-trust-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekTrustBarComponent {
  readonly stats = signal<TrustStat[]>([
    {
      value: '30+',
      label: 'Years Experience',
      icon: 'fa-solid fa-calendar-check'
    },
    {
      value: '500+',
      label: 'Projects Delivered',
      icon: 'fa-solid fa-rocket'
    },
    {
      value: 'Fortune 500',
      label: 'to Main Street',
      icon: 'fa-solid fa-building'
    },
    {
      value: '100%',
      label: 'Client Focused',
      icon: 'fa-solid fa-handshake'
    }
  ]);
}
