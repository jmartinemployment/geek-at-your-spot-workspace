import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

@Component({
  selector: 'lib-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() title: string = 'Get In Touch';
  @Input() services: string[] = [
    'Website Development',
    'SEO & Marketing',
    'Business Analytics',
    'Automation',
    'Other'
  ];
  
  @Output() closed = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<ContactFormData>();

  formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && changes['show'].currentValue) {
      // Reset form when modal opens
      this.resetForm();
    }
  }

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.isFormValid()) {
      this.formSubmitted.emit({ ...this.formData });
      this.resetForm();
    }
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name.trim() &&
      this.formData.email.trim() &&
      this.formData.message.trim()
    );
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    };
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
