<?php
/* Template Name: Cookie Policy Page */
get_header();
?>

<body
  style="background-color:white;overflow-x: hidden;padding: 0;margin: 0;height:auto;width:100%;scroll-behavior: smooth;">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K5CXSQRP" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <header>
    <geek-navbar></geek-navbar>
  </header>

  <style>
    .cookie-policy {
      padding-top: 5rem;
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
      color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .cookie-policy-inner {
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem 1.5rem 4rem;
    }
    .cookie-policy h1 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.5rem;
    }
    .cookie-policy .updated-date {
      font-size: 0.875rem;
      color: #888;
      margin-bottom: 2.5rem;
    }
    .cookie-policy h2 {
      font-size: 1.35rem;
      font-weight: 600;
      color: #fff;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
    }
    .cookie-policy p, .cookie-policy li {
      font-size: 0.95rem;
      line-height: 1.7;
      color: #ccc;
    }
    .cookie-policy ul {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .cookie-policy a {
      color: #7c6dfa;
      text-decoration: underline;
    }
    .cookie-policy a:hover {
      color: #a89bff;
    }

    /* Category cards */
    .cookie-category {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 1.5rem;
      margin-bottom: 1.25rem;
    }
    .cookie-category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .cookie-category-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
    }
    .cookie-category-badge {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-weight: 600;
    }
    .badge-always-on {
      background: rgba(40,167,69,0.2);
      color: #5dd879;
    }
    .cookie-category p {
      margin: 0;
      font-size: 0.875rem;
    }

    /* Toggle switch */
    .cookie-toggle {
      position: relative;
      width: 48px;
      height: 26px;
      flex-shrink: 0;
    }
    .cookie-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .cookie-toggle-slider {
      position: absolute;
      inset: 0;
      background: #444;
      border-radius: 26px;
      cursor: pointer;
      transition: background 0.25s;
    }
    .cookie-toggle-slider::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      left: 3px;
      bottom: 3px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.25s;
    }
    .cookie-toggle input:checked + .cookie-toggle-slider {
      background: #28a745;
    }
    .cookie-toggle input:checked + .cookie-toggle-slider::before {
      transform: translateX(22px);
    }

    /* Action buttons */
    .cookie-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
    .cookie-btn {
      padding: 0.7rem 1.75rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background 0.2s, box-shadow 0.2s;
    }
    .cookie-btn-save {
      background: #7c6dfa;
      color: #fff;
    }
    .cookie-btn-save:hover {
      background: #6b5ce7;
      box-shadow: 0 2px 10px rgba(124,109,250,0.4);
    }
    .cookie-btn-accept {
      background: #28a745;
      color: #fff;
    }
    .cookie-btn-accept:hover {
      background: #218838;
      box-shadow: 0 2px 8px rgba(40,167,69,0.4);
    }
    .cookie-btn-reject {
      background: transparent;
      color: #ccc;
      border: 1.5px solid #555;
    }
    .cookie-btn-reject:hover {
      border-color: #888;
      color: #fff;
    }

    /* Status indicator */
    .cookie-status {
      margin-top: 2rem;
      padding: 1rem 1.25rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      font-size: 0.85rem;
    }
    .cookie-status-title {
      font-weight: 600;
      color: #fff;
      margin-bottom: 0.5rem;
    }
    .cookie-status-row {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0;
    }
    .cookie-status-label {
      color: #999;
    }
    .cookie-status-value {
      font-weight: 600;
    }
    .status-granted {
      color: #5dd879;
    }
    .status-denied {
      color: #e06060;
    }

    @media (max-width: 600px) {
      .cookie-policy-inner {
        padding: 2rem 1rem 3rem;
      }
      .cookie-policy h1 {
        font-size: 1.75rem;
      }
      .cookie-actions {
        flex-direction: column;
      }
      .cookie-btn {
        width: 100%;
        text-align: center;
      }
    }
  </style>

  <main>
    <div class="cookie-policy">
      <div class="cookie-policy-inner">
        <h1>Cookie Policy</h1>
        <p class="updated-date">Last updated: February 19, 2026</p>

        <p>
          Geek At Your Spot ("we", "us") uses cookies and similar technologies on
          <strong>geekatyourspot.com</strong> to improve your browsing experience, analyze
          site traffic, and support our advertising efforts. This page explains what
          cookies we use and lets you control your preferences.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website.
          They help the site remember your preferences and understand how you interact
          with it. Some cookies are essential for the site to function; others help us
          improve our services.
        </p>

        <h2>Cookie Categories</h2>

        <!-- Essential -->
        <div class="cookie-category">
          <div class="cookie-category-header">
            <span class="cookie-category-title">Essential Cookies</span>
            <span class="cookie-category-badge badge-always-on">Always On</span>
          </div>
          <p>
            Required for the site to function. These handle WordPress sessions,
            security tokens (CSRF), and your cookie consent preference. They cannot
            be disabled.
          </p>
        </div>

        <!-- Analytics -->
        <div class="cookie-category">
          <div class="cookie-category-header">
            <span class="cookie-category-title">Analytics Cookies</span>
            <label class="cookie-toggle">
              <input type="checkbox" id="toggle-analytics">
              <span class="cookie-toggle-slider"></span>
            </label>
          </div>
          <p>
            Used by Google Analytics 4 (GA4) to understand how visitors use the site —
            pages visited, time on site, and traffic sources. This data helps us improve
            the site experience. No personally identifiable information is collected.
          </p>
        </div>

        <!-- Advertising -->
        <div class="cookie-category">
          <div class="cookie-category-header">
            <span class="cookie-category-title">Advertising Cookies</span>
            <label class="cookie-toggle">
              <input type="checkbox" id="toggle-advertising">
              <span class="cookie-toggle-slider"></span>
            </label>
          </div>
          <p>
            Used by Google Ads for remarketing audiences and ad personalization.
            These cookies allow us to show relevant ads to people who have visited
            our site, and to measure ad campaign effectiveness.
          </p>
        </div>

        <!-- Action buttons -->
        <div class="cookie-actions">
          <button class="cookie-btn cookie-btn-save" onclick="cookiePolicySave()">Save Preferences</button>
          <button class="cookie-btn cookie-btn-accept" onclick="cookiePolicyAcceptAll()">Accept All</button>
          <button class="cookie-btn cookie-btn-reject" onclick="cookiePolicyRejectAll()">Reject All</button>
        </div>

        <!-- Current status -->
        <div class="cookie-status" id="cookie-status">
          <div class="cookie-status-title">Current Consent Status</div>
          <div class="cookie-status-row">
            <span class="cookie-status-label">Analytics</span>
            <span class="cookie-status-value" id="status-analytics">—</span>
          </div>
          <div class="cookie-status-row">
            <span class="cookie-status-label">Ad Storage</span>
            <span class="cookie-status-value" id="status-ad-storage">—</span>
          </div>
          <div class="cookie-status-row">
            <span class="cookie-status-label">Ad User Data</span>
            <span class="cookie-status-value" id="status-ad-user-data">—</span>
          </div>
          <div class="cookie-status-row">
            <span class="cookie-status-label">Ad Personalization</span>
            <span class="cookie-status-value" id="status-ad-personalization">—</span>
          </div>
        </div>

        <h2>How to Change Your Preferences</h2>
        <p>
          Use the toggles above to change your cookie preferences at any time.
          You can also clear your browser cookies to reset all consent choices —
          the consent banner will reappear on your next visit.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about our cookie practices, contact us at
          <a href="mailto:contact@geekatyourspot.com">contact@geekatyourspot.com</a>.
        </p>
      </div>
    </div>
  </main>

  <script>
    function updateStatusDisplay(prefs) {
      var fields = [
        ['status-analytics', 'analytics_storage'],
        ['status-ad-storage', 'ad_storage'],
        ['status-ad-user-data', 'ad_user_data'],
        ['status-ad-personalization', 'ad_personalization']
      ];
      for (var i = 0; i < fields.length; i++) {
        var el = document.getElementById(fields[i][0]);
        if (!el) continue;
        var val = prefs ? prefs[fields[i][1]] : null;
        if (val === 'granted') {
          el.textContent = 'Granted';
          el.className = 'cookie-status-value status-granted';
        } else if (val === 'denied') {
          el.textContent = 'Denied';
          el.className = 'cookie-status-value status-denied';
        } else {
          el.textContent = 'Not set';
          el.className = 'cookie-status-value';
        }
      }
    }

    function setTogglesFromPrefs(prefs) {
      var analyticsToggle = document.getElementById('toggle-analytics');
      var adToggle = document.getElementById('toggle-advertising');
      if (analyticsToggle) analyticsToggle.checked = prefs && prefs.analytics_storage === 'granted';
      if (adToggle) adToggle.checked = prefs && prefs.ad_storage === 'granted';
    }

    function buildPrefsFromToggles() {
      var analyticsToggle = document.getElementById('toggle-analytics');
      var adToggle = document.getElementById('toggle-advertising');
      var analyticsVal = (analyticsToggle && analyticsToggle.checked) ? 'granted' : 'denied';
      var adVal = (adToggle && adToggle.checked) ? 'granted' : 'denied';
      return {
        analytics_storage: analyticsVal,
        ad_storage: adVal,
        ad_user_data: adVal,
        ad_personalization: adVal
      };
    }

    function cookiePolicySave() {
      var prefs = buildPrefsFromToggles();
      geekSetConsent(prefs);
      updateStatusDisplay(prefs);
    }

    function cookiePolicyAcceptAll() {
      geekAcceptAll();
      var prefs = geekGetConsent();
      setTogglesFromPrefs(prefs);
      updateStatusDisplay(prefs);
    }

    function cookiePolicyRejectAll() {
      geekRejectAll();
      var prefs = geekGetConsent();
      setTogglesFromPrefs(prefs);
      updateStatusDisplay(prefs);
    }

    // Update status display live as toggles change
    function onToggleChange() {
      updateStatusDisplay(buildPrefsFromToggles());
    }

    // Initialize on load
    document.addEventListener('DOMContentLoaded', function() {
      var saved = geekGetConsent();
      setTogglesFromPrefs(saved);
      updateStatusDisplay(saved);

      document.getElementById('toggle-analytics').addEventListener('change', onToggleChange);
      document.getElementById('toggle-advertising').addEventListener('change', onToggleChange);
    });
  </script>

  <?php
  get_footer();
  ?>
