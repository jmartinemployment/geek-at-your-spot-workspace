import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { FrontPageHeroComponent } from 'geek-at-your-spot-component-library';
import { GeekQuoteAiComponent } from 'geek-at-your-spot-component-library';
import { ServicesComponent } from 'geek-at-your-spot-component-library';
import { ServicesGridComponent } from 'geek-at-your-spot-component-library';
import { ServicesDetailComponent } from 'geek-at-your-spot-component-library';
import { HeroComponent } from 'geek-at-your-spot-component-library';
import { Navbar } from 'geek-at-your-spot-component-library';
import { appConfig } from './app/app.config';

(async () => {
  const app = await createApplication(appConfig);

  // Register Navbar
  const appNavbarElement = createCustomElement(Navbar, {
    injector: app.injector,
  });
  customElements.define('app-navbar', appNavbarElement);

  // Register Hero
  const appHeroElement = createCustomElement(FrontPageHeroComponent, {
    injector: app.injector,
  });
  customElements.define('app-hero', appHeroElement);

  // Register Reusable Hero
  const geekHeroElement = createCustomElement(HeroComponent, {
    injector: app.injector,
  });
  customElements.define('geek-hero', geekHeroElement);

  // Register Quote AI
  const appGeekQuoteElement = createCustomElement(GeekQuoteAiComponent, {
    injector: app.injector,
  });
  customElements.define('app-geek-quote-ai', appGeekQuoteElement);

  // Register Services (3-card version)
  const appServicesOfferedElement = createCustomElement(ServicesComponent, {
    injector: app.injector,
  });
  customElements.define('app-services-offered', appServicesOfferedElement);

  // Register Services Grid (20-service grid)
  const appServicesGridElement = createCustomElement(ServicesGridComponent, {
    injector: app.injector,
  });
  customElements.define('app-services-grid', appServicesGridElement);

  // Register Services Detail
  const geekServicesDetailElement = createCustomElement(ServicesDetailComponent, {
    injector: app.injector,
  });
  customElements.define('geek-services-detail', geekServicesDetailElement);

  console.log('Custom elements registered: app-navbar, app-hero, geek-hero, app-geek-quote-ai, app-services-offered, app-services-grid, geek-services-detail');
})();
