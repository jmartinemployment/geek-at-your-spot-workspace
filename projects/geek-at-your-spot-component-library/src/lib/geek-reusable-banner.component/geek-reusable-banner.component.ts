import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type BannerVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'dark';
type BannerSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'lib-geek-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geek-reusable-banner.component.html',
  styleUrls: ['./geek-reusable-banner.component.css']
})
export class GeekReusableBannerComponent {
  // Signal inputs (Angular 21)
  heading = input<string>('');
  subheading = input<string>('');
  icon = input<string>(''); // Bootstrap icon class
  variant = input<BannerVariant>('primary');
  size = input<BannerSize>('md');
  showCta = input<boolean>(false);
  ctaText = input<string>('Get Started');
  ctaVariant = input<'solid' | 'outline'>('solid');
  dismissible = input<boolean>(false);
  fullWidth = input<boolean>(true);

  // Signal outputs (Angular 21)
  ctaClick = output<void>();
  dismissed = output<void>();

  // Internal state
  isVisible = signal(true);

  // Computed signals
  bannerClasses = computed(() => {
    return [
      'geek-banner',
      `banner-${this.variant()}`,
      `banner-${this.size()}`,
      this.fullWidth() ? 'banner-full-width' : ''
    ].filter(Boolean).join(' ');
  });

  ctaClasses = computed(() => {
    return [
      'btn',
      this.ctaVariant() === 'solid' ? 'btn-cta-solid' : 'btn-cta-outline'
    ].join(' ');
  });

  // Methods
  handleCtaClick(): void {
    this.ctaClick.emit();
  }

  dismiss(): void {
    this.isVisible.set(false);
    this.dismissed.emit();
  }
}
