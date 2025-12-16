import { Component, signal } from '@angular/core';

@Component({
  selector: 'lib-front-page-hero-component',
  standalone: true,
  imports: [],
  templateUrl: './front-page-hero-component.html',
  styleUrl: './front-page-hero-component.scss',
})
export class FrontPageHeroComponent {
  // Content signals
  title = signal<string>('Empower Your Small Business with Smart Technology');
  subtitle = signal<string>('Build a strong online presence, automate routine tasks, and grow confidently with AI-driven web solutions.');
  imageUrl = signal<string>('https://geekatyourspot.com/wp-content/uploads/2025/10/geek@yourSpot-1.jpeg');

  // Methods to update content dynamically
  updateTitle(newTitle: string): void {
    this.title.set(newTitle);
  }

  updateSubtitle(newSubtitle: string): void {
    this.subtitle.set(newSubtitle);
  }

  updateImage(newImageUrl: string): void {
    this.imageUrl.set(newImageUrl);
  }
}
