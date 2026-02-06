import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { GeekEmailService, ContactFormSubmission } from '../services/geek-email-service';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

@Component({
  selector: 'geek-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './geek-contact-modal.component.html',
  styleUrl: './geek-contact-modal.component.scss'
})
export class GeekContactModalComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly emailService = inject(GeekEmailService);

  isOpen = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  formData = signal<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  services = [
    'Website Development',
    'SEO & Marketing',
    'Business Analytics',
    'AI Integration',
    'Process Automation',
    'Other'
  ];

  open(): void {
    this.isOpen.set(true);
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  close(): void {
    this.isOpen.set(false);
    if (this.isBrowser) {
      document.body.style.overflow = 'unset';
    }
    this.resetForm();
  }

  async submit(): Promise<void> {
    if (!this.isFormValid() || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    const data = this.formData();

    const submission: ContactFormSubmission = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message
    };

    try {
      const response = await firstValueFrom(this.emailService.sendContactForm(submission));

      if (response?.success) {
        alert('Thank you for contacting us! We\'ll get back to you soon.');
        this.close();
      } else {
        alert(response?.message || 'Sorry, there was an error sending your message. Please try again or email us directly at sales@geekatyourspot.com');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Sorry, there was an error sending your message. Please try again or email us directly at sales@geekatyourspot.com');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  isFormValid(): boolean {
    const data = this.formData();
    return !!(
      data.name.trim() &&
      data.email.trim() &&
      data.message.trim()
    );
  }

  updateField(field: keyof ContactFormData, value: string): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  private resetForm(): void {
    this.formData.set({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
