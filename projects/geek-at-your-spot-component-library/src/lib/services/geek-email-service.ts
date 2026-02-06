import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService, EmailRequest, EmailResponse } from './api.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface ContactFormSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeekEmailService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly apiService = inject(ApiService);

  sendContactForm(data: ContactFormSubmission): Observable<EmailResponse> {
    if (!this.isBrowser) {
      console.error('Email service only available in browser');
      return of({ success: false, message: 'Email service not available' });
    }

    const emailRequest: EmailRequest = {
      to: 'sales@geekatyourspot.com',
      subject: `New Contact Form Submission${data.service ? ': ' + data.service : ''}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message
    };

    return this.apiService.sendEmail(emailRequest).pipe(
      tap(response => {
        if (response.success) {
          console.log('Contact form email sent successfully');
        } else {
          console.error('Contact form email failed:', response.message);
        }
      }),
      catchError(error => {
        console.error('Error sending contact form email:', error);
        return of({
          success: false,
          message: 'Failed to send email. Please try again or email us directly at sales@geekatyourspot.com'
        });
      })
    );
  }

  sendQuoteRequest(data: ContactFormSubmission, conversationSummary?: string): Observable<EmailResponse> {
    if (!this.isBrowser) {
      console.error('Email service only available in browser');
      return of({ success: false, message: 'Email service not available' });
    }

    const emailMessage = conversationSummary
      ? `${data.message}\n\n--- Conversation Summary ---\n${conversationSummary}`
      : data.message;

    const emailRequest: EmailRequest = {
      to: 'geek-quote-ai@geekatyourspot.com',
      subject: `New Quote Request${data.service ? ': ' + data.service : ''}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: emailMessage
    };

    return this.apiService.sendEmail(emailRequest).pipe(
      tap(response => {
        if (response.success) {
          console.log('Quote request email sent successfully');
        } else {
          console.error('Quote request email failed:', response.message);
        }
      }),
      catchError(error => {
        console.error('Error sending quote request email:', error);
        return of({
          success: false,
          message: 'Failed to send quote request. Please try again or email us directly at geek-quote-ai@geekatyourspot.com'
        });
      })
    );
  }
}
