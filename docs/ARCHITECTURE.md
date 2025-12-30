# Geek @ Your Spot - System Architecture

## High-Level Overview

This is a hybrid WordPress + Angular system where Angular components are compiled as web components and embedded in WordPress pages.

## Technology Stack

### Frontend
- **Framework**: Angular 19 (standalone components)
- **Styling**: Bootstrap 5.3
- **Build**: Angular Elements (web components)
- **Deployment**: WordPress (SiteGround)

### Backend
- **API Gateway**: Express.js (ControllerBackend)
- **Services**: Express.js microservices
- **AI**: Anthropic Claude Sonnet 4
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Hosting**: Render.com

## Component Architecture

### Web Component Pattern
1. Angular components are built as `standalone: true`
2. Compiled to web components via Angular Elements
3. Registered in `main.ts` with `customElements.define()`
4. Embedded in WordPress via custom element tags

### Example Flow
```
[Angular Component] 
    → [Compile to Web Component] 
    → [Register in main.ts] 
    → [Use in WordPress PHP]
```

## Data Flow

### Contact Form Submission
```
[GeekContactModalComponent]
    ↓
[GeekEmailService.sendContactForm()]
    ↓
[ApiService → POST /api/email]
    ↓
[ControllerBackend → Email Service]
    ↓
[Email sent via SMTP]
```

### AI Quote Generation
```
[GeekQuoteAiComponent]
    ↓
[GeekQuoteAiService.sendMessage()]
    ↓
[ApiService → POST /api/web-dev/api/mcp/chat]
    ↓
[ControllerBackend → WebDevelopmentBackend]
    ↓
[Claude AI + MCP Tools]
    ↓
[Quote Response]
```

## Backend Services

### ControllerBackend (API Gateway)
- **URL**: https://geekquote-controller.onrender.com
- **Routes**:
  - `/api/web-dev/*` → WebDevelopmentBackend
  - `/api/email` → Email Service

### WebDevelopmentBackend
- **URL**: https://geekquote-backend.onrender.com
- **Features**: 11 MCP tools, Claude AI, Supabase database

## Build & Deploy

### Development Build
```bash
ng build geek-at-your-spot-component-library
ng build my-elements-app
```

### Output
```
dist/my-elements-app/browser/
├── main-[HASH].js
└── styles-[HASH].css
```

### WordPress Deployment
1. Upload files to WordPress theme
2. Update functions.php with new hashes
3. Clear SiteGround cache
4. Hard refresh browser
