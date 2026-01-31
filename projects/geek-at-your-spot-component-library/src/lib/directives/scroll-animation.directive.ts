import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  input,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ScrollAnimationType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'rotate-in';

@Directive({
  selector: '[geekScrollAnimation]',
})
export class GeekScrollAnimationDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  readonly geekScrollAnimation = input<ScrollAnimationType>('fade');
  readonly geekAnimationDelay = input<number>(0);
  readonly geekAnimationThreshold = input<number>(0.1);
  readonly geekAnimationRepeat = input<boolean>(true);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = this.elementRef.nativeElement as HTMLElement;

    element.classList.add('scroll-animate');

    const animationType = this.geekScrollAnimation();
    if (animationType !== 'fade') {
      element.classList.add(animationType);
    }

    const delay = this.geekAnimationDelay();
    if (delay > 0) {
      element.style.transitionDelay = `${delay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
          } else if (this.geekAnimationRepeat()) {
            // Remove class when out of view to re-trigger on next scroll
            element.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: this.geekAnimationThreshold(),
        rootMargin: '0px 0px -50px 0px',
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
