import 'zone.js'; // Required for Safari compatibility
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
// Import the correct class names based on the type definitions
import { Navbar, FrontPageHeroComponent, ServicesOffered, GeekQuoteAiComponent, GEEK_QUOTE_AI_CONFIG } from 'geek-at-your-spot-component-library';

(async () => {
  const app = await createApplication({
    providers: [
      {
        provide: GEEK_QUOTE_AI_CONFIG,
        useValue: {
          apiUrl: 'http://localhost:3000/api/chat',
          apiKey: 'm9rBdZs8xe1h5omHTNGnVismQB0lywnsYlhFWtj6sqk='
        }
      }
    ] // Use zone.js-based change detection for Safari compatibility
  });

  // Use Navbar (not NavbarComponent)
  const navbarElement = createCustomElement(Navbar, {
    injector: app.injector
  });

  // Use FrontPageHeroComponent
  const heroElement = createCustomElement(FrontPageHeroComponent, {
    injector: app.injector
  });
    // Use ServicesOfferedComponent
  const servicesOfferedElement = createCustomElement(ServicesOffered, {
    injector: app.injector
  });
      // Use GeekQuoteAIComponent
const quoteAiElement = createCustomElement(GeekQuoteAiComponent, {
  injector: app.injector
});

  // Register as custom HTML elements
  customElements.define('app-navbar', navbarElement);
  customElements.define('app-hero', heroElement);
  customElements.define('app-services-offered', servicesOfferedElement );
  customElements.define('app-geek-quote-ai', quoteAiElement);
  console.log('Angular Elements registered!');
})();
