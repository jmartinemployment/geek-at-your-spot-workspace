import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HighlightService {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'geek-services-highlight',
  imports: [CommonModule],
  templateUrl: './geek-services-highlight.component.html',
  styleUrl: './geek-services-highlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekServicesHighlightComponent {
  readonly sectionTitle = signal('What We Do Best');
  readonly sectionSubtitle = signal('Focused expertise in four key areas that drive small business growth');

  readonly services = signal<HighlightService[]>([
    {
      icon: 'fa-solid fa-robot',
      title: 'AI Integration',
      description: 'Integrate Claude, ChatGPT, and custom AI models into your workflows. Automate customer service, content generation, and data analysis.',
      color: '#E91E63'
    },
    {
      icon: 'fa-solid fa-cog',
      title: 'Custom Development',
      description: 'Bespoke software solutions tailored to your unique business needs. Full-stack development from requirements to deployment.',
      color: '#7E5EF2'
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'SEO & Analytics',
      description: 'Data-driven SEO strategies and custom analytics dashboards. Transform raw data into actionable insights for better decisions.',
      color: '#4CAF50'
    },
    {
      icon: 'fa-solid fa-code',
      title: 'Web Applications',
      description: 'Professional websites and web apps using Angular, React, and WordPress. Responsive designs that work flawlessly across all devices.',
      color: '#2196F3'
    }
  ]);

  readonly servicesPageUrl = signal('/services');
  readonly ctaText = signal('View All Services');
}
