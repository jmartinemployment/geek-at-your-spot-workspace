import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Service {
  icon: string;
  title: string;
  description: string;
  keywords: string[];
}

@Component({
  selector: 'lib-services-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.css']
})
export class ServicesGridComponent {
  @Input() services: Service[] = [];
  @Input() title: string = 'Our Services';
  @Input() subtitle: string = '';
  @Input() backgroundColor: string = '#f8f9fa';
  @Input() cardBorderColor: string = '#7E5EF2';
}
