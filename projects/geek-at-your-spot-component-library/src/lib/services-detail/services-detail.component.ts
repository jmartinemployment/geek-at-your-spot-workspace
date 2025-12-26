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
  backgroundColor: string;
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
        'SEO-friendly code and structure'
      ],
      keywords: 'website development, web design, WordPress development, e-commerce websites, responsive web design, small business websites, custom website design, mobile-friendly websites, website builder, professional web design',
      backgroundColor: '#7E5EF2'
    },
    {
      iconClass: 'fas fa-search',
      title: 'SEO & Search Engine Optimization',
      subtitle: 'Get found by customers searching for your services',
      benefits: [
        'Higher Google rankings that drive organic traffic to your website',
        'Local SEO optimization to dominate your geographic market',
        'Increased visibility for keywords your customers are searching',
        'More qualified leads from people actively looking for your services',
        'Long-term growth without ongoing advertising costs'
      ],
      useCases: [
        'Local businesses competing in their city or region',
        'Service providers looking to attract nearby customers',
        'E-commerce stores wanting to rank for product keywords',
        'Professional services like lawyers, doctors, and consultants',
        'Contractors and home service businesses'
      ],
      features: [
        'Keyword research and competitive analysis',
        'On-page SEO optimization',
        'Technical SEO fixes and site speed improvements',
        'Local business listing optimization',
        'Content strategy and creation',
        'Link building and authority development',
        'Monthly ranking reports and analytics'
      ],
      keywords: 'SEO services, search engine optimization, local SEO, Google rankings, keyword optimization, SEO consultant, SEO agency, small business SEO, local search optimization, organic traffic',
      backgroundColor: '#3060BF'
    },
    {
      iconClass: 'fas fa-chart-line',
      title: 'Business Analytics & Data Analysis',
      subtitle: 'Turn your data into actionable business insights',
      benefits: [
        'Make data-driven decisions backed by real business intelligence',
        'Identify revenue opportunities and cost-saving measures',
        'Understand customer behavior and preferences',
        'Forecast sales and plan inventory with confidence',
        'Track KPIs and measure business performance accurately'
      ],
      useCases: [
        'Retail businesses analyzing sales patterns and inventory',
        'Service companies tracking customer acquisition costs',
        'E-commerce stores optimizing product mix and pricing',
        'Restaurants analyzing menu performance and profitability',
        'B2B companies measuring sales pipeline effectiveness'
      ],
      features: [
        'Custom dashboard creation with real-time data',
        'Sales forecasting and trend analysis',
        'Customer segmentation and behavior tracking',
        'Revenue analysis by product, service, or customer',
        'Integration with QuickBooks, Shopify, and other platforms',
        'Automated reporting delivered to your inbox',
        'Data visualization and interactive charts'
      ],
      keywords: 'business analytics, data analysis, business intelligence, sales forecasting, data-driven decisions, KPI tracking, business reporting, analytics dashboard, small business analytics',
      backgroundColor: '#1D3273'
    },
    {
      iconClass: 'fas fa-tachometer-alt',
      title: 'Website Performance & Analytics',
      subtitle: 'Optimize your website for speed, conversions, and results',
      benefits: [
        'Faster page load times that reduce bounce rates',
        'Better user experience that keeps visitors engaged',
        'Higher conversion rates and more sales or leads',
        'Improved Google rankings from site speed optimization',
        'Clear insights into what\'s working and what needs improvement'
      ],
      useCases: [
        'E-commerce sites with slow checkout processes',
        'High-traffic websites experiencing performance issues',
        'Landing pages with low conversion rates',
        'Mobile sites with poor user experience',
        'Websites that don\'t know which pages drive results'
      ],
      features: [
        'Google Analytics setup and configuration',
        'Site speed optimization and performance tuning',
        'Conversion rate optimization (CRO)',
        'User behavior tracking and heatmaps',
        'A/B testing and multivariate testing',
        'Mobile performance optimization',
        'Custom event tracking and goal setup'
      ],
      keywords: 'website analytics, Google Analytics, site speed optimization, conversion rate optimization, website performance, page speed, CRO, web analytics, performance optimization',
      backgroundColor: '#3D80D9'
    },
    {
      iconClass: 'fas fa-headset',
      title: 'Customer Service Automation',
      subtitle: '24/7 automated support that improves satisfaction and reduces costs',
      benefits: [
        'Instant responses to common customer questions at any time',
        'Reduced support costs by automating repetitive inquiries',
        'Improved customer satisfaction with fast, accurate answers',
        'Free up staff to handle complex issues requiring human touch',
        'Capture leads and information even outside business hours'
      ],
      useCases: [
        'E-commerce stores handling order status inquiries',
        'Service businesses answering common questions',
        'SaaS companies providing technical support',
        'Restaurants taking reservations and answering menu questions',
        'Professional services qualifying leads automatically'
      ],
      features: [
        'AI chatbot development and training',
        'Integration with your website and systems',
        'Natural language processing for understanding questions',
        'Automated ticket creation for complex issues',
        'Multi-channel support (web, Facebook, SMS)',
        'Analytics and conversation insights',
        'Seamless handoff to human agents when needed'
      ],
      keywords: 'customer service automation, AI chatbot, automated support, chatbot development, customer support software, live chat automation, help desk automation, 24/7 customer service',
      backgroundColor: '#203B8C'
    },
    {
      iconClass: 'fas fa-users',
      title: 'HR & Recruiting Automation',
      subtitle: 'Streamline hiring and onboarding with intelligent automation',
      benefits: [
        'Faster time to hire with automated screening and scheduling',
        'Better candidate experience with prompt communication',
        'Reduced administrative work for HR staff',
        'Consistent onboarding process for every new hire',
        'Data-driven hiring decisions based on analytics'
      ],
      useCases: [
        'Growing businesses hiring multiple positions regularly',
        'Companies with high-volume seasonal hiring',
        'Small businesses without dedicated HR staff',
        'Organizations wanting to improve candidate experience',
        'Companies needing structured onboarding processes'
      ],
      features: [
        'Automated job posting to multiple platforms',
        'Resume screening and candidate ranking',
        'Interview scheduling automation',
        'Applicant tracking system (ATS) setup',
        'Employee onboarding workflow automation',
        'Document collection and e-signature integration',
        'New hire training task automation'
      ],
      keywords: 'HR automation, recruiting automation, applicant tracking, ATS, hiring software, onboarding automation, recruitment process, HR software for small business',
      backgroundColor: '#A7F2F2'
    },
    {
      iconClass: 'fas fa-pen-fancy',
      title: 'Content Creation & Marketing',
      subtitle: 'SEO-optimized content that engages audiences and drives results',
      benefits: [
        'High-quality content that establishes your expertise',
        'Improved SEO rankings from keyword-optimized articles',
        'Consistent content calendar without the writing burden',
        'Engaging social media posts that build your following',
        'Email newsletters that nurture leads and drive sales'
      ],
      useCases: [
        'Businesses needing regular blog posts for SEO',
        'E-commerce stores requiring product descriptions',
        'Service providers creating educational content',
        'Startups building thought leadership',
        'Companies managing multiple social media channels'
      ],
      features: [
        'Blog post writing and optimization',
        'Product description creation',
        'Social media content and scheduling',
        'Email newsletter creation',
        'Website copywriting and landing pages',
        'Content strategy and planning',
        'SEO keyword integration'
      ],
      keywords: 'content creation, content marketing, blog writing, copywriting, SEO content, social media content, email newsletters, product descriptions, content strategy',
      backgroundColor: '#3632A6'
    },
    {
      iconClass: 'fas fa-file-alt',
      title: 'Process Documentation & SOPs',
      subtitle: 'Document your processes for consistency and scalability',
      benefits: [
        'Consistent quality through standardized procedures',
        'Faster employee training with clear documentation',
        'Easy scaling as new team members can follow SOPs',
        'Reduced errors and improved operational efficiency',
        'Knowledge preservation even when employees leave'
      ],
      useCases: [
        'Growing businesses needing to train new employees',
        'Franchises requiring standardized operations',
        'Companies preparing for sale or investment',
        'Organizations implementing quality management systems',
        'Businesses with complex multi-step processes'
      ],
      features: [
        'Standard Operating Procedure (SOP) creation',
        'Employee handbook development',
        'Training manual creation',
        'Process flowchart and diagram design',
        'Video tutorial production',
        'Knowledge base organization',
        'Document templates and forms'
      ],
      keywords: 'process documentation, SOP creation, standard operating procedures, employee handbook, training manuals, business processes, process improvement, documentation services',
      backgroundColor: '#091740'
    },
    {
      iconClass: 'fas fa-shopping-cart',
      title: 'E-commerce Optimization',
      subtitle: 'Increase online sales with optimized product catalogs and checkout',
      benefits: [
        'Higher conversion rates through optimized user experience',
        'Reduced cart abandonment with streamlined checkout',
        'Increased average order value with upsells and cross-sells',
        'Better product discovery through improved search and filters',
        'Multi-channel selling across website, Amazon, and social media'
      ],
      useCases: [
        'Online stores with low conversion rates',
        'Growing e-commerce businesses expanding product lines',
        'Retailers moving from physical to online sales',
        'Wholesalers adding B2B e-commerce',
        'Subscription box and recurring revenue businesses'
      ],
      features: [
        'Shopify and WooCommerce optimization',
        'Product catalog management and organization',
        'Payment gateway integration and optimization',
        'Inventory synchronization across channels',
        'Shipping calculator and fulfillment setup',
        'Abandoned cart recovery automation',
        'Product recommendation engines'
      ],
      keywords: 'e-commerce optimization, Shopify development, WooCommerce, online store optimization, product catalog, shopping cart optimization, e-commerce website, online sales',
      backgroundColor: '#0A0B26'
    },
    {
      iconClass: 'fas fa-envelope',
      title: 'Email Marketing Automation',
      subtitle: 'Nurture leads and drive sales with automated email campaigns',
      benefits: [
        'Automated lead nurturing that converts prospects to customers',
        'Increased customer lifetime value through retention emails',
        'Time savings with set-it-and-forget-it campaigns',
        'Better segmentation for personalized messaging',
        'Measurable ROI with detailed analytics and tracking'
      ],
      useCases: [
        'E-commerce stores with abandoned cart recovery',
        'Service businesses nurturing leads over time',
        'B2B companies with long sales cycles',
        'Membership sites with onboarding sequences',
        'Product launches requiring timed email series'
      ],
      features: [
        'Email campaign creation and design',
        'Marketing automation workflow setup',
        'Subscriber list segmentation',
        'Drip campaign and sequence building',
        'A/B testing and optimization',
        'Integration with Mailchimp, Constant Contact',
        'Analytics and performance reporting'
      ],
      keywords: 'email marketing automation, email campaigns, drip campaigns, marketing automation, email newsletter, Mailchimp, automated emails, email marketing services',
      backgroundColor: '#03020D'
    },
    {
      iconClass: 'fas fa-share-alt',
      title: 'Social Media Management',
      subtitle: 'Grow your brand with strategic social media presence',
      benefits: [
        'Consistent brand presence across all platforms',
        'Increased engagement with your target audience',
        'Time savings with scheduled posts and automated responses',
        'Better insights into what content resonates',
        'Community building that drives customer loyalty'
      ],
      useCases: [
        'Businesses building brand awareness',
        'Local companies engaging with community',
        'E-commerce brands driving traffic to online stores',
        'Service providers establishing thought leadership',
        'Product launches requiring social amplification'
      ],
      features: [
        'Social media strategy development',
        'Content calendar planning and scheduling',
        'Engagement monitoring and response management',
        'Platform-specific content optimization',
        'Influencer identification and outreach',
        'Social media advertising management',
        'Performance analytics and reporting'
      ],
      keywords: 'social media management, social media marketing, content scheduling, Facebook marketing, Instagram growth, LinkedIn strategy, Twitter management, social media engagement',
      backgroundColor: '#7E5EF2'
    },
    {
      iconClass: 'fas fa-chart-pie',
      title: 'Financial Analysis & Forecasting',
      subtitle: 'Make informed financial decisions with accurate projections',
      benefits: [
        'Clear visibility into business financial health',
        'Accurate cash flow predictions prevent shortfalls',
        'Identify profitable products and services',
        'Make confident investment decisions',
        'Prepare for seasonal variations and market changes'
      ],
      useCases: [
        'Growing businesses planning expansion',
        'Companies seeking investment or loans',
        'Seasonal businesses managing cash flow',
        'Multi-product businesses optimizing mix',
        'Service companies pricing new offerings'
      ],
      features: [
        'Financial modeling and scenario planning',
        'Budget creation and variance analysis',
        'Cash flow forecasting and management',
        'Profitability analysis by segment',
        'QuickBooks and Xero integration',
        'Custom financial dashboard creation',
        'Monthly financial reports and insights'
      ],
      keywords: 'financial forecasting, business financial analysis, cash flow management, budget planning, financial modeling, QuickBooks consulting, business finance, financial planning',
      backgroundColor: '#3060BF'
    },
    {
      iconClass: 'fas fa-boxes',
      title: 'Inventory Management Systems',
      subtitle: 'Never run out of stock or overstock with smart inventory tracking',
      benefits: [
        'Real-time visibility into stock levels across locations',
        'Automatic reorder points prevent stockouts',
        'Reduced carrying costs with optimized inventory',
        'Accurate inventory counts eliminate shrinkage',
        'Seamless multi-channel inventory synchronization'
      ],
      useCases: [
        'Retailers with multiple locations',
        'E-commerce stores selling across platforms',
        'Wholesalers managing large SKU counts',
        'Manufacturers tracking raw materials',
        'Restaurants managing food inventory'
      ],
      features: [
        'Real-time inventory tracking',
        'Automated reorder point calculations',
        'Barcode and QR code scanning',
        'Multi-location inventory management',
        'Supplier management and ordering',
        'Integration with POS and e-commerce',
        'Inventory reports and analytics'
      ],
      keywords: 'inventory management, stock tracking, inventory control, warehouse management, multi-channel inventory, inventory software, stock management system',
      backgroundColor: '#1D3273'
    },
    {
      iconClass: 'fas fa-id-card',
      title: 'CRM Integration & Management',
      subtitle: 'Build stronger customer relationships with organized data',
      benefits: [
        'Centralized customer information accessible to all teams',
        'Automated follow-ups ensure no leads slip through cracks',
        'Better sales forecasting with pipeline visibility',
        'Improved customer retention with relationship tracking',
        'Data-driven insights into customer behavior'
      ],
      useCases: [
        'Sales teams managing multiple prospects',
        'Service businesses tracking client interactions',
        'B2B companies with long sales cycles',
        'Growing teams needing centralized information',
        'Companies replacing spreadsheet chaos'
      ],
      features: [
        'CRM system selection and setup',
        'Contact and company database organization',
        'Sales pipeline and opportunity tracking',
        'Email integration and tracking',
        'Task and activity automation',
        'Custom fields and workflows',
        'Reporting and sales analytics'
      ],
      keywords: 'CRM integration, customer relationship management, Salesforce setup, HubSpot CRM, contact management, sales pipeline, CRM software, customer database',
      backgroundColor: '#3D80D9'
    },
    {
      iconClass: 'fas fa-gavel',
      title: 'Legal Document Review & Management',
      subtitle: 'Streamline contract management and ensure compliance',
      benefits: [
        'Faster contract review and approval processes',
        'Reduced legal risks through systematic review',
        'Easy access to all contracts and agreements',
        'Automated renewal reminders prevent lapses',
        'Version control ensures latest documents in use'
      ],
      useCases: [
        'Businesses managing vendor contracts',
        'Companies with customer agreements',
        'Organizations ensuring regulatory compliance',
        'Businesses tracking NDAs and confidentiality',
        'Companies managing lease agreements'
      ],
      features: [
        'Contract repository and organization',
        'Automated contract review workflows',
        'Renewal date tracking and alerts',
        'Clause extraction and analysis',
        'E-signature integration',
        'Version control and audit trails',
        'Compliance requirement tracking'
      ],
      keywords: 'contract management, legal document review, compliance management, contract automation, document management system, legal workflow, contract repository',
      backgroundColor: '#203B8C'
    },
    {
      iconClass: 'fas fa-calendar-alt',
      title: 'Appointment Scheduling Automation',
      subtitle: 'Eliminate scheduling headaches with automated booking',
      benefits: [
        'Reduce no-shows with automated reminders',
        '24/7 booking availability increases appointments',
        'Eliminate double-booking and scheduling conflicts',
        'Save staff time with self-service scheduling',
        'Sync with team calendars automatically'
      ],
      useCases: [
        'Medical and dental practices',
        'Salons and spa services',
        'Consulting and professional services',
        'Fitness trainers and coaches',
        'Service businesses with appointments'
      ],
      features: [
        'Online booking page creation',
        'Calendar synchronization (Google, Outlook)',
        'Automated email and SMS reminders',
        'Payment collection at booking',
        'Staff scheduling and availability management',
        'Waitlist and cancellation management',
        'Booking analytics and reporting'
      ],
      keywords: 'appointment scheduling, online booking, scheduling software, calendar management, appointment reminders, booking system, schedule automation',
      backgroundColor: '#A7F2F2'
    },
    {
      iconClass: 'fas fa-bullhorn',
      title: 'Marketing Automation & Campaigns',
      subtitle: 'Execute coordinated multi-channel marketing campaigns',
      benefits: [
        'Consistent messaging across all marketing channels',
        'Automated lead nurturing increases conversions',
        'Better ROI tracking across campaigns',
        'Personalized customer journeys at scale',
        'Time savings with automated workflows'
      ],
      useCases: [
        'Product launch campaigns',
        'Lead generation and nurturing programs',
        'Customer retention initiatives',
        'Event promotion and registration',
        'Multi-touch attribution campaigns'
      ],
      features: [
        'Marketing automation platform setup',
        'Multi-channel campaign orchestration',
        'Lead scoring and qualification',
        'Behavioral trigger automation',
        'A/B testing and optimization',
        'Campaign performance dashboards',
        'Integration with CRM and analytics'
      ],
      keywords: 'marketing automation, campaign management, multi-channel marketing, lead nurturing, marketing campaigns, HubSpot automation, Marketo, automated marketing',
      backgroundColor: '#3632A6'
    },
    {
      iconClass: 'fas fa-comments',
      title: 'AI Chatbot Development',
      subtitle: 'Deploy intelligent conversational AI for your business',
      benefits: [
        'Handle unlimited conversations simultaneously',
        'Qualify leads automatically before human handoff',
        'Provide instant answers reducing wait times',
        'Learn from interactions to improve over time',
        'Deploy across website, messaging, and mobile'
      ],
      useCases: [
        'E-commerce product recommendations',
        'Customer support and troubleshooting',
        'Lead qualification and scheduling',
        'FAQ automation and self-service',
        'Internal employee assistance'
      ],
      features: [
        'Custom chatbot design and development',
        'Natural language understanding training',
        'Integration with business systems',
        'Multi-platform deployment (web, Facebook, Slack)',
        'Conversation analytics and insights',
        'Human handoff workflows',
        'Continuous learning and improvement'
      ],
      keywords: 'AI chatbot, conversational AI, chatbot development, virtual assistant, NLP chatbot, intelligent automation, chat automation, AI customer service',
      backgroundColor: '#091740'
    },
    {
      iconClass: 'fas fa-project-diagram',
      title: 'Workflow Automation',
      subtitle: 'Eliminate manual work by connecting your business tools',
      benefits: [
        'Eliminate repetitive data entry tasks',
        'Reduce errors from manual processes',
        'Speed up business operations significantly',
        'Free staff to focus on strategic work',
        'Ensure consistency across systems'
      ],
      useCases: [
        'Connecting CRM to email marketing',
        'Syncing orders to accounting systems',
        'Automating lead distribution',
        'Creating tasks from form submissions',
        'Updating spreadsheets from multiple sources'
      ],
      features: [
        'Zapier and Make automation setup',
        'Custom API integration development',
        'Multi-step workflow creation',
        'Error handling and notifications',
        'Data transformation and mapping',
        'Conditional logic and branching',
        'Monitoring and maintenance'
      ],
      keywords: 'workflow automation, Zapier integration, Make automation, process automation, API integration, business automation, task automation, workflow optimization',
      backgroundColor: '#0A0B26'
    },
    {
      iconClass: 'fas fa-cloud-upload-alt',
      title: 'Cloud Migration & Management',
      subtitle: 'Move to the cloud for better collaboration and security',
      benefits: [
        'Access files and tools from anywhere',
        'Improved team collaboration with real-time editing',
        'Automatic backups prevent data loss',
        'Enhanced security with enterprise-grade protection',
        'Scalable storage that grows with your business'
      ],
      useCases: [
        'Businesses moving from on-premise servers',
        'Remote teams needing collaboration tools',
        'Companies outgrowing basic file sharing',
        'Organizations improving disaster recovery',
        'Businesses reducing IT infrastructure costs'
      ],
      features: [
        'Cloud platform selection and setup',
        'Data migration from existing systems',
        'User account and permission configuration',
        'Email migration to cloud platforms',
        'Collaboration tool deployment',
        'Security and compliance setup',
        'Training and change management'
      ],
      keywords: 'cloud migration, Google Workspace, Microsoft 365, cloud storage, cloud computing, cloud services, data migration, cloud collaboration',
      backgroundColor: '#03020D'
    }
  ];

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    const options = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          entry.target.classList.remove('animate-in');
        }
      });
    }, options);

    setTimeout(() => {
      const sections = document.querySelectorAll('.service-section');
      sections.forEach(section => this.observer?.observe(section));
    }, 100);
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}
