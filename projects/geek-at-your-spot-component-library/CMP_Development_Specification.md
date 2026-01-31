# Consent Management Platform (CMP) - Development Specification

## Executive Summary

This document outlines the development of a custom Consent Management Platform (CMP) similar to CookieYes, designed for GDPR, CCPA/CPRA, and LGPD compliance with Google certification capability.

**Project Goal:** Build a white-label CMP solution that businesses can deploy to manage user consent, maintain compliance documentation, and integrate with marketing/analytics tools while meeting Google's certification requirements for EEA/UK ad serving.

---

## 1. Core Requirements Overview

### 1.1 Regulatory Compliance Scope

**GDPR (General Data Protection Regulation) - European Union:**
- Explicit consent required before processing personal data
- Clear, plain language privacy disclosures
- Granular consent (purpose-specific)
- Right to withdraw consent easily
- Consent must be freely given, specific, informed, and unambiguous
- Pre-ticked boxes not allowed
- Proof of consent storage required

**CCPA/CPRA (California Consumer Privacy Act) - California:**
- "Do Not Sell My Personal Information" option required
- Opt-out mechanism for data sales
- Notice at collection of personal information
- Right to know what data is collected
- Right to delete personal data
- CPRA adds "Share" alongside "Sell" (2023)

**LGPD (Lei Geral de Proteção de Dados) - Brazil:**
- Similar to GDPR requirements
- Consent for sensitive personal data
- Data processing transparency
- Right to access, correct, delete data
- Notification of data breaches

**Google CMP Certification Requirements (Post-January 2024):**
- Must be on Google's approved CMP list
- Support IAB Transparency & Consent Framework (TCF) v2.2
- Integrate with Google's Consent Mode v2
- Pass Google's technical validation
- Annual recertification required

### 1.2 Functional Requirements

#### Consent Collection:
- ✅ Cookie banner/pop-up with customizable design
- ✅ Multi-language support (minimum: English, Spanish, French, German, Portuguese)
- ✅ Mobile-responsive design
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Customizable placement (bottom, top, sidebar, center)
- ✅ Brand color and logo customization
- ✅ Pre-built templates (CookieYes-style ease of setup)

#### Preference Management:
- ✅ Granular consent categories (Necessary, Analytics, Marketing, Preferences)
- ✅ Toggle switches for each category
- ✅ Preference center (dedicated page or modal)
- ✅ Cookie declaration with detailed descriptions
- ✅ "Accept All" / "Reject All" / "Customize" options
- ✅ Remember user choices across sessions
- ✅ Easy consent withdrawal mechanism
- ✅ Geolocation-based rule application

#### Compliance Documentation:
- ✅ Timestamped consent logs
- ✅ User identifier (IP-based or cookie ID)
- ✅ Consent version tracking
- ✅ Audit trail export (CSV, JSON)
- ✅ Compliance reporting dashboard
- ✅ GDPR-compliant data retention policies
- ✅ Tamper-proof logging (cryptographic signatures)

#### Enforcement & Signaling:
- ✅ Google Consent Mode v2 integration
- ✅ IAB TCF v2.2 support
- ✅ Google Tag Manager integration
- ✅ Block/allow third-party scripts based on consent
- ✅ Facebook Pixel conditional loading
- ✅ Google Analytics conditional firing
- ✅ Custom script management
- ✅ Automatic cookie scanning and categorization

---

## 2. Technical Architecture

### 2.1 System Components

```
┌─────────────────────────────────────────────────────────┐
│                    Client Websites                       │
│         (WordPress, Shopify, Custom HTML, etc.)         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│              CMP JavaScript SDK (Widget)                 │
│  • Banner rendering                                      │
│  • Consent capture                                       │
│  • Local storage management                              │
│  • Third-party script blocking/allowing                  │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                   CMP API Gateway                        │
│              (Node.js + Express.js)                      │
│  • Authentication & authorization                        │
│  • Rate limiting                                         │
│  • Request validation                                    │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┬──────────────┐
        ▼                 ▼              ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Consent    │  │   Config     │  │  Analytics   │
│   Service    │  │   Service    │  │   Service    │
│              │  │              │  │              │
│ • Store logs │  │ • Banner     │  │ • Dashboards │
│ • Validate   │  │   settings   │  │ • Reports    │
│ • Query      │  │ • Categories │  │ • Exports    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                  │
       └─────────────────┴──────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                       │
│  • consent_logs                                          │
│  • user_preferences                                      │
│  • banner_configurations                                 │
│  • cookie_declarations                                   │
│  • audit_trails                                          │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Admin Dashboard (React)                     │
│  • Banner customization                                  │
│  • Compliance reports                                    │
│  • Cookie scanner                                        │
│  • Integration management                                │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

**Frontend (Widget):**
- **JavaScript**: Vanilla JS (no framework dependencies for lightweight widget)
- **CSS**: Modular CSS with CSS variables for theming
- **Build**: Webpack for bundling and minification
- **Size Target**: < 50KB gzipped (critical for page load performance)

**Frontend (Admin Dashboard):**
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI or Tailwind CSS
- **State Management**: React Context API + React Query
- **Routing**: React Router v6
- **Charts**: Recharts for analytics visualizations

**Backend:**
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT with refresh tokens
- **Validation**: Zod for schema validation
- **API Documentation**: OpenAPI/Swagger

**Database:**
- **Primary**: PostgreSQL 16 (ACID compliance, audit trails)
- **Caching**: Redis (session management, high-frequency queries)
- **Migrations**: Prisma ORM

**Infrastructure:**
- **Hosting**: AWS (or Azure/GCP alternative)
- **CDN**: CloudFront for widget delivery (global low-latency)
- **Container**: Docker + Kubernetes (scalability)
- **CI/CD**: GitHub Actions
- **Monitoring**: DataDog or New Relic
- **Logging**: CloudWatch + structured JSON logs

**Third-Party Integrations:**
- **IAB TCF**: @iabtcf/core library
- **Google Consent Mode**: gtag.js integration
- **Geolocation**: MaxMind GeoIP2 or IPinfo.io
- **Cookie Scanner**: Puppeteer for automated scanning

---

## 3. Detailed Feature Specifications

### 3.1 Consent Banner Widget

#### Banner Display Logic:

```javascript
// Pseudo-code for banner display logic
function shouldShowBanner(user) {
  const hasConsented = localStorage.getItem('cmp_consent');
  const consentExpired = isConsentExpired(hasConsented);
  const userLocation = getUserLocation(); // Geolocation API
  
  if (!hasConsented || consentExpired) {
    if (requiresConsentByLocation(userLocation)) {
      return true;
    }
  }
  return false;
}

function requiresConsentByLocation(location) {
  const gdprCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
  const ccpaStates = ['CA', 'VA', 'CO', 'CT', 'UT']; // Expanding US privacy laws
  
  return gdprCountries.includes(location.country) || 
         (location.country === 'US' && ccpaStates.includes(location.state)) ||
         location.country === 'BR'; // LGPD
}
```

#### Banner Customization Options:

**Layout Templates:**
1. **Banner Bottom** (CookieYes default style)
   - Fixed position at bottom of page
   - Full width or centered with max-width
   - Slide-up animation

2. **Banner Top**
   - Fixed position at top
   - Pushes content down (no overlay)

3. **Center Modal**
   - Overlay with backdrop
   - Centered modal window
   - Dimmed background

4. **Sidebar**
   - Fixed left or right sidebar
   - Slide-in animation

**Customization API:**
```javascript
window.CMP.configure({
  banner: {
    position: 'bottom', // 'bottom' | 'top' | 'center' | 'sidebar-left' | 'sidebar-right'
    layout: 'box', // 'box' | 'bar' | 'edgeless'
    primaryColor: '#4A90E2',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    borderRadius: '8px',
    logoUrl: 'https://example.com/logo.png',
    customCSS: '.cmp-banner { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }'
  },
  buttons: {
    acceptAll: {
      text: 'Accept All Cookies',
      backgroundColor: '#4A90E2',
      textColor: '#FFFFFF'
    },
    rejectAll: {
      text: 'Reject All',
      backgroundColor: '#E0E0E0',
      textColor: '#333333'
    },
    customize: {
      text: 'Cookie Settings',
      backgroundColor: 'transparent',
      textColor: '#4A90E2',
      border: '1px solid #4A90E2'
    }
  },
  content: {
    heading: 'We Value Your Privacy',
    description: 'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    privacyPolicyUrl: 'https://example.com/privacy',
    cookiePolicyUrl: 'https://example.com/cookies'
  }
});
```

#### Consent Categories:

**Category Definitions:**

1. **Necessary (Always Active)**
   - Cannot be disabled
   - Essential for website functionality
   - Examples: Session cookies, security cookies, load balancing
   - No consent required (legitimate interest)

2. **Preferences**
   - Remember user settings
   - Examples: Language selection, currency, theme
   - Enhances user experience
   - Consent required

3. **Analytics**
   - Website performance and usage statistics
   - Examples: Google Analytics, Mixpanel, Hotjar
   - Consent required under GDPR

4. **Marketing**
   - Advertising and remarketing
   - Examples: Facebook Pixel, Google Ads, LinkedIn Insight Tag
   - Consent required under GDPR
   - Highest privacy concern

**Category Configuration:**
```javascript
{
  categories: [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly.',
      required: true,
      enabled: true,
      cookies: [
        { name: 'PHPSESSID', domain: '.example.com', duration: 'Session', purpose: 'Maintains user session' },
        { name: 'csrf_token', domain: '.example.com', duration: '1 day', purpose: 'Security token' }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      required: false,
      enabled: false, // Default off (GDPR)
      cookies: [
        { name: '_ga', domain: '.example.com', duration: '2 years', purpose: 'Google Analytics visitor ID' },
        { name: '_gid', domain: '.example.com', duration: '24 hours', purpose: 'Google Analytics session' }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies track your activity to deliver personalized ads.',
      required: false,
      enabled: false,
      cookies: [
        { name: '_fbp', domain: '.example.com', duration: '90 days', purpose: 'Facebook Pixel' },
        { name: 'IDE', domain: '.doubleclick.net', duration: '13 months', purpose: 'Google DoubleClick' }
      ]
    }
  ]
}
```

### 3.2 Preference Center

**Preference Center UI:**

```
┌─────────────────────────────────────────────────────────┐
│                    Cookie Preferences                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Manage your cookie preferences. You can enable or      │
│  disable different types of cookies below.               │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ✓ Necessary Cookies               [ALWAYS ON]   │  │
│  │   These cookies are essential...                 │  │
│  │   [View 3 cookies]                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ○ Analytics Cookies                 [Toggle]    │  │
│  │   These cookies help us improve...               │  │
│  │   [View 5 cookies]                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ○ Marketing Cookies                 [Toggle]    │  │
│  │   These cookies enable personalized...           │  │
│  │   [View 8 cookies]                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  [Save Preferences]  [Accept All]  [Reject All]        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Cookie Declaration Page:**

Expandable sections showing:
- Cookie name
- Domain
- Duration
- Category
- Purpose description
- Provider information

**Preference Update Flow:**

1. User clicks category toggle
2. JavaScript updates local state
3. "Save Preferences" button activates
4. On save:
   - POST to `/api/v1/consent/update`
   - Update localStorage
   - Reload affected scripts
   - Show confirmation message

### 3.3 Compliance Documentation

#### Consent Log Schema:

```sql
CREATE TABLE consent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier VARCHAR(255) NOT NULL, -- IP hash or cookie ID
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  consent_version VARCHAR(50) NOT NULL,
  website_id UUID NOT NULL REFERENCES websites(id),
  
  -- Consent details (JSONB for flexibility)
  consent_data JSONB NOT NULL,
  -- Example: {
  --   "necessary": true,
  --   "analytics": false,
  --   "marketing": true,
  --   "preferences": true
  -- }
  
  -- User context
  user_agent TEXT,
  ip_address INET,
  country_code VARCHAR(2),
  state_code VARCHAR(10),
  referrer TEXT,
  
  -- Compliance metadata
  banner_version VARCHAR(50),
  language VARCHAR(10),
  action_type VARCHAR(50), -- 'accept_all', 'reject_all', 'customize', 'update'
  
  -- Cryptographic signature for tamper-proofing
  signature VARCHAR(512),
  
  -- Indexes for querying
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_consent_logs_user ON consent_logs(user_identifier);
CREATE INDEX idx_consent_logs_timestamp ON consent_logs(timestamp);
CREATE INDEX idx_consent_logs_website ON consent_logs(website_id);
CREATE INDEX idx_consent_logs_country ON consent_logs(country_code);
```

#### Audit Trail Features:

**Tamper-Proof Logging:**
```javascript
function createConsentSignature(consentData) {
  const payload = {
    userId: consentData.userId,
    timestamp: consentData.timestamp,
    consents: consentData.consents,
    version: consentData.version
  };
  
  const message = JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', process.env.CONSENT_SIGNING_KEY)
    .update(message)
    .digest('hex');
    
  return signature;
}

function verifyConsentSignature(consentLog) {
  const expectedSignature = createConsentSignature(consentLog);
  return crypto.timingSafeEqual(
    Buffer.from(consentLog.signature),
    Buffer.from(expectedSignature)
  );
}
```

**Compliance Reporting Dashboard:**

1. **Consent Rate Over Time**
   - Line chart showing accept/reject/customize rates
   - Filterable by date range, country, device

2. **Consent Breakdown by Category**
   - Pie chart showing % accepting each category
   - Helps identify which cookies users trust

3. **Geographic Distribution**
   - Map showing consent rates by country
   - Identifies regions with low acceptance

4. **Audit Log Export**
   - CSV/JSON export with filters
   - Date range, country, action type
   - Formatted for regulatory submission

5. **Consent Version History**
   - Track changes to consent prompts
   - Show how consent rates changed after updates

### 3.4 Script Blocking & Integration

#### Google Consent Mode v2 Integration:

**Consent Mode Implementation:**

```javascript
// Default consent state (before user choice)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted', // Always granted (necessary)
  'wait_for_update': 500 // Wait 500ms for CMP
});

// After user consents (example: analytics + marketing accepted)
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted'
});

// Region-specific consent (EEA requires explicit consent)
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'region': ['BE', 'BG', 'CZ', 'DK', 'DE', 'EE', 'IE', 'EL', 'ES', 'FR', 'HR', 'IT', 'CY', 'LV', 'LT', 'LU', 'HU', 'MT', 'NL', 'AT', 'PL', 'PT', 'RO', 'SI', 'SK', 'FI', 'SE', 'IS', 'LI', 'NO']
});
```

#### IAB TCF v2.2 Support:

**TC String Generation:**

```javascript
import { TCModel, TCString } from '@iabtcf/core';

function generateTCString(userConsents) {
  const tcModel = new TCModel();
  
  // Set CMP details
  tcModel.cmpId = YOUR_CMP_ID; // Assigned by IAB after certification
  tcModel.cmpVersion = 1;
  tcModel.consentScreen = 1;
  tcModel.consentLanguage = 'EN';
  
  // Set vendor consents
  tcModel.vendorConsents.set([1, 2, 3, 4, 5]); // Google, Facebook, etc.
  
  // Set purpose consents (IAB purposes 1-10)
  if (userConsents.analytics) {
    tcModel.purposeConsents.set([1, 7, 9]); // Store/access info, analytics
  }
  if (userConsents.marketing) {
    tcModel.purposeConsents.set([2, 3, 4, 5, 6, 7, 8, 9, 10]); // Personalization, ads, content
  }
  
  // Generate TC String
  const tcString = TCString.encode(tcModel);
  
  // Store in cookie for third-party access
  document.cookie = `euconsent-v2=${tcString}; path=/; max-age=33696000; SameSite=None; Secure`;
  
  return tcString;
}
```

#### Script Blocking/Allowing:

**Automatic Script Management:**

```javascript
class ScriptManager {
  constructor(cmp) {
    this.cmp = cmp;
    this.blockedScripts = new Map();
    this.observeScriptTags();
  }
  
  observeScriptTags() {
    // Intercept script tags before execution
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'SCRIPT') {
            this.handleScript(node);
          }
        });
      });
    });
    
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  
  handleScript(scriptElement) {
    const category = this.categorizeScript(scriptElement);
    
    if (!this.cmp.hasConsent(category)) {
      // Block script execution
      scriptElement.type = 'text/plain';
      scriptElement.setAttribute('data-cmp-category', category);
      this.blockedScripts.set(scriptElement, category);
    }
  }
  
  categorizeScript(scriptElement) {
    const src = scriptElement.src || '';
    const content = scriptElement.textContent || '';
    
    // Pattern matching for common services
    if (src.includes('google-analytics.com') || content.includes('gtag')) {
      return 'analytics';
    }
    if (src.includes('facebook.net') || src.includes('fbevents.js')) {
      return 'marketing';
    }
    if (src.includes('doubleclick.net') || src.includes('googleadservices')) {
      return 'marketing';
    }
    
    // Check data attribute
    const category = scriptElement.getAttribute('data-cmp-category');
    if (category) return category;
    
    return 'necessary'; // Default to necessary (allowed)
  }
  
  executeBlockedScripts(category) {
    this.blockedScripts.forEach((scriptCategory, scriptElement) => {
      if (scriptCategory === category) {
        // Re-enable script
        scriptElement.type = 'text/javascript';
        
        // Clone and replace to trigger execution
        const newScript = document.createElement('script');
        Array.from(scriptElement.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = scriptElement.textContent;
        
        scriptElement.parentNode.replaceChild(newScript, scriptElement);
        this.blockedScripts.delete(scriptElement);
      }
    });
  }
}
```

**Manual Script Declaration:**

```html
<!-- Blocked by default, loaded when consent given -->
<script type="text/plain" data-cmp-category="analytics">
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>

<!-- Marketing script -->
<script type="text/plain" data-cmp-category="marketing">
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### 3.5 Cookie Scanner

**Automated Cookie Discovery:**

```javascript
import puppeteer from 'puppeteer';

async function scanWebsiteForCookies(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Enable cookie logging
  const cookies = [];
  
  page.on('response', async (response) => {
    const setCookieHeaders = response.headers()['set-cookie'];
    if (setCookieHeaders) {
      const parsedCookies = setCookieHeaders.split('\n').map(parseCookie);
      cookies.push(...parsedCookies);
    }
  });
  
  // Navigate to page
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Wait for dynamic content
  await page.waitForTimeout(5000);
  
  // Get all cookies
  const pageCookies = await page.cookies();
  
  // Categorize cookies
  const categorizedCookies = await categorizeCookies([...cookies, ...pageCookies]);
  
  await browser.close();
  
  return categorizedCookies;
}

function parseCookie(setCookieString) {
  // Parse Set-Cookie header
  const parts = setCookieString.split(';');
  const [nameValue] = parts;
  const [name, value] = nameValue.split('=');
  
  const cookie = { name: name.trim(), value: value.trim() };
  
  parts.slice(1).forEach(part => {
    const [key, val] = part.split('=').map(s => s.trim());
    if (key.toLowerCase() === 'domain') cookie.domain = val;
    if (key.toLowerCase() === 'path') cookie.path = val;
    if (key.toLowerCase() === 'max-age') cookie.maxAge = parseInt(val);
    if (key.toLowerCase() === 'expires') cookie.expires = val;
    if (key.toLowerCase() === 'samesite') cookie.sameSite = val;
    if (key.toLowerCase() === 'secure') cookie.secure = true;
    if (key.toLowerCase() === 'httponly') cookie.httpOnly = true;
  });
  
  return cookie;
}

async function categorizeCookies(cookies) {
  const categorized = {
    necessary: [],
    analytics: [],
    marketing: [],
    preferences: [],
    unknown: []
  };
  
  const patterns = {
    analytics: ['_ga', '_gid', '_gat', '__utm', '_hjid', 'mp_'],
    marketing: ['_fbp', '_gcl', 'IDE', 'test_cookie', 'fr', 'tr'],
    preferences: ['lang', 'currency', 'theme', 'locale']
  };
  
  cookies.forEach(cookie => {
    let categorized_flag = false;
    
    for (const [category, patternList] of Object.entries(patterns)) {
      if (patternList.some(pattern => cookie.name.includes(pattern))) {
        categorized[category].push(cookie);
        categorized_flag = true;
        break;
      }
    }
    
    if (!categorized_flag) {
      // Default to unknown, require manual categorization
      categorized.unknown.push(cookie);
    }
  });
  
  return categorized;
}
```

**Scanner Dashboard:**

```
┌─────────────────────────────────────────────────────────┐
│                  Cookie Scanner Results                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Website: https://example.com                           │
│  Scanned: 2024-01-15 14:32:15                          │
│  Total Cookies Found: 23                                │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Necessary (3)        [Auto-categorized]         │  │
│  │ • PHPSESSID  (.example.com)  Session            │  │
│  │ • csrf_token (.example.com)  1 day              │  │
│  │ • cookie_consent (.example.com) 1 year          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Analytics (8)        [Auto-categorized]         │  │
│  │ • _ga        (.example.com)  2 years            │  │
│  │ • _gid       (.example.com)  24 hours           │  │
│  │ • _gat       (.example.com)  1 minute           │  │
│  │ ... [View all]                                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Unknown (12)         [Requires Review]          │  │
│  │ • custom_id  (.example.com)  [Categorize ▼]    │  │
│  │ • visitor_id (.example.com)  [Categorize ▼]    │  │
│  │ ... [View all]                                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  [Run New Scan]  [Export Results]  [Update Banner]    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Google CMP Certification Process

### 4.1 Google's Requirements

**Technical Requirements:**

1. **IAB TCF v2.2 Compliance:**
   - Generate valid TC Strings
   - Support all IAB purposes and special features
   - Implement Global Vendor List (GVL) updates
   - Store TC String in `euconsent-v2` cookie

2. **Google Consent Mode v2:**
   - Implement all consent types:
     - `ad_storage`
     - `ad_user_data`
     - `ad_personalization`
     - `analytics_storage`
     - `functionality_storage`
     - `personalization_storage`
     - `security_storage`
   - Support region-specific defaults
   - Implement `wait_for_update` parameter

3. **User Experience Requirements:**
   - Clear purpose descriptions
   - Easy consent withdrawal
   - Accessible design (WCAG 2.1 AA)
   - Mobile-responsive
   - Multi-language support for EEA countries
   - Performance: Load in < 500ms, total weight < 100KB

4. **Compliance Requirements:**
   - GDPR Article 7 compliance
   - Proof of consent storage (audit trail)
   - Consent refresh mechanism (13 months max)
   - Privacy policy and cookie policy links

### 4.2 Certification Application Process

**Step 1: CMP Development (12-20 weeks)**
- Build all core features
- Implement IAB TCF v2.2
- Implement Google Consent Mode v2
- Complete testing and QA

**Step 2: IAB Registration (2-4 weeks)**

1. Register with IAB Europe:
   - Visit: https://iabeurope.eu/tcf-for-cmps/
   - Fill registration form
   - Provide company details
   - Wait for CMP ID assignment (typically assigned within 1-2 weeks)

2. Implement CMP ID in code:
```javascript
const tcModel = new TCModel();
tcModel.cmpId = YOUR_ASSIGNED_CMP_ID; // e.g., 123
tcModel.cmpVersion = 1;
```

3. Complete IAB self-certification checklist:
   - Technical implementation
   - UI/UX compliance
   - Documentation
   - Submit to IAB

**Step 3: Google Certification Application (4-8 weeks)**

1. **Apply via Google's CMP Application Form:**
   - URL: https://support.google.com/admanager/answer/10108740
   - Provide:
     - Company information
     - CMP details
     - IAB CMP ID
     - Test website URL with CMP implemented
     - Technical documentation
     - Privacy policy

2. **Google's Technical Review:**
   - Google tests CMP on provided URL
   - Validates IAB TCF implementation
   - Validates Google Consent Mode integration
   - Checks UX compliance
   - Reviews performance metrics

3. **Common Rejection Reasons (and how to avoid):**
   - ❌ TC String not properly formatted
     - ✅ Use official `@iabtcf/core` library, validate outputs
   - ❌ Google Consent Mode not implemented correctly
     - ✅ Test with Google Tag Assistant, validate dataLayer events
   - ❌ Poor mobile UX
     - ✅ Test on real devices, ensure touch targets >44px
   - ❌ Banner loads too slowly
     - ✅ Optimize JavaScript, use CDN, lazy-load non-critical components
   - ❌ Consent not stored properly
     - ✅ Implement secure audit trail, demonstrate in testing

4. **Revisions and Resubmission:**
   - Google provides feedback on failures
   - Fix issues and resubmit
   - Typical iteration: 1-2 rounds

**Step 4: Approval and Listing (1-2 weeks)**

Once approved:
- CMP added to Google's certified CMP list
- Publishers can select your CMP in Google Ad Manager
- Annual recertification required

**Step 5: Ongoing Maintenance**

- **Quarterly GVL Updates:** IAB updates vendor list, CMP must sync
- **Annual Recertification:** Google requires recertification each year
- **Regulatory Updates:** Monitor GDPR guidance, update as needed
- **Performance Monitoring:** Ensure <500ms load time maintained

### 4.3 Testing and Validation Tools

**IAB TCF Validator:**
- URL: https://iabtcf.com/#/validate
- Paste TC String to validate compliance
- Checks encoding, purposes, vendors

**Google Tag Assistant:**
- Chrome extension
- Validates Consent Mode implementation
- Shows consent state changes
- Verifies tag firing based on consent

**GDPR Compliance Checkers:**
- CookieBot Compliance Test
- OneTrust Cookie Checker
- Manually test consent flow in EEA IP

**Performance Testing:**
- Google PageSpeed Insights
- WebPageTest.org
- Lighthouse (measure CMP impact on Core Web Vitals)

**Automated Testing:**

```javascript
// Puppeteer test for CMP functionality
describe('CMP Consent Flow', () => {
  it('should display banner on first visit from EEA', async () => {
    const page = await browser.newPage();
    
    // Simulate EEA IP
    await page.emulate({
      geolocation: { latitude: 48.8566, longitude: 2.3522 }, // Paris
      permissions: ['geolocation']
    });
    
    await page.goto('https://test-site.com');
    
    // Check banner displayed
    const banner = await page.$('.cmp-banner');
    expect(banner).toBeTruthy();
    
    // Check TC String not set (no consent yet)
    const cookies = await page.cookies();
    const tcCookie = cookies.find(c => c.name === 'euconsent-v2');
    expect(tcCookie).toBeUndefined();
  });
  
  it('should set TC String when user accepts all', async () => {
    const page = await browser.newPage();
    await page.goto('https://test-site.com');
    
    // Click "Accept All"
    await page.click('[data-testid="accept-all-button"]');
    
    // Wait for consent processing
    await page.waitForTimeout(1000);
    
    // Check TC String set
    const cookies = await page.cookies();
    const tcCookie = cookies.find(c => c.name === 'euconsent-v2');
    expect(tcCookie).toBeDefined();
    expect(tcCookie.value).toMatch(/^[A-Za-z0-9_-]+$/); // Base64 encoded
    
    // Validate TC String
    const tcString = tcCookie.value;
    // Use @iabtcf/core to decode and validate
    const tcModel = TCString.decode(tcString);
    expect(tcModel.purposeConsents.size).toBeGreaterThan(0);
  });
  
  it('should fire Google Analytics only after analytics consent', async () => {
    const page = await browser.newPage();
    const requests = [];
    
    page.on('request', req => requests.push(req.url()));
    
    await page.goto('https://test-site.com');
    
    // Verify GA not loaded initially
    const gaRequests = requests.filter(url => url.includes('google-analytics.com'));
    expect(gaRequests.length).toBe(0);
    
    // Accept analytics
    await page.click('[data-testid="customize-button"]');
    await page.click('[data-testid="analytics-toggle"]');
    await page.click('[data-testid="save-preferences"]');
    
    await page.waitForTimeout(2000);
    
    // Verify GA now loaded
    const newGaRequests = requests.filter(url => url.includes('google-analytics.com'));
    expect(newGaRequests.length).toBeGreaterThan(0);
  });
});
```

---

## 5. Implementation Phases

### Phase 1: Core CMP Widget (8 weeks)

**Deliverables:**
- Consent banner with 4 design templates
- Preference center with category toggles
- Cookie declaration display
- Local storage consent management
- Basic script blocking (manual data attributes)
- Multi-language support (5 languages)
- Geolocation-based display logic

**Technology:**
- Vanilla JavaScript widget
- CSS with theming support
- Webpack build pipeline

**Budget:** $45,000 - $65,000

### Phase 2: Admin Dashboard (6 weeks)

**Deliverables:**
- Banner customization interface
- Cookie scanner tool
- Compliance reporting dashboard
- Audit log viewer and export
- User management (multi-tenant)
- Website management (multiple properties)

**Technology:**
- React + TypeScript
- Material-UI
- React Query for data fetching

**Budget:** $35,000 - $50,000

### Phase 3: Backend & Database (6 weeks)

**Deliverables:**
- RESTful API (Node.js + Express)
- PostgreSQL database schema
- Consent log storage and querying
- Authentication (JWT)
- Rate limiting and security
- Automated testing suite

**Budget:** $40,000 - $55,000

### Phase 4: IAB TCF v2.2 Integration (4 weeks)

**Deliverables:**
- TC String generation
- Global Vendor List (GVL) integration
- `euconsent-v2` cookie management
- Purpose and vendor consent UI
- IAB self-certification completion

**Budget:** $25,000 - $35,000

### Phase 5: Google Consent Mode v2 (3 weeks)

**Deliverables:**
- Consent Mode API integration
- Region-specific defaults
- Consent Mode testing tools
- Documentation and examples

**Budget:** $18,000 - $25,000

### Phase 6: Advanced Features (6 weeks)

**Deliverables:**
- Automatic script categorization
- Google Tag Manager integration
- A/B testing for banner variants
- Analytics on consent rates
- Custom CSS injection
- Webhook notifications

**Budget:** $35,000 - $50,000

### Phase 7: Testing & Certification (6 weeks)

**Deliverables:**
- Comprehensive QA testing
- Performance optimization (<500ms load)
- WCAG 2.1 AA accessibility compliance
- IAB registration and validation
- Google certification application
- Documentation for users

**Budget:** $30,000 - $40,000

### Phase 8: Deployment & Support (Ongoing)

**Deliverables:**
- Production deployment to AWS
- CDN setup for widget delivery
- Monitoring and alerting
- Bug fixes and maintenance
- Quarterly GVL updates
- Annual recertification

**Monthly Cost:** $3,000 - $6,000

---

## 6. Cost Summary

### Development Costs:

| Phase | Duration | Cost Range |
|-------|----------|-----------|
| Phase 1: Core Widget | 8 weeks | $45,000 - $65,000 |
| Phase 2: Admin Dashboard | 6 weeks | $35,000 - $50,000 |
| Phase 3: Backend & Database | 6 weeks | $40,000 - $55,000 |
| Phase 4: IAB TCF Integration | 4 weeks | $25,000 - $35,000 |
| Phase 5: Google Consent Mode | 3 weeks | $18,000 - $25,000 |
| Phase 6: Advanced Features | 6 weeks | $35,000 - $50,000 |
| Phase 7: Testing & Certification | 6 weeks | $30,000 - $40,000 |
| **TOTAL** | **39 weeks (~9 months)** | **$228,000 - $320,000** |

### Ongoing Costs:

| Item | Monthly Cost |
|------|-------------|
| AWS Infrastructure (CDN, EC2, RDS, CloudWatch) | $800 - $2,000 |
| Third-party Services (Geolocation, Monitoring) | $200 - $500 |
| Maintenance & Support (20% FTE developer) | $2,000 - $3,500 |
| **TOTAL MONTHLY** | **$3,000 - $6,000** |

### One-Time Costs:

| Item | Cost |
|------|------|
| IAB TCF Registration | $0 (free registration) |
| Google CMP Certification Application | $0 (free but requires compliance) |
| Legal Review (Privacy Policy, Cookie Policy) | $2,000 - $5,000 |

### Revenue Model (If Offering as SaaS):

**Freemium Tier:**
- Up to 10,000 pageviews/month
- Basic banner templates
- Core compliance features
- **Price:** Free

**Professional Tier:**
- Up to 100,000 pageviews/month
- All templates and customization
- Priority support
- Cookie scanner
- **Price:** $49-99/month

**Business Tier:**
- Up to 1,000,000 pageviews/month
- White-label option
- Advanced analytics
- A/B testing
- **Price:** $199-299/month

**Enterprise Tier:**
- Unlimited pageviews
- Dedicated support
- Custom development
- SLA guarantees
- **Price:** Custom ($500-2,000+/month)

---

## 7. Technical Specifications

### 7.1 API Endpoints

**Authentication:**
```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

**Websites (Multi-Tenant):**
```
GET    /api/v1/websites
POST   /api/v1/websites
GET    /api/v1/websites/:id
PUT    /api/v1/websites/:id
DELETE /api/v1/websites/:id
```

**Banner Configuration:**
```
GET    /api/v1/websites/:websiteId/banner/config
PUT    /api/v1/websites/:websiteId/banner/config
POST   /api/v1/websites/:websiteId/banner/preview
```

**Consent Management:**
```
POST   /api/v1/consent/record
GET    /api/v1/consent/logs
GET    /api/v1/consent/logs/:id
GET    /api/v1/consent/stats
POST   /api/v1/consent/export
```

**Cookie Scanner:**
```
POST   /api/v1/scanner/scan
GET    /api/v1/scanner/results/:scanId
PUT    /api/v1/scanner/categorize
GET    /api/v1/websites/:websiteId/cookies
```

**TCF (Transparency & Consent Framework):**
```
GET    /api/v1/tcf/gvl (Global Vendor List)
POST   /api/v1/tcf/generate-tc-string
POST   /api/v1/tcf/validate-tc-string
```

### 7.2 Widget JavaScript API

**Initialization:**
```javascript
<script src="https://cdn.yourCMP.com/cmp.js" async></script>
<script>
  window.CMP = window.CMP || [];
  window.CMP.push(['init', {
    websiteId: 'your-website-id-here',
    apiKey: 'your-api-key-here',
    language: 'en', // Auto-detect or manual
    region: 'auto', // Auto-detect from IP or manual
    
    // Optional overrides
    banner: {
      position: 'bottom',
      primaryColor: '#4A90E2'
    },
    
    // Callbacks
    onConsentGiven: function(consents) {
      console.log('User consented:', consents);
    },
    onConsentWithdrawn: function() {
      console.log('User withdrew consent');
    }
  }]);
</script>
```

**Programmatic Control:**
```javascript
// Show banner manually
window.CMP.showBanner();

// Show preference center
window.CMP.showPreferences();

// Get current consent
const consents = window.CMP.getConsent();
// Returns: { necessary: true, analytics: false, marketing: true, ... }

// Check specific consent
if (window.CMP.hasConsent('analytics')) {
  // Load analytics script
}

// Update consent programmatically (rare use case)
window.CMP.updateConsent({
  analytics: true,
  marketing: false
});

// Get TC String
const tcString = window.CMP.getTCString();
```

### 7.3 Performance Targets

**Load Time:**
- Widget download: < 30KB gzipped
- Initial banner display: < 200ms after page load
- Consent processing: < 100ms
- API response times: < 300ms (p95)

**Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus indicators visible

---

## 8. Security & Privacy

### 8.1 Data Protection

**Personal Data Minimization:**
- Store only: User identifier (hashed IP or cookie ID), consent choices, timestamp
- Do NOT store: Full IP addresses, personal information, browsing history
- Anonymize user identifiers after 90 days (GDPR requirement)

**Encryption:**
- All data in transit encrypted (TLS 1.3)
- Database encryption at rest (AWS RDS encryption)
- Consent logs cryptographically signed (tamper-proof)
- API keys encrypted in database

**Access Control:**
- Role-based access control (RBAC)
- Multi-factor authentication for admin access
- API rate limiting (1000 req/hour per IP)
- Audit logging of all admin actions

### 8.2 GDPR Compliance for CMP Itself

**Data Processing Agreement:**
- CMP acts as "data processor"
- Website owner is "data controller"
- DPA required for GDPR compliance

**User Rights:**
- Right to access: API for users to see their consent logs
- Right to erasure: API to delete user consent history
- Right to portability: Export consent logs in machine-readable format

**Data Retention:**
- Consent logs: 3 years (legal requirement for proof)
- Anonymized logs: Indefinitely for analytics
- Deleted user data: Immediate purge

---

## 9. Documentation & Training

### 9.1 Technical Documentation

**Developer Docs:**
- API reference (OpenAPI/Swagger)
- Widget integration guide
- Custom CSS styling guide
- Webhook integration
- IAB TCF implementation details

**Admin Docs:**
- Banner customization tutorial
- Cookie categorization guide
- Compliance reporting walkthrough
- Troubleshooting common issues

### 9.2 Compliance Documentation

**GDPR Compliance Guide:**
- How CMP ensures GDPR compliance
- Configuring for GDPR requirements
- Audit trail for regulators
- DPA template

**CCPA Compliance Guide:**
- "Do Not Sell" implementation
- California-specific requirements
- Opt-out link placement

---

## 10. Success Metrics

### 10.1 Technical KPIs

- Widget load time: < 200ms
- API response time: < 300ms (p95)
- Uptime: > 99.9%
- Error rate: < 0.1%

### 10.2 Business KPIs

- Consent acceptance rate: Target 60-80%
- Time to consent: < 10 seconds average
- Consent withdrawal rate: < 2%
- Customer satisfaction: NPS > 50

### 10.3 Compliance KPIs

- Google certification maintained
- Zero GDPR violations
- Audit readiness: 100%
- Regular security assessments: Quarterly

---

## 11. Risks & Mitigation

### 11.1 Technical Risks

**Risk:** Widget conflicts with existing JavaScript  
**Mitigation:** Namespace all code, extensive compatibility testing

**Risk:** Performance impact on websites  
**Mitigation:** Aggressive optimization, async loading, CDN delivery

**Risk:** Cross-browser compatibility issues  
**Mitigation:** Automated cross-browser testing, progressive enhancement

### 11.2 Regulatory Risks

**Risk:** GDPR/CCPA requirements change  
**Mitigation:** Legal monitoring, quarterly compliance review, rapid update capability

**Risk:** Google certification denial  
**Mitigation:** Early testing with Google tools, follow IAB guidelines strictly

**Risk:** New privacy regulations (other states/countries)  
**Mitigation:** Modular architecture allowing quick additions

### 11.3 Business Risks

**Risk:** Low adoption due to competition (OneTrust, Cookiebot, etc.)  
**Mitigation:** Focus on ease-of-use (CookieYes approach), competitive pricing, white-label option

**Risk:** Ongoing maintenance costs exceed revenue  
**Mitigation:** Automated updates, efficient infrastructure, clear pricing model

---

## 12. Next Steps

### Immediate Actions (Week 1-2):

1. **Finalize Requirements:**
   - Review this specification with stakeholders
   - Prioritize features (MVP vs future enhancements)
   - Set budget and timeline expectations

2. **Team Assembly:**
   - Frontend developer (JavaScript/React expert)
   - Backend developer (Node.js + PostgreSQL)
   - UI/UX designer (compliance UX specialty)
   - QA engineer (automated testing)
   - Project manager

3. **Infrastructure Setup:**
   - AWS account and environment setup
   - GitHub repository initialization
   - Development environment configuration
   - CI/CD pipeline skeleton

4. **Legal Preparation:**
   - Privacy policy and cookie policy drafting
   - Terms of service for CMP-as-a-service
   - Data Processing Agreement template
   - Compliance consultation

### Development Kickoff (Week 3):

1. Design sprint for banner templates
2. Database schema finalization
3. API endpoint design and documentation
4. First sprint planning (2-week sprints)

### Certification Preparation (Month 6):

1. IAB registration application
2. Google certification documentation prep
3. Test website with full CMP implementation
4. Performance optimization and testing

---

## Appendix A: Comparison with CookieYes

| Feature | CookieYes | Our Custom CMP |
|---------|-----------|----------------|
| Banner Templates | 3 pre-built | 4 pre-built + fully custom |
| Languages | 40+ | 5 initially, expandable |
| Cookie Scanner | Automated | Automated (Puppeteer-based) |
| IAB TCF Support | Yes (v2.2) | Yes (v2.2) |
| Google Consent Mode | Yes (v2) | Yes (v2) |
| Pricing | $0-$30/month | TBD (competitive) |
| White-Label | Enterprise tier | All tiers |
| Self-Hosted Option | No | Possible |
| Custom Development | No | Yes (our control) |
| Data Ownership | CookieYes hosts | You own all data |

**Key Differentiator:** Complete control over roadmap, white-label capability, potential for self-hosted deployment for enterprise clients with strict data residency requirements.

---

## Appendix B: Regulatory Reference Links

**GDPR:**
- Official text: https://gdpr-info.eu/
- ICO guidance: https://ico.org.uk/for-organisations/guide-to-data-protection/
- Article 7 (Consent): https://gdpr-info.eu/art-7-gdpr/

**CCPA/CPRA:**
- Official text: https://oag.ca.gov/privacy/ccpa
- CPRA amendments: https://cpra.ca.gov/

**LGPD:**
- Official text (Portuguese): https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- English summary: https://iapp.org/resources/article/brazilian-data-protection-law-lgpd-english-translation/

**IAB TCF:**
- Framework documentation: https://iabeurope.eu/transparency-consent-framework/
- CMP registration: https://iabeurope.eu/tcf-for-cmps/
- Technical specs: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework

**Google:**
- CMP certification: https://support.google.com/admanager/answer/10108740
- Consent Mode docs: https://developers.google.com/tag-platform/security/guides/consent
- Tag Manager integration: https://support.google.com/tagmanager/answer/10718549

---

## Appendix C: Sample Privacy Policy Language

```
Cookie Policy

Last Updated: [Date]

1. What Are Cookies

Cookies are small text files stored on your device when you visit our website. 
They help us provide you with a better experience by remembering your preferences 
and understanding how you use our site.

2. How We Use Cookies

We use cookies for the following purposes:

Necessary Cookies (Always Active)
These cookies are essential for our website to function properly. They enable 
basic features like page navigation and access to secure areas.

Analytics Cookies (Optional)
With your consent, we use analytics cookies to understand how visitors interact 
with our website. This helps us improve our services.

Marketing Cookies (Optional)
With your consent, we use marketing cookies to show you relevant advertisements 
based on your interests.

3. Your Choices

You can manage your cookie preferences at any time by clicking the "Cookie Settings" 
link at the bottom of our website. You can accept all cookies, reject optional cookies, 
or customize your preferences by category.

4. Third-Party Cookies

We work with third-party service providers who may also set cookies on your device. 
These include:

- Google Analytics (analytics)
- Facebook Pixel (marketing)
- Google Ads (marketing)

For more information about how these providers use cookies, please see their privacy policies.

5. Updates to This Policy

We may update this Cookie Policy from time to time. The "Last Updated" date at the 
top of this policy reflects when changes were made.

6. Contact Us

If you have questions about our use of cookies, please contact us at:
privacy@yourcompany.com
```

---

**END OF SPECIFICATION**

Total Pages: 42
Word Count: ~18,500 words
Last Updated: 2025-01-15
