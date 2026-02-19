<!DOCTYPE html>
<html lang="en"
  style="background-color: white;overflow-x: hidden;padding: 0;margin: 0;height: auto;width: 100%;scroll-behavior: smooth;">

<head>
  <base href="/">

  <!-- Consent Mode v2 defaults + GTM -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    // EEA + UK + CH + EEA-adjacent: default denied (Advanced mode — cookieless pings still fire)
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR',
                 'DE','GR','HU','IE','IT','LV','LT','LU','MT','NL',
                 'PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']
    });
    // All other regions: default granted
    gtag('consent', 'default', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });

    // --- Consent utility functions ---
    function geekGetConsent() {
      var match = document.cookie.match('(?:^|; )geek_consent=([^;]*)');
      if (!match) return null;
      try { return JSON.parse(decodeURIComponent(match[1])); }
      catch(e) { return null; }
    }

    function geekSetConsent(prefs) {
      gtag('consent', 'update', prefs);
      var expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = 'geek_consent=' + encodeURIComponent(JSON.stringify(prefs))
        + ';expires=' + expires + ';path=/;SameSite=Lax';
      var banner = document.getElementById('geek-consent-banner');
      if (banner) banner.style.display = 'none';
    }

    function geekAcceptAll() {
      geekSetConsent({
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }

    function geekRejectAll() {
      geekSetConsent({
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }

    // Restore consent from cookie (runs before GTM loads)
    (function() {
      var saved = geekGetConsent();
      if (saved) {
        gtag('consent', 'update', saved);
      }
    })();
  </script>

  <!-- Google Tag Manager -->
  <script>(function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-K5CXSQRP');</script>
  <!-- End Google Tag Manager -->

  <!-- Consent Banner Styles -->
  <style>
    #geek-consent-banner {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100000;
      background: #1a1a2e;
      color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
      transform: translateY(100%);
      animation: geekSlideUp 0.4s ease-out forwards;
    }
    @keyframes geekSlideUp {
      to { transform: translateY(0); }
    }
    .geek-consent-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .geek-consent-text {
      flex: 1 1 400px;
      font-size: 0.925rem;
      line-height: 1.5;
    }
    .geek-consent-text a {
      color: #7c6dfa;
      text-decoration: underline;
    }
    .geek-consent-text a:hover {
      color: #a89bff;
    }
    .geek-consent-actions {
      display: flex;
      gap: 0.75rem;
      flex-shrink: 0;
      flex-wrap: wrap;
    }
    .geek-consent-btn {
      padding: 0.6rem 1.5rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      white-space: nowrap;
    }
    .geek-consent-btn-accept {
      background: #28a745;
      color: #fff;
    }
    .geek-consent-btn-accept:hover {
      background: #218838;
      box-shadow: 0 2px 8px rgba(40,167,69,0.4);
    }
    .geek-consent-btn-reject {
      background: transparent;
      color: #e0e0e0;
      border: 1.5px solid #555;
    }
    .geek-consent-btn-reject:hover {
      border-color: #888;
      color: #fff;
    }
    @media (max-width: 600px) {
      .geek-consent-inner {
        flex-direction: column;
        text-align: center;
        padding: 1rem;
      }
      .geek-consent-actions {
        width: 100%;
        justify-content: center;
      }
    }
  </style>

  <meta charset="UTF-8">
  <meta name="author" content="Geek at Your Spot">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" <?php wp_head(); ?> </head>

<!-- Consent Banner -->
<div id="geek-consent-banner" role="dialog" aria-label="Cookie consent">
  <div class="geek-consent-inner">
    <div class="geek-consent-text">
      We use cookies to improve your experience and analyze site traffic.
      <a href="/cookie-policy/">Manage Preferences</a>
    </div>
    <div class="geek-consent-actions">
      <button class="geek-consent-btn geek-consent-btn-accept" onclick="geekAcceptAll()">Accept All</button>
      <button class="geek-consent-btn geek-consent-btn-reject" onclick="geekRejectAll()">Reject All</button>
    </div>
  </div>
</div>
<script>
  // Show banner only if no consent cookie exists
  document.addEventListener('DOMContentLoaded', function() {
    if (!geekGetConsent()) {
      var banner = document.getElementById('geek-consent-banner');
      if (banner) banner.style.display = 'block';
    }
  });
</script>