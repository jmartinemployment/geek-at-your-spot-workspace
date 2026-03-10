<?php
/*
Template Name: OrderStack Signup
*/
get_header();
?>

<body style="background-color:#f7f8fa;overflow-x:hidden;padding:0;margin:0;height:auto;width:100%;scroll-behavior:smooth;">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K5CXSQRP" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <header>
    <geek-navbar></geek-navbar>
  </header>

  <main style="padding-top: 6rem; padding-bottom: 3rem; min-height: 100vh;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12" style="max-width: 540px;">

          <!-- Brand -->
          <div class="text-center mb-4">
            <h1 class="os-signup-brand">Order<span>Stack</span></h1>
            <p class="os-signup-subtitle">Start your free 14-day trial</p>
          </div>

          <!-- Card -->
          <div class="os-signup-card">
            <form id="signupForm" novalidate>

              <!-- Section: Account -->
              <h2 class="os-signup-section-title">Your Account</h2>
              <div class="row g-3">
                <div class="col-6">
                  <label for="firstName" class="os-signup-label">First name</label>
                  <input type="text" id="firstName" class="os-signup-input" autocomplete="given-name" required>
                  <div class="os-signup-error" id="firstNameError"></div>
                </div>
                <div class="col-6">
                  <label for="lastName" class="os-signup-label">Last name</label>
                  <input type="text" id="lastName" class="os-signup-input" autocomplete="family-name" required>
                  <div class="os-signup-error" id="lastNameError"></div>
                </div>
                <div class="col-12">
                  <label for="email" class="os-signup-label">Email</label>
                  <input type="email" id="email" class="os-signup-input" autocomplete="email" required>
                  <div class="os-signup-error" id="emailError"></div>
                </div>
                <div class="col-12">
                  <label for="password" class="os-signup-label">Password</label>
                  <div class="os-signup-password-wrap">
                    <input type="password" id="password" class="os-signup-input" autocomplete="new-password" required>
                    <button type="button" class="os-signup-toggle-pw" aria-label="Show password" onclick="togglePassword('password', this)">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C4.5 4 1 10 1 10s3.5 6 9 6 9-6 9-6-3.5-6-9-6z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                    </button>
                  </div>
                  <div class="os-signup-strength" id="strengthMeter">
                    <div class="os-signup-strength-bar" id="strengthBar"></div>
                  </div>
                  <div class="os-signup-strength-text" id="strengthText"></div>
                  <div class="os-signup-error" id="passwordError"></div>
                </div>
                <div class="col-12">
                  <label for="confirmPassword" class="os-signup-label">Confirm password</label>
                  <div class="os-signup-password-wrap">
                    <input type="password" id="confirmPassword" class="os-signup-input" autocomplete="new-password" required>
                    <button type="button" class="os-signup-toggle-pw" aria-label="Show password" onclick="togglePassword('confirmPassword', this)">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C4.5 4 1 10 1 10s3.5 6 9 6 9-6 9-6-3.5-6-9-6z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                    </button>
                  </div>
                  <div class="os-signup-error" id="confirmPasswordError"></div>
                </div>
              </div>

              <!-- Section: Business -->
              <div class="os-signup-divider my-4"></div>
              <h2 class="os-signup-section-title">Your Business</h2>
              <div class="row g-3">
                <div class="col-12">
                  <label for="businessName" class="os-signup-label">Business name</label>
                  <input type="text" id="businessName" class="os-signup-input" required>
                  <div class="os-signup-error" id="businessNameError"></div>
                </div>
                <div class="col-12">
                  <label for="businessType" class="os-signup-label">Business type</label>
                  <select id="businessType" class="os-signup-select" required>
                    <option value="" disabled selected>Select your business type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="cafe">Café</option>
                    <option value="food_truck">Food Truck</option>
                    <option value="catering">Catering</option>
                    <option value="other">Other</option>
                  </select>
                  <div class="os-signup-error" id="businessTypeError"></div>
                </div>
                <div class="col-12">
                  <label for="phone" class="os-signup-label">Phone number</label>
                  <input type="tel" id="phone" class="os-signup-input" autocomplete="tel" placeholder="(555) 555-5555" required>
                  <div class="os-signup-error" id="phoneError"></div>
                </div>
                <div class="col-12">
                  <label for="streetAddress" class="os-signup-label">Street address</label>
                  <input type="text" id="streetAddress" class="os-signup-input" autocomplete="street-address" required>
                  <div class="os-signup-error" id="streetAddressError"></div>
                </div>
                <div class="col-12">
                  <label for="suite" class="os-signup-label">Suite / Unit <span style="color:#9ca3af;font-weight:400;">(optional)</span></label>
                  <input type="text" id="suite" class="os-signup-input">
                </div>
                <div class="col-5">
                  <label for="city" class="os-signup-label">City</label>
                  <input type="text" id="city" class="os-signup-input" autocomplete="address-level2" required>
                  <div class="os-signup-error" id="cityError"></div>
                </div>
                <div class="col-4">
                  <label for="state" class="os-signup-label">State</label>
                  <select id="state" class="os-signup-select" autocomplete="address-level1" required>
                    <option value="" disabled selected>Select</option>
                    <option value="AL">AL</option><option value="AK">AK</option><option value="AZ">AZ</option>
                    <option value="AR">AR</option><option value="CA">CA</option><option value="CO">CO</option>
                    <option value="CT">CT</option><option value="DE">DE</option><option value="FL">FL</option>
                    <option value="GA">GA</option><option value="HI">HI</option><option value="ID">ID</option>
                    <option value="IL">IL</option><option value="IN">IN</option><option value="IA">IA</option>
                    <option value="KS">KS</option><option value="KY">KY</option><option value="LA">LA</option>
                    <option value="ME">ME</option><option value="MD">MD</option><option value="MA">MA</option>
                    <option value="MI">MI</option><option value="MN">MN</option><option value="MS">MS</option>
                    <option value="MO">MO</option><option value="MT">MT</option><option value="NE">NE</option>
                    <option value="NV">NV</option><option value="NH">NH</option><option value="NJ">NJ</option>
                    <option value="NM">NM</option><option value="NY">NY</option><option value="NC">NC</option>
                    <option value="ND">ND</option><option value="OH">OH</option><option value="OK">OK</option>
                    <option value="OR">OR</option><option value="PA">PA</option><option value="RI">RI</option>
                    <option value="SC">SC</option><option value="SD">SD</option><option value="TN">TN</option>
                    <option value="TX">TX</option><option value="UT">UT</option><option value="VT">VT</option>
                    <option value="VA">VA</option><option value="WA">WA</option><option value="WV">WV</option>
                    <option value="WI">WI</option><option value="WY">WY</option><option value="DC">DC</option>
                  </select>
                  <div class="os-signup-error" id="stateError"></div>
                </div>
                <div class="col-3">
                  <label for="zip" class="os-signup-label">ZIP</label>
                  <input type="text" id="zip" class="os-signup-input" autocomplete="postal-code" maxlength="10" placeholder="33301" required>
                  <div class="os-signup-error" id="zipError"></div>
                </div>
              </div>

              <!-- Section: Payment -->
              <div class="os-signup-divider my-4"></div>
              <h2 class="os-signup-section-title">Start Your Free Trial</h2>
              <div class="os-signup-trial-banner">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1l2.39 4.84L18 6.71l-4 3.9.94 5.5L10 13.58 5.06 16.1 6 10.6l-4-3.9 5.61-.87L10 1z" fill="#006aff"/></svg>
                <div>
                  <strong>14-day free trial</strong>
                  <span>Cancel anytime. No charge today.</span>
                </div>
              </div>

              <!-- Terms -->
              <div class="os-signup-terms">
                <label class="os-signup-checkbox-label">
                  <input type="checkbox" id="termsCheckbox">
                  <span>I agree to the <a href="/terms-of-service/" target="_blank">Terms of Service</a> and <a href="/privacy-policy/" target="_blank">Privacy Policy</a></span>
                </label>
              </div>

              <!-- PayPal button — acts as submit -->
              <div class="os-signup-paypal-wrap mt-4" id="paypalWrap">
                <div id="paypal-button-container"></div>
                <div class="os-signup-paypal-overlay" id="paypalOverlay"></div>
              </div>
              <div class="os-signup-error" id="paypalError" style="text-align:center;"></div>

              <!-- Error display -->
              <div class="os-signup-api-error" id="apiError" style="display:none;"></div>

              <!-- Success overlay -->
              <div class="os-signup-success" id="successOverlay" style="display:none;">
                <div class="os-signup-success-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="#00c853" stroke-width="3" fill="none"/>
                    <path d="M20 33l8 8 16-16" stroke="#00c853" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </svg>
                </div>
                <h2 class="os-signup-section-title mt-3">You're all set!</h2>
                <p class="os-signup-subtitle">Redirecting you to set up your restaurant&hellip;</p>
                <div class="os-signup-spinner mt-3"></div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  </main>

  <?php get_footer(); ?>

  <!-- Styles -->
  <style>
    /* === Base === */
    .os-signup-brand {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }
    .os-signup-brand span { color: #006aff; }
    .os-signup-subtitle {
      color: #6b7280;
      font-size: 0.95rem;
      margin: 0.25rem 0 0;
    }

    /* === Card === */
    .os-signup-card {
      background: #fff;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
    }
    .os-signup-section-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 1rem;
    }

    /* === Form controls === */
    .os-signup-label {
      display: block;
      font-size: 0.82rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.35rem;
    }
    .os-signup-input,
    .os-signup-select {
      display: block;
      width: 100%;
      padding: 0.625rem 0.75rem;
      font-size: 0.9rem;
      color: #1a1a1a;
      background: #fff;
      border: 1.5px solid #d1d5db;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: inherit;
      -webkit-appearance: none;
    }
    .os-signup-select {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      padding-right: 2.25rem;
    }
    .os-signup-input:focus,
    .os-signup-select:focus {
      border-color: #006aff;
      box-shadow: 0 0 0 3px rgba(0,106,255,0.12);
    }
    .os-signup-input.invalid,
    .os-signup-select.invalid {
      border-color: #ef4444;
    }
    .os-signup-input.valid {
      border-color: #00c853;
    }
    .os-signup-error {
      font-size: 0.78rem;
      color: #ef4444;
      margin-top: 0.25rem;
      min-height: 1.1rem;
    }

    /* === Password toggle === */
    .os-signup-password-wrap {
      position: relative;
    }
    .os-signup-password-wrap .os-signup-input {
      padding-right: 2.75rem;
    }
    .os-signup-toggle-pw {
      position: absolute;
      right: 0.6rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: #9ca3af;
      line-height: 0;
    }
    .os-signup-toggle-pw:hover { color: #6b7280; }

    /* === Strength meter === */
    .os-signup-strength {
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      margin-top: 0.5rem;
      overflow: hidden;
    }
    .os-signup-strength-bar {
      height: 100%;
      width: 0;
      border-radius: 2px;
      transition: width 0.3s, background 0.3s;
    }
    .os-signup-strength-text {
      font-size: 0.75rem;
      margin-top: 0.2rem;
      min-height: 1rem;
    }

    /* === Divider === */
    .os-signup-divider {
      height: 1px;
      background: #e5e7eb;
    }

    /* === Trial banner === */
    .os-signup-trial-banner {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: #eff6ff;
      border-radius: 8px;
      margin-bottom: 1.25rem;
    }
    .os-signup-trial-banner strong {
      display: block;
      font-size: 0.88rem;
      color: #1a1a1a;
    }
    .os-signup-trial-banner span {
      font-size: 0.8rem;
      color: #6b7280;
    }

    /* === PayPal disabled overlay === */
    .os-signup-paypal-wrap {
      position: relative;
    }
    .os-signup-paypal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255,255,255,0.6);
      z-index: 10;
      cursor: not-allowed;
    }
    .os-signup-paypal-overlay.hidden {
      display: none;
    }

    /* === Terms === */
    .os-signup-terms {
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid #f3f4f6;
    }
    .os-signup-checkbox-label {
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
      font-size: 0.82rem;
      color: #6b7280;
      cursor: pointer;
    }
    .os-signup-checkbox-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin-top: 1px;
      accent-color: #006aff;
      flex-shrink: 0;
    }
    .os-signup-checkbox-label a { color: #006aff; }
    .os-signup-checkbox-label a:hover { text-decoration: underline; }

    /* === API error === */
    .os-signup-api-error {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #b91c1c;
      font-size: 0.85rem;
    }

    /* === Success === */
    .os-signup-success {
      text-align: center;
      padding: 2rem 0;
    }
    .os-signup-success-icon svg {
      animation: osCheckPop 0.5s ease;
    }
    @keyframes osCheckPop {
      0% { transform: scale(0); opacity: 0; }
      60% { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
    .os-signup-spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #e5e7eb;
      border-top-color: #006aff;
      border-radius: 50%;
      animation: osSpin 0.7s linear infinite;
      margin: 0 auto;
    }
    @keyframes osSpin { to { transform: rotate(360deg); } }

    /* === Responsive === */
    @media (max-width: 575.98px) {
      .os-signup-card { padding: 1.5rem 1.25rem; }
    }
  </style>

  <!-- Scripts -->
  <script>
    (function () {
      'use strict';

      // ── Config ──
      var API_URL = 'https://get-order-stack-restaurant-backend.onrender.com/api/onboarding/create';
      var APP_URL = 'http://localhost:4200'; // TODO: Update when deployed

      // ── State ──
      var isSubmitting = false;

      // ── Elements ──
      var $ = function (id) { return document.getElementById(id); };

      // ── Password strength ──
      var strengthRules = [
        { test: function (p) { return p.length >= 8; } },
        { test: function (p) { return /[A-Z]/.exec(p) !== null; } },
        { test: function (p) { return /[a-z]/.exec(p) !== null; } },
        { test: function (p) { return /\d/.exec(p) !== null; } },
        { test: function (p) { return /[!@#$%^&*()_+\-=\[\]{}|;:',.<>?\/]/.exec(p) !== null; } }
      ];

      function getPasswordStrength(pw) {
        if (!pw) return { score: 0, label: '', color: '' };
        var passed = 0;
        for (var i = 0; i < strengthRules.length; i++) {
          if (strengthRules[i].test(pw)) passed++;
        }
        if (passed <= 1) return { score: 20, label: 'Weak', color: '#ef4444' };
        if (passed === 2) return { score: 40, label: 'Weak', color: '#ef4444' };
        if (passed === 3) return { score: 60, label: 'Fair', color: '#f59e0b' };
        if (passed === 4) return { score: 80, label: 'Good', color: '#84cc16' };
        return { score: 100, label: 'Strong', color: '#00c853' };
      }

      function updateStrengthMeter() {
        var pw = $('password').value;
        var s = getPasswordStrength(pw);
        $('strengthBar').style.width = s.score + '%';
        $('strengthBar').style.background = s.color;
        $('strengthText').textContent = s.label;
        $('strengthText').style.color = s.color;
      }

      // ── Validation ──
      function validateField(id, condition, errorMsg) {
        var el = $(id);
        var errEl = $(id + 'Error');
        if (!el) return condition;
        if (condition) {
          el.classList.remove('invalid');
          el.classList.add('valid');
          if (errEl) errEl.textContent = '';
        } else {
          el.classList.remove('valid');
          el.classList.add('invalid');
          if (errEl) errEl.textContent = errorMsg;
        }
        return condition;
      }

      function clearValidation(id) {
        var el = $(id);
        var errEl = $(id + 'Error');
        if (el) { el.classList.remove('invalid', 'valid'); }
        if (errEl) { errEl.textContent = ''; }
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var phoneRegex = /^[\d()\-+.\s]{7,20}$/;
      var zipRegex = /^\d{5}(-\d{4})?$/;

      function isFormValid() {
        var fn = $('firstName').value.trim();
        var ln = $('lastName').value.trim();
        var em = $('email').value.trim();
        var pw = $('password').value;
        var cpw = $('confirmPassword').value;
        var s = getPasswordStrength(pw);
        var biz = $('businessName').value.trim();
        var type = $('businessType').value;
        var phone = $('phone').value.trim();
        var street = $('streetAddress').value.trim();
        var city = $('city').value.trim();
        var state = $('state').value;
        var zip = $('zip').value.trim();
        var terms = $('termsCheckbox').checked;

        return fn.length >= 2 && ln.length >= 2 &&
          emailRegex.exec(em) !== null && s.score === 100 &&
          cpw === pw && cpw.length > 0 &&
          biz.length >= 2 && type !== '' &&
          phoneRegex.exec(phone) !== null &&
          street.length >= 2 && city.length >= 2 &&
          state !== '' && zipRegex.exec(zip) !== null &&
          terms;
      }

      function validateAllWithErrors() {
        var fn = $('firstName').value.trim();
        var ln = $('lastName').value.trim();
        var em = $('email').value.trim();
        var pw = $('password').value;
        var cpw = $('confirmPassword').value;
        var s = getPasswordStrength(pw);
        var biz = $('businessName').value.trim();
        var type = $('businessType').value;
        var phone = $('phone').value.trim();
        var street = $('streetAddress').value.trim();
        var city = $('city').value.trim();
        var state = $('state').value;
        var zip = $('zip').value.trim();

        var ok = true;
        if (!validateField('firstName', fn.length >= 2, 'Enter at least 2 characters')) ok = false;
        if (!validateField('lastName', ln.length >= 2, 'Enter at least 2 characters')) ok = false;
        if (!validateField('email', emailRegex.exec(em) !== null, 'Enter a valid email address')) ok = false;
        if (!validateField('password', s.score === 100, 'Password must meet all strength requirements')) ok = false;
        if (!validateField('confirmPassword', cpw === pw && cpw.length > 0, 'Passwords do not match')) ok = false;
        if (!validateField('businessName', biz.length >= 2, 'Enter at least 2 characters')) ok = false;
        if (!validateField('businessType', type !== '', 'Select a business type')) ok = false;
        if (!validateField('phone', phoneRegex.exec(phone) !== null, 'Enter a valid phone number')) ok = false;
        if (!validateField('streetAddress', street.length >= 2, 'Enter your street address')) ok = false;
        if (!validateField('city', city.length >= 2, 'Enter your city')) ok = false;
        if (!validateField('state', state !== '', 'Select your state')) ok = false;
        if (!validateField('zip', zipRegex.exec(zip) !== null, 'Enter a valid ZIP code')) ok = false;
        return ok;
      }

      // ── Password toggle ──
      window.togglePassword = function (fieldId, btn) {
        var input = $(fieldId);
        if (input.type === 'password') {
          input.type = 'text';
          btn.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          btn.setAttribute('aria-label', 'Show password');
        }
      };

      // ── Phone formatting ──
      function formatPhone(value) {
        var digits = value.replaceAll(/\D/g, '');
        if (digits.length === 0) return '';
        if (digits.length <= 3) return '(' + digits;
        if (digits.length <= 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
        return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6, 10);
      }

      // ── PayPal init ──
      var paypalInitialized = false;
      function initPayPal() {
        if (paypalInitialized) return;
        if (typeof paypal === 'undefined') {
          setTimeout(initPayPal, 500);
          return;
        }
        paypalInitialized = true;
        paypal.Buttons({
          style: { shape: 'rect', color: 'gold', layout: 'vertical' },
          onClick: function (data, actions) {
            // Validate form before PayPal opens
            if (!isFormValid()) {
              validateAllWithErrors();
              var firstErr = document.querySelector('.os-signup-input.invalid, .os-signup-select.invalid');
              if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
              if (!$('termsCheckbox').checked) {
                $('paypalError').textContent = 'You must agree to the Terms of Service.';
              }
              return actions.reject();
            }
            $('paypalError').textContent = '';
            return actions.resolve();
          },
          createSubscription: function (data, actions) {
            return actions.subscription.create({ plan_id: 'P-5LU61750FV655763JNGNRNWI' });
          },
          onApprove: function (data) {
            // PayPal approved — now create the account
            submitSignup(data.subscriptionID);
          },
          onError: function (err) {
            console.error('PayPal error:', err);
            showApiError('PayPal encountered an error. Please try again.');
          }
        }).render('#paypal-button-container');
      }

      // ── Submit (called after PayPal approval) ──
      function submitSignup(subscriptionId) {
        if (isSubmitting) return;
        isSubmitting = true;
        hideApiError();

        // GTM lead capture
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'os_signup_submit',
          lead_email: $('email').value.trim(),
          lead_name: $('firstName').value.trim() + ' ' + $('lastName').value.trim(),
          lead_business: $('businessName').value.trim()
        });

        var payload = {
          ownerEmail: $('email').value.trim(),
          ownerPassword: $('password').value,
          businessName: $('businessName').value.trim(),
          businessType: $('businessType').value,
          phone: $('phone').value.trim(),
          address: {
            street: $('streetAddress').value.trim(),
            suite: $('suite').value.trim(),
            city: $('city').value.trim(),
            state: $('state').value,
            zip: $('zip').value.trim()
          },

          ownerPin: {
            pin: '1234',
            displayName: $('firstName').value.trim() + ' ' + $('lastName').value.trim()
          }
        };

        fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        .then(function (res) {
          if (!res.ok) {
            return res.json().then(function (body) {
              throw new Error(body.message || body.error || 'Signup failed. Please try again.');
            });
          }
          return res.json();
        })
        .then(function (data) {
          // Hide form, show success
          $('signupForm').style.display = 'none';
          $('successOverlay').style.display = 'block';

          // Redirect after brief pause
          setTimeout(function () {
            var params = new URLSearchParams({
              token: data.token || '',
              restaurant: data.restaurantId || data.restaurant?.id || ''
            });
            window.location.href = APP_URL + '/setup?' + params.toString();
          }, 2000);
        })
        .catch(function (err) {
          isSubmitting = false;
          showApiError(err.message);
        });
      }

      function showApiError(msg) {
        var el = $('apiError');
        el.textContent = msg;
        el.style.display = 'block';
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      function hideApiError() {
        $('apiError').style.display = 'none';
      }

      function updatePaypalState() {
        var overlay = $('paypalOverlay');
        if (isFormValid()) {
          overlay.classList.add('hidden');
        } else {
          overlay.classList.remove('hidden');
        }
      }

      // ── Event listeners ──
      document.addEventListener('DOMContentLoaded', function () {
        // Real-time validation on all fields
        var textFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword',
          'businessName', 'phone', 'streetAddress', 'city', 'zip'];
        for (var i = 0; i < textFields.length; i++) {
          (function (field) {
            var el = $(field);
            if (!el) return;
            el.addEventListener('input', function () {
              clearValidation(field);
              if (field === 'password') updateStrengthMeter();
              updatePaypalState();
            });
          })(textFields[i]);
        }

        // Select fields
        var selectFields = ['businessType', 'state'];
        for (var j = 0; j < selectFields.length; j++) {
          (function (field) {
            var el = $(field);
            if (!el) return;
            el.addEventListener('change', function () {
              clearValidation(field);
              updatePaypalState();
            });
          })(selectFields[j]);
        }

        // Phone formatting
        $('phone').addEventListener('input', function () {
          var pos = this.selectionStart;
          var oldLen = this.value.length;
          this.value = formatPhone(this.value);
          var newLen = this.value.length;
          this.selectionStart = this.selectionEnd = pos + (newLen - oldLen);
        });

        // Terms checkbox
        $('termsCheckbox').addEventListener('change', function () {
          updatePaypalState();
        });

        // Init PayPal
        initPayPal();
      });

    })();
  </script>
</body>
