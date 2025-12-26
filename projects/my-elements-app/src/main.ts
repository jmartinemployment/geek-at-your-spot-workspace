import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { FrontPageHeroComponent } from 'geek-at-your-spot-component-library';
import { GeekQuoteAiComponent } from 'geek-at-your-spot-component-library';
import { ServicesComponent } from 'geek-at-your-spot-component-library';
import { ServicesDetailComponent } from 'geek-at-your-spot-component-library';
import { appConfig } from './app/app.config';

(async () => {
  const app = await createApplication(appConfig);

  // Register FrontPageHero
  const frontPageHeroElement = createCustomElement(FrontPageHeroComponent, {
    injector: app.injector,
  });
  customElements.define('front-page-hero', frontPageHeroElement);

  // Register GeekQuoteAi
  const geekQuoteElement = createCustomElement(GeekQuoteAiComponent, {
    injector: app.injector,
  });
  customElements.define('geek-quote-ai', geekQuoteElement);

  // Register Services (overview with cards)
  const servicesElement = createCustomElement(ServicesComponent, {
    injector: app.injector,
  });
  customElements.define('geek-services', servicesElement);

  // Register ServicesDetail (animated detail page)
  const servicesDetailElement = createCustomElement(ServicesDetailComponent, {
    injector: app.injector,
  });
  customElements.define('geek-services-detail', servicesDetailElement);

  console.log('Custom elements registered: front-page-hero, geek-quote-ai, geek-services, geek-services-detail');
})();
