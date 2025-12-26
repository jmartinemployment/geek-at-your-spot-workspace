import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceDetail {
  iconClass: string;
  title: string;
  subtitle: string;
  benefits: string[];
  useCases: string[];
  features: string[];
  keywords: string;
  headerColor: string;
}

@Component({
  selector: 'lib-services-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  services: ServiceDetail[] = [
    {
      iconClass: 'fas fa-laptop-code',
      title: 'Website Development & Design',
      subtitle: 'Custom websites that convert visitors into customers',
      headerColor: '#7E5EF2',
      benefits: [
        'Mobile-responsive design that works perfectly on all devices',
        'Fast loading speeds that improve user experience and SEO rankings',
        'Conversion-optimized layouts that guide visitors to take action',
        'Easy content management with WordPress or custom CMS',
        'Secure hosting and SSL certificates included'
      ],
      useCases: [
        'Small business websites showcasing products and services',
        'E-commerce stores with shopping cart and payment processing',
        'Portfolio websites for professionals and creatives',
        'Landing pages for marketing campaigns and lead generation',
        'Corporate websites with multiple pages and complex navigation'
      ],
      features: [
        'Custom WordPress theme development',
        'WooCommerce e-commerce integration',
        'Contact forms and email integration',
        'Google Analytics and tracking setup',
        'Social media integration',
        'Blog and content management',
        'SEO-friendly structure and metadata',
        'Mobile-first responsive design'
      ],
      keywords: 'WordPress, Custom Development, Responsive Design, Web Applications, E-commerce'
    },
    {
      iconClass: 'fas fa-search',
      title: 'SEO & Search Engine Optimization',
      subtitle: 'Get found by customers searching for your services',
      headerColor: '#4CAF50',
      benefits: [
        'Higher Google rankings that drive organic traffic to your website',
        'Local SEO optimization to dominate your geographic market',
        'Increased visibility for keywords your customers are searching',
        'More qualified leads from people actively looking for your services',
        'Sustainable growth without ongoing advertising costs'
      ],
      useCases: [
        'Local businesses competing in their geographic area',
        'Service providers looking to attract qualified leads',
        'E-commerce sites wanting to rank for product keywords',
        'Content publishers building organic traffic',
        'Businesses replacing expensive PPC with organic search'
      ],
      features: [
        'Technical SEO audits and fixes',
        'Keyword research and strategy',
        'On-page optimization',
        'Local SEO and Google Business Profile',
        'Link building and outreach',
        'Content optimization',
        'Competitor analysis',
        'Monthly reporting and tracking'
      ],
      keywords: 'SEO, Local Search, Google Rankings, Organic Traffic, Keyword Research'
    },
    {
      iconClass: 'fas fa-chart-line',
      title: 'Business Analytics & Data Analysis',
      subtitle: 'Turn your data into actionable business insights',
      headerColor: '#FF9800',
      benefits: [
        'Make data-driven decisions backed by real business intelligence',
        'Identify revenue opportunities and cost-saving measures',
        'Understand customer behavior and preferences',
        'Forecast sales and plan inventory with confidence',
        'Track KPIs that actually matter to your business'
      ],
      useCases: [
        'Retail businesses optimizing product mix and pricing',
        'Service companies tracking customer acquisition costs',
        'E-commerce sites analyzing conversion funnels',
        'Subscription businesses monitoring churn and retention',
        'Multi-location businesses comparing performance'
      ],
      features: [
        'Custom dashboard development',
        'Google Analytics setup and interpretation',
        'Sales and revenue reporting',
        'Customer behavior analysis',
        'A/B testing and experimentation',
        'Data visualization',
        'Automated reporting',
        'Predictive analytics'
      ],
      keywords: 'Analytics, Business Intelligence, Data Visualization, Reporting, KPI Tracking'
    },
    {
      iconClass: 'fas fa-robot',
      title: 'AI Integration',
      subtitle: 'Integrate Claude, ChatGPT, and custom AI models into your workflows',
      headerColor: '#E91E63',
      benefits: [
        'Automate customer service with intelligent chatbots',
        'Generate high-quality content at scale',
        'Analyze large datasets for business insights',
        'Improve decision-making with AI recommendations',
        'Reduce costs while improving service quality'
      ],
      useCases: [
        'Customer support automation with AI assistants',
        'Content generation for marketing and SEO',
        'Data analysis and business intelligence',
        'Process automation and workflow optimization',
        'Personalized customer experiences at scale'
      ],
      features: [
        'Claude API integration and implementation',
        'ChatGPT custom GPT development',
        'Custom AI model training and deployment',
        'Workflow automation with AI',
        'AI-powered chatbot development',
        'Natural language processing',
        'Sentiment analysis',
        'Predictive modeling'
      ],
      keywords: 'AI Integration, Claude API, ChatGPT, Machine Learning, Automation'
    },
    {
      iconClass: 'fas fa-pen-fancy',
      title: 'Content Marketing',
      subtitle: 'Strategic content creation including blog posts, case studies, and social media',
      headerColor: '#00BCD4',
      benefits: [
        'High-quality content that establishes your expertise',
        'Improved SEO rankings from keyword-optimized articles',
        'Consistent content calendar without the writing burden',
        'Engaging social media posts that build your following',
        'Content that converts readers into customers'
      ],
      useCases: [
        'Businesses building thought leadership',
        'Companies wanting to improve SEO through content',
        'Service providers educating potential customers',
        'E-commerce sites creating product descriptions',
        'B2B companies nurturing long sales cycles'
      ],
      features: [
        'Blog post writing',
        'Case study development',
        'White paper creation',
        'Social media content',
        'Email newsletter writing',
        'Product descriptions',
        'Landing page copy',
        'Content strategy development'
      ],
      keywords: 'Content Marketing, Blog Writing, SEO Content, Social Media, Copywriting'
    },
    {
      iconClass: 'fas fa-envelope-open-text',
      title: 'Email Marketing',
      subtitle: 'Automated email campaigns, segmentation, and personalization',
      headerColor: '#9C27B0',
      benefits: [
        'Automated lead nurturing that converts prospects to customers',
        'Increased customer lifetime value through retention emails',
        'Time savings with set-it-and-forget-it campaigns',
        'Better segmentation for personalized messaging',
        'Measurable ROI from every campaign'
      ],
      useCases: [
        'E-commerce stores recovering abandoned carts',
        'Service businesses nurturing long sales cycles',
        'SaaS companies onboarding new users',
        'Retailers promoting sales and new products',
        'B2B companies maintaining customer relationships'
      ],
      features: [
        'Email campaign design',
        'Marketing automation setup',
        'List segmentation',
        'Drip campaign development',
        'A/B testing',
        'Behavioral triggers',
        'Analytics and reporting',
        'CRM integration'
      ],
      keywords: 'Email Marketing, Marketing Automation, Drip Campaigns, Lead Nurturing, Newsletters'
    },
    {
      iconClass: 'fas fa-bullseye',
      title: 'PPC Advertising',
      subtitle: 'Google Ads and social media advertising management',
      headerColor: '#F44336',
      benefits: [
        'Optimized campaigns for maximum ROI and conversion rates',
        'Reduced cost per acquisition through testing',
        'Better targeting to reach ideal customers',
        'Detailed reporting and performance tracking',
        'Continuous optimization and improvement'
      ],
      useCases: [
        'Businesses wanting immediate traffic and leads',
        'E-commerce stores promoting products',
        'Local services targeting geographic areas',
        'B2B companies generating qualified leads',
        'Seasonal businesses during peak periods'
      ],
      features: [
        'Google Ads campaign setup and management',
        'Facebook and Instagram advertising',
        'Retargeting and remarketing campaigns',
        'Ad copywriting and creative development',
        'Landing page optimization',
        'Conversion tracking setup',
        'Budget optimization',
        'Detailed performance reporting'
      ],
      keywords: 'PPC, Google Ads, Facebook Ads, Paid Advertising, Campaign Management'
    },
    {
      iconClass: 'fas fa-plug',
      title: 'API Integration',
      subtitle: 'Connect your systems with third-party services',
      headerColor: '#3F51B5',
      benefits: [
        'Seamless data flow between business systems',
        'Eliminate manual data entry and errors',
        'Real-time synchronization across platforms',
        'Improved efficiency and productivity',
        'Better customer experience with integrated tools'
      ],
      useCases: [
        'E-commerce syncing inventory across platforms',
        'CRM integration with marketing automation',
        'Accounting software connected to e-commerce',
        'Payment gateway integration',
        'Third-party API connections'
      ],
      features: [
        'Zapier automation setup',
        'Make.com workflow development',
        'Custom API development and integration',
        'Webhook configuration',
        'Data transformation and mapping',
        'Error handling and monitoring',
        'Authentication and security',
        'API documentation'
      ],
      keywords: 'API Integration, Zapier, Make.com, Webhooks, Automation'
    },
    {
      iconClass: 'fas fa-database',
      title: 'Database Management',
      subtitle: 'Design, optimize, and maintain SQL and NoSQL databases',
      headerColor: '#607D8B',
      benefits: [
        'Improved application performance and speed',
        'Data integrity and security',
        'Scalable database architecture',
        'Automated backups and disaster recovery',
        'Optimized queries and indexing'
      ],
      useCases: [
        'Applications with slow database performance',
        'Growing databases needing optimization',
        'Data migration projects',
        'Complex reporting requirements',
        'High-traffic applications'
      ],
      features: [
        'Database design and architecture',
        'MySQL and PostgreSQL optimization',
        'MongoDB and NoSQL implementation',
        'Query optimization',
        'Indexing strategy',
        'Backup and recovery setup',
        'Performance monitoring',
        'Data migration services'
      ],
      keywords: 'Database Management, MySQL, PostgreSQL, MongoDB, Optimization'
    },
    {
      iconClass: 'fas fa-cloud',
      title: 'Cloud Solutions',
      subtitle: 'AWS, Google Cloud, and Azure deployment and management',
      headerColor: '#2196F3',
      benefits: [
        'Scalable infrastructure that grows with your business',
        'Reduced IT infrastructure costs',
        'Automatic backups and disaster recovery',
        'Enterprise-grade security',
        'Global availability and performance'
      ],
      useCases: [
        'Businesses migrating from on-premise servers',
        'Applications needing scalability',
        'Companies wanting redundancy and reliability',
        'Remote teams needing cloud collaboration',
        'Cost-conscious businesses reducing IT overhead'
      ],
      features: [
        'AWS EC2 and S3 setup',
        'Google Cloud Platform deployment',
        'Azure cloud services',
        'Load balancing and auto-scaling',
        'CDN configuration',
        'Serverless architecture',
        'Cloud security implementation',
        'Cost optimization'
      ],
      keywords: 'Cloud Computing, AWS, Google Cloud, Azure, DevOps'
    },
    {
      iconClass: 'fas fa-mobile-screen-button',
      title: 'Mobile Optimization',
      subtitle: 'Ensure your digital presence works perfectly on smartphones and tablets',
      headerColor: '#009688',
      benefits: [
        'Better user experience on mobile devices',
        'Improved Google rankings with mobile-first indexing',
        'Higher conversion rates from mobile visitors',
        'Progressive web app capabilities',
        'Faster load times on mobile networks'
      ],
      useCases: [
        'Websites with high mobile traffic',
        'E-commerce optimizing mobile checkout',
        'Local businesses targeting mobile searchers',
        'Apps needing responsive design',
        'Businesses building PWAs'
      ],
      features: [
        'Responsive design implementation',
        'Progressive web app development',
        'Mobile performance optimization',
        'Touch-friendly interface design',
        'Mobile-first CSS frameworks',
        'App-like user experience',
        'Offline functionality',
        'Mobile testing and QA'
      ],
      keywords: 'Mobile Optimization, Responsive Design, PWA, Mobile-First, App Development'
    },
    {
      iconClass: 'fas fa-shield-halved',
      title: 'Cybersecurity',
      subtitle: 'Protect your business with SSL certificates, security audits, and vulnerability assessments',
      headerColor: '#795548',
      benefits: [
        'Protection against data breaches and attacks',
        'Customer trust through secure transactions',
        'Compliance with security standards',
        'Early detection of vulnerabilities',
        'Reduced risk of downtime and data loss'
      ],
      useCases: [
        'E-commerce handling payment information',
        'Businesses storing customer data',
        'Companies requiring compliance certification',
        'Websites experiencing security threats',
        'Applications handling sensitive information'
      ],
      features: [
        'SSL certificate installation',
        'Security audits and penetration testing',
        'Firewall configuration',
        'Malware scanning and removal',
        'Security monitoring',
        'Compliance documentation',
        'Vulnerability assessments',
        'Incident response planning'
      ],
      keywords: 'Cybersecurity, SSL Certificates, Security Audits, Compliance, Firewalls'
    },
    {
      iconClass: 'fas fa-gears',
      title: 'Process Automation',
      subtitle: 'Streamline repetitive tasks with custom automation',
      headerColor: '#FF5722',
      benefits: [
        'Eliminate repetitive data entry tasks',
        'Reduce errors from manual processes',
        'Speed up business operations significantly',
        'Free staff to focus on strategic work',
        'Scale operations without adding headcount'
      ],
      useCases: [
        'Businesses with repetitive manual tasks',
        'Teams using disconnected software tools',
        'Companies experiencing data entry errors',
        'Organizations wanting to scale efficiently',
        'Departments needing better coordination'
      ],
      features: [
        'Process analysis and mapping',
        'Zapier and Make.com automation',
        'Custom API integrations',
        'Data transformation and routing',
        'Error handling and notifications',
        'Scheduled automation',
        'Webhook configuration',
        'Multi-step workflow design'
      ],
      keywords: 'Process Automation, Workflow Automation, Zapier, Integration, API'
    },
    {
      iconClass: 'fas fa-users',
      title: 'CRM Implementation',
      subtitle: 'Set up and customize HubSpot, Salesforce, or Zoho CRM',
      headerColor: '#8BC34A',
      benefits: [
        'Centralized customer information accessible to all teams',
        'Automated follow-ups ensure no leads slip through cracks',
        'Better sales forecasting with pipeline visibility',
        'Improved customer retention with relationship tracking',
        'Increased revenue through better lead management'
      ],
      useCases: [
        'Sales teams managing prospect relationships',
        'Service businesses tracking customer interactions',
        'Growing companies needing organized contact data',
        'Teams wanting to improve follow-up consistency',
        'Businesses integrating sales and marketing'
      ],
      features: [
        'CRM platform selection and setup',
        'Data migration and cleanup',
        'Custom field configuration',
        'Sales pipeline automation',
        'Email integration',
        'Reporting and dashboards',
        'Mobile app configuration',
        'Third-party integrations'
      ],
      keywords: 'CRM, Customer Relationship Management, Sales Pipeline, HubSpot, Salesforce'
    },
    {
      iconClass: 'fas fa-cart-shopping',
      title: 'E-Commerce Solutions',
      subtitle: 'Build online stores with WooCommerce, Shopify, or custom platforms',
      headerColor: '#CDDC39',
      benefits: [
        'Higher conversion rates through optimized user experience',
        'Reduced cart abandonment with streamlined checkout',
        'Increased average order value with upsells and cross-sells',
        'Better product discovery through improved search and filters',
        'Mobile optimization for smartphone shoppers'
      ],
      useCases: [
        'Businesses launching online stores',
        'Retailers expanding to e-commerce',
        'Product-based businesses needing platforms',
        'Dropshipping businesses',
        'Subscription-based product companies'
      ],
      features: [
        'WooCommerce setup and customization',
        'Shopify store development',
        'Payment gateway integration',
        'Inventory management',
        'Shipping integration',
        'Product catalog optimization',
        'Checkout optimization',
        'Mobile commerce'
      ],
      keywords: 'E-Commerce, WooCommerce, Shopify, Online Store, Shopping Cart'
    },
    {
      iconClass: 'fas fa-graduation-cap',
      title: 'Training & Support',
      subtitle: 'Comprehensive training for your team on new tools and systems',
      headerColor: '#FFC107',
      benefits: [
        'Faster adoption of new systems and tools',
        'Reduced support tickets through better training',
        'Improved productivity with skilled staff',
        'Documentation for ongoing reference',
        'Confidence in using new technology'
      ],
      useCases: [
        'Teams implementing new software',
        'Businesses rolling out new processes',
        'Organizations upgrading systems',
        'Companies onboarding new employees',
        'Remote teams needing virtual training'
      ],
      features: [
        'Custom training program development',
        'Video tutorial creation',
        'Live training sessions',
        'Documentation and guides',
        'Ongoing technical support',
        'Knowledge base development',
        'Screen recording tutorials',
        'One-on-one coaching'
      ],
      keywords: 'Training, Technical Support, Documentation, Knowledge Base, Onboarding'
    },
    {
      iconClass: 'fas fa-comments',
      title: 'Live Chat Integration',
      subtitle: 'Add real-time customer support with chatbots and live chat systems',
      headerColor: '#673AB7',
      benefits: [
        'Instant responses to common customer questions at any time',
        'Reduced support costs by automating repetitive inquiries',
        'Improved customer satisfaction with fast, accurate answers',
        'Free up staff to handle complex issues requiring human touch',
        '24/7 availability without additional staffing'
      ],
      useCases: [
        'E-commerce answering product questions',
        'SaaS providing instant support',
        'Service businesses qualifying leads',
        'Healthcare answering common questions',
        'Financial services handling inquiries'
      ],
      features: [
        'Live chat widget installation',
        'AI chatbot development',
        'Integration with help desk',
        'Automated responses',
        'Chat routing and assignment',
        'Conversation history',
        'Mobile chat support',
        'Analytics and reporting'
      ],
      keywords: 'Live Chat, Chatbots, Customer Support, AI Assistants, Real-Time Support'
    },
    {
      iconClass: 'fas fa-network-wired',
      title: 'Network Infrastructure',
      subtitle: 'Set up and manage business networks, VPNs, and remote access solutions',
      headerColor: '#00796B',
      benefits: [
        'Reliable connectivity for distributed teams',
        'Secure remote access to business resources',
        'Better network performance and speed',
        'Enhanced security with VPN tunnels',
        'Centralized network management'
      ],
      useCases: [
        'Remote teams needing secure access',
        'Offices setting up new networks',
        'Businesses requiring VPN solutions',
        'Companies with multiple locations',
        'Organizations upgrading infrastructure'
      ],
      features: [
        'Network design and setup',
        'VPN configuration',
        'Remote access solutions',
        'Router and switch configuration',
        'Wireless network setup',
        'Network security implementation',
        'Performance monitoring',
        'Troubleshooting and support'
      ],
      keywords: 'Network Infrastructure, VPN, Remote Access, Network Setup, IT Infrastructure'
    },
    {
      iconClass: 'fas fa-file-invoice',
      title: 'Billing Automation',
      subtitle: 'Automate invoicing, payment reminders, and subscription management',
      headerColor: '#D32F2F',
      benefits: [
        'Faster payment collection with automated reminders',
        'Reduced billing errors and disputes',
        'Time savings through automation',
        'Better cash flow management',
        'Professional automated invoicing'
      ],
      useCases: [
        'Service businesses billing clients',
        'Subscription-based companies',
        'Agencies with recurring services',
        'Contractors needing invoicing',
        'Businesses with payment plans'
      ],
      features: [
        'Automated invoice generation',
        'Payment reminder automation',
        'Subscription billing management',
        'QuickBooks integration',
        'Stripe payment processing',
        'Recurring billing setup',
        'Payment plan automation',
        'Financial reporting'
      ],
      keywords: 'Billing Automation, Invoicing, QuickBooks, Stripe, Payment Processing'
    },
    {
      iconClass: 'fas fa-briefcase',
      title: 'Digital Transformation',
      subtitle: 'Complete business digitization strategy',
      headerColor: '#1976D2',
      benefits: [
        'Move from manual to digital processes',
        'Improved efficiency across all departments',
        'Better data and insights for decisions',
        'Scalable systems that grow with business',
        'Competitive advantage through technology'
      ],
      useCases: [
        'Traditional businesses going digital',
        'Companies modernizing operations',
        'Organizations improving efficiency',
        'Businesses preparing for growth',
        'Industries undergoing digital disruption'
      ],
      features: [
        'Digital strategy development',
        'Process digitization',
        'System integration',
        'Change management',
        'Staff training',
        'Technology selection',
        'Implementation planning',
        'Ongoing optimization'
      ],
      keywords: 'Digital Transformation, Business Modernization, Process Digitization, Technology Strategy, Change Management'
    }
  ];

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    setTimeout(() => {
      const sections = document.querySelectorAll('.service-section');
      sections.forEach(section => {
        if (this.observer) {
          this.observer.observe(section);
        }
      });
    }, 100);
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}
