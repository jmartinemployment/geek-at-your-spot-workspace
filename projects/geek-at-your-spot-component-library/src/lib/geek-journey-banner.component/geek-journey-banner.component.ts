import { Component } from '@angular/core';

@Component({
  selector: 'lib-geek-journey-banner.component',
  imports: [],
  templateUrl: './geek-journey-banner.component.html',
  styleUrl: './geek-journey-banner.component.css',
})
export class GeekJourneyBannerComponent {



  // Feature highlights for "How We're Different" section
  differentiators = [
    {
      icon: 'bi-gear-fill',
      title: 'Custom Solutions',
      description: 'Tailored systems designed for your goals, team, and budget—not one-size-fits-all packages.'
    },
    {
      icon: 'bi-robot',
      title: 'AI-Powered Automation',
      description: 'Intelligent workflows that save hours every week and generate actionable insights.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade security that protects your data, reputation, and customer trust.'
    },
    {
      icon: 'bi-diagram-3-fill',
      title: 'Integrated Technology',
      description: 'Systems that work together seamlessly—eliminating friction and maximizing efficiency.'
    }
  ];

  // Core capabilities
  capabilities = [
    {
      phase: 'Discovery & Strategy',
      description: 'Understanding your business before touching code'
    },
    {
      phase: 'Custom Development',
      description: 'Tailored solutions, not templates'
    },
    {
      phase: 'Integration & Automation',
      description: 'Connecting systems and eliminating manual work'
    },
    {
      phase: 'Training & Support',
      description: 'Empowering your team to own the technology'
    },
    {
      phase: 'Continuous Improvement',
      description: 'Ongoing optimization for long-term success'
    }
  ];

  /**
   * Scroll to contact section or open contact modal
   */
  scrollToContact(): void {
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      const event = new CustomEvent('open-contact-modal');
      window.dispatchEvent(event);
    }
  }

  /**
   * Open quote AI modal
   */
  openQuote(): void {
    const event = new CustomEvent('open-quote-modal');
    window.dispatchEvent(event);
  }
}
