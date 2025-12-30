import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { FrontPageHeroComponent } from 'geek-at-your-spot-component-library';
import { GeekQuoteAiComponent } from 'geek-at-your-spot-component-library';
import { ServicesGridComponent } from 'geek-at-your-spot-component-library';
import { ServicesDetailComponent } from 'geek-at-your-spot-component-library';
import { HeroComponent } from 'geek-at-your-spot-component-library';
import { NavbarComponent } from 'geek-at-your-spot-component-library';
import { appConfig } from './app/app.config';

(async () => {
  const app = await createApplication(appConfig);

  // Register Navbar
  const geekNavbarElement = createCustomElement(NavbarComponent, {
    injector: app.injector,
  });
  customElements.define('geek-navbar', geekNavbarElement);

  // Register Front Page Hero (main hero)
  const geekHeroMainElement = createCustomElement(FrontPageHeroComponent, {
    injector: app.injector,
  });
  customElements.define('geek-hero-main', geekHeroMainElement);

  // Register Reusable Hero
  const geekHeroElement = createCustomElement(HeroComponent, {
    injector: app.injector,
  });
  customElements.define('geek-hero', geekHeroElement);

  // Register Quote AI
  const geekQuoteAiElement = createCustomElement(GeekQuoteAiComponent, {
    injector: app.injector,
  });
  customElements.define('geek-quote-ai', geekQuoteAiElement);

  // Register Services Grid (20-service grid)
  const geekServicesGridElement = createCustomElement(ServicesGridComponent, {
    injector: app.injector,
  });
  customElements.define('geek-services-grid', geekServicesGridElement);

  // Register Services Detail
  const geekServicesDetailElement = createCustomElement(ServicesDetailComponent, {
    injector: app.injector,
  });
  customElements.define('geek-services-detail', geekServicesDetailElement);

  console.log('Custom elements registered: geek-navbar, geek-hero-main, geek-hero, geek-quote-ai, geek-services-grid, geek-services-detail');
})();
