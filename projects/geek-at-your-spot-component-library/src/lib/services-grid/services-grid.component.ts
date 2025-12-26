import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Service {
  icon: string;
  title: string;
  description: string;
  keywords: string[];
  headerColor?: string;
}

@Component({
  selector: 'lib-services-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.css']
})
export class ServicesGridComponent {
  @Input() title: string = 'Our Services';
  @Input() subtitle: string = 'Comprehensive technology solutions designed for small business success';
  @Input() backgroundColor: string = '#f8f9fa';
  
  // Accept services as input OR use default 20 services
  private _services: Service[] = [
    // Row 1
    {
      icon: 'fa-solid fa-code',
      title: 'Website Development',
      description: 'Professional website creation using WordPress, custom HTML/CSS, and modern frameworks. Responsive sites that work flawlessly across all devices.',
      keywords: ['WordPress', 'Custom Sites', 'Responsive Design', 'Web Apps'],
      headerColor: '#7E5EF2'
    },
    {
      icon: 'fa-solid fa-search',
      title: 'Search Engine Marketing',
      description: 'Comprehensive SEO services including technical optimization, content strategy, and local search. Improve visibility and attract qualified traffic.',
      keywords: ['Technical SEO', 'Local Search', 'Content Strategy', 'Link Building'],
      headerColor: '#4CAF50'
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Business Intelligence',
      description: 'Custom analytics dashboards and reporting systems. Transform raw data into actionable insights for better decision-making and strategic planning.',
      keywords: ['Custom Dashboards', 'Reporting', 'Data Visualization', 'KPI Tracking'],
      headerColor: '#FF9800'
    },
    {
      icon: 'fa-solid fa-robot',
      title: 'AI Integration',
      description: 'Integrate Claude, ChatGPT, and custom AI models into your workflows. Automate customer service, content generation, and data analysis.',
      keywords: ['Claude API', 'ChatGPT', 'Custom Models', 'Automation'],
      headerColor: '#E91E63'
    },
    
    // Row 2
    {
      icon: 'fa-solid fa-pen-fancy',
      title: 'Content Marketing',
      description: 'Strategic content creation including blog posts, case studies, whitepapers, and social media. Drive engagement and establish thought leadership.',
      keywords: ['Blog Writing', 'Social Media', 'Case Studies', 'SEO Content'],
      headerColor: '#00BCD4'
    },
    {
      icon: 'fa-solid fa-envelope-open-text',
      title: 'Email Marketing',
      description: 'Automated email campaigns, segmentation, and personalization. Nurture leads and retain customers with targeted messaging.',
      keywords: ['Campaign Automation', 'Segmentation', 'Newsletters', 'Drip Campaigns'],
      headerColor: '#9C27B0'
    },
    {
      icon: 'fa-solid fa-bullseye',
      title: 'PPC Advertising',
      description: 'Google Ads and social media advertising management. Optimize campaigns for maximum ROI and conversion rates.',
      keywords: ['Google Ads', 'Facebook Ads', 'Retargeting', 'Campaign Optimization'],
      headerColor: '#F44336'
    },
    {
      icon: 'fa-solid fa-plug',
      title: 'API Integration',
      description: 'Connect your systems with third-party services. Zapier, Make.com, custom APIs, and webhook configurations for seamless data flow.',
      keywords: ['Zapier', 'Make', 'API Integration', 'Workflow Automation'],
      headerColor: '#3F51B5'
    },
    
    // Row 3
    {
      icon: 'fa-solid fa-database',
      title: 'Database Management',
      description: 'Design, optimize, and maintain SQL and NoSQL databases. Ensure data integrity, security, and performance for your applications.',
      keywords: ['MySQL', 'PostgreSQL', 'MongoDB', 'Optimization'],
      headerColor: '#607D8B'
    },
    {
      icon: 'fa-solid fa-cloud',
      title: 'Cloud Solutions',
      description: 'AWS, Google Cloud, and Azure deployment and management. Scalable infrastructure, backup solutions, and disaster recovery.',
      keywords: ['AWS', 'Google Cloud', 'Azure', 'DevOps'],
      headerColor: '#2196F3'
    },
    {
      icon: 'fa-solid fa-mobile-screen-button',
      title: 'Mobile Optimization',
      description: 'Ensure your digital presence works perfectly on smartphones and tablets. Progressive web apps and mobile-first design.',
      keywords: ['Responsive Design', 'PWA', 'Mobile Testing', 'App Development'],
      headerColor: '#009688'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Cybersecurity',
      description: 'Protect your business with SSL certificates, security audits, firewall configuration, and vulnerability assessments.',
      keywords: ['SSL Certificates', 'Security Audits', 'Firewalls', 'Compliance'],
      headerColor: '#795548'
    },
    
    // Row 4
    {
      icon: 'fa-solid fa-gears',
      title: 'Process Automation',
      description: 'Streamline repetitive tasks with custom automation. Reduce manual data entry and eliminate human error from critical workflows.',
      keywords: ['Workflow Automation', 'Data Processing', 'Task Scheduling', 'Integration'],
      headerColor: '#FF5722'
    },
    {
      icon: 'fa-solid fa-users',
      title: 'CRM Implementation',
      description: 'Set up and customize HubSpot, Salesforce, or Zoho CRM. Track leads, manage customer relationships, and improve sales processes.',
      keywords: ['HubSpot', 'Salesforce', 'Zoho', 'Sales Automation'],
      headerColor: '#8BC34A'
    },
    {
      icon: 'fa-solid fa-cart-shopping',
      title: 'E-Commerce Solutions',
      description: 'Build online stores with WooCommerce, Shopify, or custom platforms. Payment processing, inventory management, and shipping integration.',
      keywords: ['WooCommerce', 'Shopify', 'Payment Gateways', 'Inventory'],
      headerColor: '#CDDC39'
    },
    {
      icon: 'fa-solid fa-graduation-cap',
      title: 'Training & Support',
      description: 'Comprehensive training for your team on new tools and systems. Ongoing technical support and documentation.',
      keywords: ['Staff Training', 'Documentation', 'Technical Support', 'Knowledge Base'],
      headerColor: '#FFC107'
    },
    
    // Row 5
    {
      icon: 'fa-solid fa-comments',
      title: 'Live Chat Integration',
      description: 'Add real-time customer support with chatbots and live chat systems. Improve response times and customer satisfaction.',
      keywords: ['Chatbots', 'Live Support', 'AI Assistants', 'Customer Service'],
      headerColor: '#673AB7'
    },
    {
      icon: 'fa-solid fa-network-wired',
      title: 'Network Infrastructure',
      description: 'Set up and manage business networks, VPNs, and remote access solutions. Ensure reliable connectivity for distributed teams.',
      keywords: ['VPN Setup', 'Network Config', 'Remote Access', 'Infrastructure'],
      headerColor: '#00796B'
    },
    {
      icon: 'fa-solid fa-file-invoice',
      title: 'Billing Automation',
      description: 'Automate invoicing, payment reminders, and subscription management. Integrate with QuickBooks, Stripe, and other platforms.',
      keywords: ['QuickBooks', 'Stripe', 'Subscription Billing', 'Payment Processing'],
      headerColor: '#D32F2F'
    },
    {
      icon: 'fa-solid fa-briefcase',
      title: 'Digital Transformation',
      description: 'Complete business digitization strategy. Move from manual processes to integrated digital systems that scale with your growth.',
      keywords: ['Strategy', 'Digital Migration', 'Change Management', 'Scalability'],
      headerColor: '#1976D2'
    }
  ];

  @Input() 
  set services(value: Service[]) {
    if (value && value.length > 0) {
      this._services = value;
    }
  }
  
  get services(): Service[] {
    return this._services;
  }
}
