# Geek @ Your Spot - Angular Component Library

Modern Angular web components for WordPress integration with AI-powered quote generation and business automation.

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────┐
│          WordPress + Angular Web Components         │
│              (geekatyourspot.com)                   │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              ControllerBackend (Port 4000)          │
│          https://geekquote-controller.onrender.com  │
│                                                      │
│  Routes requests to specialized backends:           │
│  • /api/web-dev → WebDevelopmentBackend            │
│  • /api/email → Email Service                      │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌──────────────┐   ┌──────────────┐
│WebDevelopment│   │    Email     │
│   Backend    │   │   Service    │
│  (Port 3000) │   │              │
├──────────────┤   ├──────────────┤
│• MCP Tools   │   │• Contact Form│
│• Database    │   │• Quote Email │
│• AI Pricing  │   │              │
└──────────────┘   └──────────────┘
```

## 📦 Components

All components use the `geek-` prefix for consistency:

| Component | Selector | Purpose |
|-----------|----------|---------|
| NavbarComponent | `geek-navbar` | Site navigation with hamburger menu |
| SidebarComponent | `geek-sidebar` | Mobile sidebar navigation |
| FrontPageHeroComponent | `geek-hero-main` | Main landing page hero |
| HeroComponent | `geek-hero` | Reusable hero component |
| GeekQuoteAiComponent | `geek-quote-ai` | AI-powered quote generation |
| GeekQuoteModalComponent | `geek-quote-modal` | Quote conversation modal |
| GeekContactModalComponent | `geek-contact-modal` | Contact form modal |
| ServicesGridComponent | `geek-services-grid` | 20-service grid display |
| ServicesDetailComponent | `geek-services-detail` | Detailed service pages |
| CtaComponent | `geek-cta` | Call-to-action sections |

## 🛠️ Services

| Service | Purpose |
|---------|---------|
| ApiService | HTTP client for backend communication |
| GeekEmailService | Email form submission |
| GeekQuoteAiService | AI quote generation logic |
| GeekServicesBusinessLogicDataService | Services data (827 lines) |

## 🚀 Build & Deploy

### Development Build
```bash
cd ~/development/geek-at-your-spot-workspace
ng build geek-at-your-spot-component-library
ng build my-elements-app
```

### Output
Files generated in `dist/my-elements-app/browser/`:
- `main-[HASH].js` - Application bundle
- `styles-[HASH].css` - Styles

### WordPress Deployment
1. Upload files to WordPress:
   - `/wp-content/themes/geek-at-your-spot/js/main-[HASH].js`
   - `/wp-content/themes/geek-at-your-spot/css/styles-[HASH].css`

2. Update `functions.php` with new hashes:
```php
wp_enqueue_script(
    'geek-at-your-spot-elements',
    get_template_directory_uri() . '/js/main-[NEW-HASH].js',
    array(),
    null,
    true
);
```

3. Clear SiteGround Dynamic Cache
4. Hard refresh browser (Cmd+Shift+R)

## 🧪 Testing

### Email Functionality
- **Contact Modal**: Sends to `sales@geekatyourspot.com`
- **Quote Modal**: Sends to `geek-quote-ai@geekatyourspot.com`

### Component Registration
Custom elements are registered in `projects/my-elements-app/src/main.ts`:
```typescript
customElements.define('geek-navbar', geekNavbarElement);
customElements.define('geek-quote-ai', geekQuoteAiElement);
// etc...
```

## 📁 Project Structure
```
geek-at-your-spot-workspace/
├── projects/
│   ├── geek-at-your-spot-component-library/
│   │   ├── src/lib/
│   │   │   ├── geek-navbar/
│   │   │   ├── geek-quote-ai/
│   │   │   ├── geek-contact-modal/
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── geek-email-service.ts
│   │   │   │   ├── geek-quote-ai.service.ts
│   │   │   │   └── geek-services-business-logic-data.service.ts
│   │   │   └── [other components]
│   │   └── src/public-api.ts
│   └── my-elements-app/
│       └── src/main.ts
├── dist/
└── [WordPress theme files]
```

## 🔑 Environment Variables

Required in Render.com for backends:
- `ANTHROPIC_API_KEY` - Claude AI API key
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `EMAIL_SERVICE_API_KEY` - Email service credentials

## 🌐 Hosting

- **Frontend/WordPress**: SiteGround
- **Backend Services**: Render.com (free tier)
- **Database**: Supabase PostgreSQL (free tier)

## 📝 Coding Standards

1. **Component Naming**: All selectors use `geek-` prefix
2. **Service Location**: All services in `/lib/services/`
3. **Standalone Components**: All components use `standalone: true`
4. **Exports**: All public components exported in `public-api.ts`
5. **Registration**: Web components registered in `main.ts`

## �� Troubleshooting

### Component Not Displaying
- Check selector matches custom element name
- Verify component is exported in `public-api.ts`
- Confirm registration in `main.ts`
- Clear browser cache

### Build Errors
- Ensure selectors match between component and template
- Check all imports are correct
- Verify services are injected properly

### Email Not Sending
- Check backend `/api/email` endpoint is running
- Verify email service credentials in environment variables
- Check browser console for errors

## 📊 Current Build

Latest commit: `5d4f2d7` - Major refactoring complete
- All components standardized with `geek-` prefix
- Services consolidated
- Dialog replaced with Bootstrap modals
- Email functionality tested and working

## �� Future Enhancements

**Planned Backend Services:**
- AIBusinessAnalyticsBackend (Port 5001)
- MarketingBackend (Port 5002)
- WebsiteAnalyticsBackend (Port 5003)

**Frontend Improvements:**
- Additional reusable components
- Enhanced animations
- Progressive Web App features

## 📞 Support

For questions or issues, contact: jeff@geekatyourspot.com
