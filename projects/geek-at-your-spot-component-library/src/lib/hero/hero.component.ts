import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() backgroundColor: string = '#0A0B26'; // Default dark color
  @Input() textColor: string = 'white';
  @Input() backgroundImage?: string;
  @Input() alignment: 'left' | 'center' | 'right' = 'center';
  @Input() minHeight: string = '400px';
}
