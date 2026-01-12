import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-geek-banner.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geek-banner.component.html',
  styleUrl: './geek-banner.component.css',
})
export class GeekBannerComponent {
  title = signal<string>('');
  subtitle = signal<string>('');
  subtitle2 = signal<string>('');
  imageUrl = signal<string>('');
}
