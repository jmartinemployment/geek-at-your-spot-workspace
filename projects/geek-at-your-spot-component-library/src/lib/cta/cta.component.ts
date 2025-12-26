import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css']
})
export class CtaComponent {
  @Input() heading: string = '';
  @Input() description: string = '';
  @Input() buttonText: string = 'Get Started';
  @Input() backgroundColor: string = '#3060BF';
  @Input() textColor: string = 'white';
  @Input() buttonColor: string = 'white';
  @Input() buttonTextColor: string = '#3060BF';
  
  @Output() ctaClicked = new EventEmitter<void>();

  handleClick(): void {
    this.ctaClicked.emit();
  }
}
