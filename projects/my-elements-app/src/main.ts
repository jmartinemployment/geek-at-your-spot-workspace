import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';

import { GeekQuoteAiComponent } from 'geek-at-your-spot-component-library';
import { ServicesGridComponent } from 'geek-at-your-spot-component-library';
import { ServicesDetailComponent } from 'geek-at-your-spot-component-library';
import { NavbarComponent } from 'geek-at-your-spot-component-library';
import { GeekPongComponent } from 'geek-at-your-spot-component-library';
import { GeekBannerComponent } from 'geek-at-your-spot-component-library';
import { GeekJourneyBannerComponent } from 'geek-at-your-spot-component-library';
import { GeekReusableBannerComponent } from 'geek-at-your-spot-component-library';
import { GeekFortyYearsBannerComponent } from 'geek-at-your-spot-component-library';
import { GeekMissionBannerComponent} from 'geek-at-your-spot-component-library';
import { GeekFrontPageHeroComponent} from 'geek-at-your-spot-component-library';
import { GeekServicesHeroComponent} from 'geek-at-your-spot-component-library';
import { GeekAboutHeroComponent} from 'geek-at-your-spot-component-library';
import { GeekFooterComponent} from 'geek-at-your-spot-component-library';
import { appConfig } from './app/app.config';

(async () => {
  const app = await createApplication(appConfig);

  // Register Navbar
  const geekNavbarElement = createCustomElement(NavbarComponent, {
    injector: app.injector,
  });
  customElements.define('geek-navbar', geekNavbarElement);

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

  // Register Pong Game
  const geekPongElement = createCustomElement(GeekPongComponent, {
    injector: app.injector,
  });
  customElements.define('geek-pong', geekPongElement);

  // Register Banner Component
  const geekBannerElement = createCustomElement(GeekBannerComponent, {
    injector: app.injector,
  });
  customElements.define('geek-banner', geekBannerElement);
    // Register Banner Component
  const geekJourneyBannerElement = createCustomElement(GeekJourneyBannerComponent, {
    injector: app.injector,
  });
  customElements.define('geek-journey-banner', geekJourneyBannerElement);

  const geekReusableBannerElement = createCustomElement(GeekReusableBannerComponent, {
    injector: app.injector,
  });
  customElements.define('geek-reusable-banner', geekReusableBannerElement);

  const geekFortyYearsBannerElement = createCustomElement(GeekFortyYearsBannerComponent, {
    injector: app.injector,
  });
  customElements.define('geek-forty-years-banner', geekFortyYearsBannerElement);

    const geekMissionBannerElement = createCustomElement(GeekMissionBannerComponent, {
    injector: app.injector,
  });
  customElements.define('geek-mission-banner', geekMissionBannerElement);

    const geekFrontPageHeroElement = createCustomElement(GeekFrontPageHeroComponent, {
    injector: app.injector,
  });
  customElements.define('geek-front-page-hero', geekFrontPageHeroElement);

      const geekServicesHeroElement = createCustomElement(GeekServicesHeroComponent, {
    injector: app.injector,
  });
  customElements.define('geek-services-page-hero', geekServicesHeroElement);

  const geekAboutHeroElement = createCustomElement(GeekAboutHeroComponent, {
    injector: app.injector,
  });
  customElements.define('geek-about-hero', geekAboutHeroElement);

  const geekFooterElement = createCustomElement(GeekFooterComponent, {
    injector: app.injector,
  });
  customElements.define('geek-footer', geekFooterElement);

  console.log('Custom elements registered: geek-navbar, geek-hero-main, geek-hero, geek-quote-ai, geek-services-grid, geek-services-detail, geek-about-page, geek-pong, geek-banner');
})();
