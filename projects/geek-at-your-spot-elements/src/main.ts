import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';

import {
  GeekNavbarComponent,
  GeekFooterComponent,
  GeekHomeHeroComponent,
  GeekTrustBarComponent,
  GeekServicesHighlightComponent,
  GeekAboutTeaserComponent,
  GeekHomeCTAComponent,
  GeekQuoteAiComponent,
  GeekAboutHeroComponent,
  GeekServicesPageHeroComponent,
  GeekServicesDetailComponent,
  GeekPongComponent,
  GeekMissionBannerComponent,
  GeekFortyYearsBannerComponent,
} from 'geek-at-your-spot-component-library';

(async () => {
  const app = await createApplication(appConfig);

  const navbarElement = createCustomElement(GeekNavbarComponent, { injector: app.injector });
  customElements.define('geek-navbar', navbarElement);

  const footerElement = createCustomElement(GeekFooterComponent, { injector: app.injector });
  customElements.define('geek-footer', footerElement);

  const homeHeroElement = createCustomElement(GeekHomeHeroComponent, { injector: app.injector });
  customElements.define('geek-home-hero', homeHeroElement);

  const trustBarElement = createCustomElement(GeekTrustBarComponent, { injector: app.injector });
  customElements.define('geek-trust-bar', trustBarElement);

  const servicesHighlightElement = createCustomElement(GeekServicesHighlightComponent, { injector: app.injector });
  customElements.define('geek-services-highlight', servicesHighlightElement);

  const aboutTeaserElement = createCustomElement(GeekAboutTeaserComponent, { injector: app.injector });
  customElements.define('geek-about-teaser', aboutTeaserElement);

  const homeCTAElement = createCustomElement(GeekHomeCTAComponent, { injector: app.injector });
  customElements.define('geek-home-cta', homeCTAElement);

  const quoteAiElement = createCustomElement(GeekQuoteAiComponent, { injector: app.injector });
  customElements.define('geek-quote-ai', quoteAiElement);

  const aboutHeroElement = createCustomElement(GeekAboutHeroComponent, { injector: app.injector });
  customElements.define('geek-about-hero', aboutHeroElement);

  const servicesPageHeroElement = createCustomElement(GeekServicesPageHeroComponent, { injector: app.injector });
  customElements.define('geek-services-page-hero', servicesPageHeroElement);

  const servicesDetailElement = createCustomElement(GeekServicesDetailComponent, { injector: app.injector });
  customElements.define('geek-services-detail', servicesDetailElement);

  const pongElement = createCustomElement(GeekPongComponent, { injector: app.injector });
  customElements.define('geek-pong', pongElement);

  const missionBannerElement = createCustomElement(GeekMissionBannerComponent, { injector: app.injector });
  customElements.define('geek-mission-banner', missionBannerElement);

  const fortyYearsBannerElement = createCustomElement(GeekFortyYearsBannerComponent, { injector: app.injector });
  customElements.define('geek-forty-years-banner', fortyYearsBannerElement);

  console.log('Geek-At-Your-Spot elements registered: geek-navbar, geek-footer, geek-home-hero, geek-trust-bar, geek-services-highlight, geek-about-teaser, geek-home-cta, geek-quote-ai, geek-about-hero, geek-services-page-hero, geek-services-detail, geek-pong, geek-mission-banner, geek-forty-years-banner');
})();
