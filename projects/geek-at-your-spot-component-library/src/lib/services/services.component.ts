import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { ServicesGridComponent, Service } from '../services-grid/services-grid.component';
import { CtaComponent } from '../cta/cta.component';
import { ContactModalComponent, ContactFormData } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'lib-services',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesGridComponent,
    CtaComponent,
    ContactModalComponent
  ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  showContactModal = false;

  services: Service[] = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Website Development',
      description: 'Professional website creation using WordPress, custom HTML/CSS, and modern frameworks. We build responsive sites that work flawlessly across all devices and browsers.',
      keywords: ['WordPress', 'Custom Sites', 'Responsive Design', 'Web Apps']
    },
    {
      icon: 'fas fa-search',
      title: 'Search Engine Marketing',
      description: 'Comprehensive SEO services including technical optimization, content strategy, and local search. Improve your visibility on Google and attract qualified traffic.',
      keywords: ['Technical SEO', 'Local Search', 'Content Strategy', 'Link Building']
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Business Intelligence',
      description: 'Custom analytics dashboards and reporting systems. Transform raw data into actionable insights for better decision-making and strategic planning.',
      keywords: ['Custom Dashboards', 'Reporting', 'Data Visualization', 'KPI Tracking']
    },
    {
      icon: 'fas fa-tachometer-alt',
      title: 'Web Performance',
      description: 'Site speed optimization and performance monitoring. Faster loading times lead to better user experience, higher conversions, and improved search rankings.',
      keywords: ['Speed Optimization', 'Performance Monitoring', 'Core Web Vitals', 'UX']
    },
    {
      icon: 'fas fa-headset',
      title: 'Support Automation',
      description: 'AI-powered chatbots and automated customer service solutions. Provide instant responses to common questions while reducing support workload.',
      keywords: ['AI Chatbots', 'Auto-Response', 'Ticket Automation', 'Live Chat']
    },
    {
      icon: 'fas fa-users',
      title: 'Recruitment Solutions',
      description: 'Automated hiring workflows from job posting to onboarding. Streamline candidate screening, interview scheduling, and new employee setup.',
      keywords: ['ATS Integration', 'Candidate Screening', 'Interview Automation', 'Onboarding']
    },
    {
      icon: 'fas fa-pen-fancy',
      title: 'Digital Content',
      description: 'Professional copywriting for websites, blogs, and marketing materials. SEO-focused content that engages readers and ranks well in search engines.',
      keywords: ['Copywriting', 'Blog Posts', 'Web Content', 'SEO Writing']
    },
    {
      icon: 'fas fa-file-alt',
      title: 'Business Documentation',
      description: 'Create comprehensive SOPs, training manuals, and policy documents. Ensure operational consistency and facilitate employee training.',
      keywords: ['SOPs', 'Training Guides', 'Policy Docs', 'Procedures']
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Online Store Setup',
      description: 'Complete e-commerce solutions using Shopify, WooCommerce, or custom platforms. From product catalogs to payment processing and shipping integration.',
      keywords: ['Shopify Setup', 'WooCommerce', 'Payment Processing', 'Product Catalogs']
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Campaigns',
      description: 'Automated email marketing with drip campaigns and subscriber segmentation. Build relationships with leads and customers through targeted messaging.',
      keywords: ['Drip Campaigns', 'List Segmentation', 'Email Automation', 'Newsletters']
    },
    {
      icon: 'fas fa-share-alt',
      title: 'Social Media',
      description: 'Content creation and scheduling for Facebook, Instagram, LinkedIn, and Twitter. Maintain consistent brand presence across all platforms.',
      keywords: ['Content Calendar', 'Post Scheduling', 'Brand Management', 'Multi-Platform']
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Financial Planning',
      description: 'Budget forecasting, cash flow analysis, and financial modeling. Make informed decisions with accurate projections and scenario planning.',
      keywords: ['Budget Planning', 'Cash Flow', 'Financial Models', 'Forecasting']
    },
    {
      icon: 'fas fa-boxes',
      title: 'Inventory Systems',
      description: 'Real-time inventory tracking with automated reorder points and supplier management. Sync across multiple sales channels seamlessly.',
      keywords: ['Stock Tracking', 'Reorder Automation', 'Multi-Channel Sync', 'Supplier Management']
    },
    {
      icon: 'fas fa-id-card',
      title: 'CRM Solutions',
      description: 'Customer relationship management system setup and customization. Track leads, manage sales pipelines, and nurture customer relationships.',
      keywords: ['Lead Management', 'Sales Pipeline', 'Contact Management', 'CRM Setup']
    },
    {
      icon: 'fas fa-gavel',
      title: 'Contract Management',
      description: 'Automated contract review and legal document organization. Ensure compliance and reduce risk with systematic document handling.',
      keywords: ['Contract Review', 'Compliance', 'Document Storage', 'Legal Workflow']
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Booking Systems',
      description: 'Online appointment scheduling with calendar synchronization and automated reminders. Reduce no-shows and streamline scheduling workflows.',
      keywords: ['Online Booking', 'Calendar Sync', 'SMS Reminders', 'Appointment Management']
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Campaign Management',
      description: 'Multi-channel marketing campaign execution and tracking. Coordinate email, social, and paid advertising for maximum ROI.',
      keywords: ['Multi-Channel', 'Campaign Tracking', 'Lead Nurturing', 'Marketing Ops']
    },
    {
      icon: 'fas fa-comments',
      title: 'Conversational AI',
      description: 'Custom chatbot development for websites and messaging platforms. Natural language processing for intelligent, context-aware conversations.',
      keywords: ['NLP', 'Custom Bots', 'Messenger Integration', 'AI Responses']
    },
    {
      icon: 'fas fa-project-diagram',
      title: 'Process Automation',
      description: 'Zapier and Make integrations to connect your business tools. Eliminate manual data entry and create efficient automated workflows.',
      keywords: ['Zapier', 'Make', 'API Integration', 'Workflow Automation']
    },
    {
      icon: 'fas fa-cloud-upload-alt',
      title: 'Cloud Services',
      description: 'Migration to Google Workspace or Microsoft 365. Cloud storage setup, security configuration, and team collaboration tools.',
      keywords: ['Google Workspace', 'Microsoft 365', 'Cloud Storage', 'Team Collaboration']
    }
  ];

  openContactModal(): void {
    this.showContactModal = true;
  }

  closeContactModal(): void {
    this.showContactModal = false;
  }

  handleContactSubmit(formData: ContactFormData): void {
    console.log('Contact form submitted:', formData);
    alert('Thank you! We will contact you soon.');
    this.closeContactModal();
  }
}
