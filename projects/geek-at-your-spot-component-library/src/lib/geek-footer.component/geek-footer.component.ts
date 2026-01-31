import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'lib-geek-footer.component',
  imports: [],
  templateUrl: './geek-footer.component.html',
  styleUrl: './geek-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekFooterComponent {
  readonly logoUrl = signal('https://geekatyourspot.com/wp-content/uploads/2025/10/GeekAtYourSpot.svg');
  readonly logoAlt = signal('Geek At Your Spot - Technology Solutions for Small Business');
  readonly phone = signal('+1 (561) 526-3512');
  readonly phoneHref = signal('tel:+15615263512');
  readonly email = signal('contact@geekatyourspot.com');
  readonly serviceArea = signal('Serving Southeastern, Florida');
  readonly currentYear = signal(new Date().getFullYear());
}
