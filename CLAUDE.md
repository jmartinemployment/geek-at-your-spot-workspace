# Geek @ Your Spot — Multi-Bundle Web Component Architecture

## Project Overview

This workspace contains Angular Elements (Web Components) for the WordPress site geekatyourspot.com. The site demonstrates multiple independent projects by loading their Web Component bundles alongside the site's own bundle.

**Deployment:** FTP upload to WordPress. This is a git repository.

**Stack:** Angular 21, Bootstrap SCSS 5.3.8, Angular Elements. All code uses current, non-deprecated Angular APIs.

**IMPORTANT: NEVER read from or reference the old workspace (`geek-at-your-spot-workspace-old`).** All work happens in THIS workspace (`geek-at-your-spot-workspace`). The old workspace is archived and irrelevant.

## Architecture: Multiple Independent Bundles

The core architecture is **multiple independent Angular Elements bundles** loaded on the same WordPress page using `wp_enqueue_script_module()` (which outputs `<script type="module">`). Each bundle has its own Angular runtime and scope — no conflicts.

### Why `type="module"` Is Required

Standard `<script>` tags share the global scope. When two Angular Elements bundles load without `type="module"`, the second bundle's Angular runtime collides with the first's. The `type="module"` attribute gives each script its own scope, preventing this.

**WordPress:** Use `wp_enqueue_script_module()` (WordPress 6.5+), NOT `wp_enqueue_script()`, for all Angular Elements bundles.

### Bundles

Each demo project is a **separate Angular Library of Angular Elements packaged as Web Components**, loaded using `<script type="module">` and conditionally included only on pages that need them.

| Bundle | Source | Loaded On | WordPress Loading |
|---|---|---|---|
| Geek site elements | `geek-at-your-spot-elements` (this workspace) | All pages | `wp_enqueue_script_module()` always |
| Get-Order-Stack elements | Separate Angular Elements library | Demo pages only | `wp_enqueue_script_module()` conditional |
| ACORD PCS CRM elements | Separate Angular Elements library | Demo pages only | `wp_enqueue_script_module()` conditional |

### Proven Pattern

Each bundle follows the pattern validated in `/Users/jam/development/angular-elements-test/`:
- Separate Angular Library of Angular Elements packaged as Web Components
- `outputHashing: "none"` for predictable filenames
- `createApplication()` + `provideZonelessChangeDetection()`
- `createCustomElement()` + `customElements.define()`
- Imported using the module keyword: `wp_enqueue_script_module()` → `<script type="module">`

## Project Structure

```
geek-at-your-spot-workspace/
├── projects/
│   ├── geek-at-your-spot-component-library/   # Angular library (site components)
│   │   └── src/lib/
│   │       ├── geek-navbar/                   # Site navigation (5rem height)
│   │       ├── geek-sidebar/                  # Mobile sidebar menu
│   │       ├── geek-footer/                   # Site footer
│   │       ├── geek-home-hero/                # Homepage hero
│   │       ├── geek-about-hero/               # About page hero
│   │       ├── geek-services-page-hero/       # Services page hero
│   │       ├── geek-trust-bar/                # Trust/stats bar
│   │       ├── geek-services-highlight/       # Services section
│   │       ├── geek-about-teaser/             # About teaser
│   │       ├── geek-home-cta/                 # Homepage CTA
│   │       ├── geek-quote-ai/                 # AI quote assistant
│   │       ├── geek-services-detail/          # Service detail view
│   │       ├── geek-pong/                     # Pong game
│   │       ├── geek-mission-banner/           # Mission statement banner
│   │       └── geek-forty-years-banner/       # Enterprise experience banner
│   │
│   └── geek-at-your-spot-elements/            # Angular Elements (registers Web Components)
│       └── src/main.ts
│
├── page-*.php                                 # WordPress page templates
├── functions.php                              # WordPress theme functions
├── front-page.php                             # Homepage template
└── dist/                                      # Built bundles
```

**Demo project bundles** (Get-Order-Stack, ACORD PCS CRM, future projects) are separate Angular Libraries of Angular Elements packaged as Web Components, built from their own projects and loaded via `wp_enqueue_script_module()`.

## Naming Convention

**All components follow `geek-*` naming** for both directory names and custom element tags. No exceptions.

## Geek Site Components (14)

| Custom Element Tag | Directory | Description |
|---|---|---|
| `geek-navbar` | `geek-navbar/` | Fixed nav bar (5rem height), contains sidebar |
| `geek-footer` | `geek-footer/` | Site footer |
| `geek-home-hero` | `geek-home-hero/` | Homepage hero section |
| `geek-about-hero` | `geek-about-hero/` | About page hero |
| `geek-services-page-hero` | `geek-services-page-hero/` | Services page hero |
| `geek-trust-bar` | `geek-trust-bar/` | Trust/stats bar |
| `geek-services-highlight` | `geek-services-highlight/` | Services section |
| `geek-about-teaser` | `geek-about-teaser/` | About teaser |
| `geek-home-cta` | `geek-home-cta/` | Homepage call-to-action |
| `geek-quote-ai` | `geek-quote-ai/` | AI quote assistant (complex) |
| `geek-services-detail` | `geek-services-detail/` | Service detail view |
| `geek-pong` | `geek-pong/` | Pong game |
| `geek-mission-banner` | `geek-mission-banner/` | Mission statement banner (about page) |
| `geek-forty-years-banner` | `geek-forty-years-banner/` | Enterprise experience banner (about page) |

Internal (not registered as custom elements):
- `geek-sidebar/` — used by `geek-navbar` internally

## Navbar Offset

The geek-navbar is fixed position with height **5rem**. All page content needs:
```css
padding-top: 5rem;
```

## Build & Deploy

```bash
# Build Geek elements
ng build geek-at-your-spot-elements

# Build Get-Order-Stack elements (from its workspace)
cd /Users/jam/development/Get-Order-Stack-Frontend-Restaurant-Workspace
ng build get-order-stack-elements

# Build ACORD PCS CRM elements (from its workspace)
cd /Users/jam/development/acord-pcs-crm/frontend/acord-pcs-crm
ng build acord-pcs-crm-library && ng build acord-pcs-crm-elements
```

### Copy demo bundles into Geek dist

After building all three projects, copy the demo bundles into the Geek dist so everything can be FTP'd from one location:

```bash
# OrderStack bundle
cp .../Get-Order-Stack.../dist/get-order-stack-elements/browser/{main.js,styles.css} \
   dist/geek-at-your-spot-elements/browser/get-order-stack-elements/

# CRM bundle (includes lazy chunks + fonts)
cp .../acord-pcs-crm/.../dist/acord-pcs-crm-elements/browser/{main.js,styles.css,chunk-*.js} \
   dist/geek-at-your-spot-elements/browser/acord-pcs-crm-elements/
cp -R .../dist/acord-pcs-crm-elements/browser/fonts \
   dist/geek-at-your-spot-elements/browser/acord-pcs-crm-elements/
```

### FTP upload

Upload `dist/geek-at-your-spot-elements/browser/*` to `assets/geek-elements/` on WordPress. This includes the Geek bundle, font files, and both demo bundle subdirectories. Also upload any modified `page-*.php` and `functions.php` files to the theme root.

## WordPress Integration

### functions.php

**Note:** The existing `functions.php` (in the old workspace) contains required scripts and theme setup that must be migrated to the new project, updated to use `wp_enqueue_script_module()`.

### WordPress Asset Directory Structure

All bundles are deployed under `assets/geek-elements/` on the WordPress theme:

```
themes/geek-at-your-spot/assets/geek-elements/
├── main.js                          # Geek bundle
├── styles.css                       # Geek styles (Bootstrap, Bootstrap Icons, Font Awesome)
├── webfonts/                        # Font Awesome woff2 files
├── fonts/                           # Bootstrap Icons woff/woff2 files
├── get-order-stack-elements/        # OrderStack bundle (subdirectory)
│   ├── main.js
│   └── styles.css
└── acord-pcs-crm-elements/          # CRM bundle (subdirectory)
    ├── main.js
    ├── styles.css
    ├── fonts/                       # Bootstrap Icons woff/woff2 files
    └── chunk-*.js                   # Lazy-loaded route chunks
```

### functions.php Pattern

```php
// Geek bundle — all pages
wp_enqueue_style('geek-elements-css',
    get_template_directory_uri() . '/assets/geek-elements/styles.css', ...);
wp_enqueue_script_module('geek-elements',
    get_template_directory_uri() . '/assets/geek-elements/main.js', ...);

// OrderStack bundle — demo pages only
if (is_page('taipa-demo')) {
    wp_enqueue_style('order-stack-elements-css',
        get_template_directory_uri() . '/assets/geek-elements/get-order-stack-elements/styles.css', ...);
    wp_enqueue_script_module('order-stack-elements',
        get_template_directory_uri() . '/assets/geek-elements/get-order-stack-elements/main.js', ...);
}

// CRM bundle — demo pages only
if (is_page('acord-pcs-demo')) {
    wp_enqueue_style('crm-elements-css',
        get_template_directory_uri() . '/assets/geek-elements/acord-pcs-crm-elements/styles.css', ...);
    wp_enqueue_script_module('crm-elements',
        get_template_directory_uri() . '/assets/geek-elements/acord-pcs-crm-elements/main.js', ...);
}
```

**Important:** `wp_enqueue_script_module` and `wp_enqueue_script` are separate systems. Modules cannot depend on classic scripts.

### Page Templates

All demo pages use `Template Name: Custom PHP Page Template`.

| Page | Slug | Template File | Bundles Loaded |
|------|------|---------------|----------------|
| Home | / | front-page.php | Geek only |
| About | /about/ | page-about.php | Geek only |
| Services | /services/ | page-services.php | Geek only |
| Blog | /blog/ | page-blog.php | Geek only |
| Taipa Demo | /taipa-demo/ | page-taipa-demo.php | Geek + OrderStack (`<get-order-stack-menu-display>`) |
| ACORD PCS Demo | /acord-pcs-demo/ | page-acord-pcs-demo.php | Geek + CRM (`<acord-pcs-crm-app>`) |

## Related Projects

| Project | Location | Purpose |
|---------|----------|---------|
| Get-Order-Stack Frontend | `/Users/jam/development/Get-Order-Stack-Frontend-Restaurant-Workspace` | Restaurant ordering system (has Angular Elements) |
| Get-Order-Stack Backend | `/Users/jam/development/Get-Order-Stack-Restaurant-Backend` | Express API backend |
| ACORD PCS CRM | `/Users/jam/development/acord-pcs-crm/frontend` | CRM application (needs Angular Elements added) |
| angular-elements-test | `/Users/jam/development/angular-elements-test` | Proof of concept for multi-bundle pattern |
| Old workspace (ARCHIVED — DO NOT READ) | `/Users/jam/development/geek-at-your-spot-workspace-old` | Archived. Never read from this path. |

## MANDATORY: Inclusion Requirements

**No project is to be included in Geek-At-Your-Spot unless it follows the same Angular 21 Library of Angular Elements packaged as Web Components pattern — with no deprecated methods — same as Geek-At-Your-Spot itself.**

### The Pattern

Every included project must be an Angular 21 multi-project workspace with:

1. **An Angular library** — components, services, models exported via `public-api.ts`
2. **An Angular Elements app** — imports from the library, registers Web Components via `createCustomElement()` + `customElements.define()`
3. **`outputHashing: "none"`** — predictable filenames (`main.js`, `styles.css`)
4. **`provideZonelessChangeDetection()`** — no Zone.js
5. **No deprecated methods** — no `@import` (use `@use`), no `toPromise()` (use `firstValueFrom()`), no `*ngFor`/`*ngIf` (use `@for`/`@if`), current Angular 21 APIs only
6. **Loaded via `wp_enqueue_script_module()`** — produces `<script type="module">` for scope isolation

### Compliance Status

| Project | Location | Compliant |
|---------|----------|-----------|
| Geek-At-Your-Spot | This workspace | Yes |
| Get-Order-Stack | `/Users/jam/development/Get-Order-Stack-Frontend-Restaurant-Workspace` | Yes |
| ACORD PCS CRM | `/Users/jam/development/acord-pcs-crm/frontend/acord-pcs-crm` | Yes |

### WordPress Integration

1. Build: `ng build {library} && ng build {elements-app}`
2. Copy `main.js` + `styles.css` to WordPress (each project in its own directory)
3. Conditional `wp_enqueue_script_module()` in `functions.php`
4. Create `page-{demo-slug}.php` with project's custom elements
5. Add link in `geek-sidebar/`

## Critical: Development Configuration (`ng serve`)

### tsconfig paths MUST point to library source

The default `ng generate library` creates tsconfig paths pointing to `./dist/`. This causes:
- Dev server uses **stale pre-built library** instead of live source
- File watcher does NOT detect library source changes (no hot reload)
- Lazy-loaded routes fail to resolve relative imports from dist output

**Fix:** In root `tsconfig.json`, point paths to library source and add `baseUrl`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "geek-at-your-spot-component-library": [
        "projects/geek-at-your-spot-component-library/src/public-api.ts"
      ]
    }
  }
}
```

**This applies to ALL projects** — Geek, Get-Order-Stack, and ACORD PCS CRM all required this fix.

### `:host { display: block }` is MANDATORY on every component

Custom elements default to `display: inline`. This collapses block content (flexbox, grid, min-height) to zero height. **Every component** that is registered as a custom element via `customElements.define()` MUST have:

```scss
:host {
  display: block;
}
```

This applies even when the component is used internally as an Angular component — if the selector is also registered as a custom element, the browser applies `display: inline` to it everywhere.

### `router.initialNavigation()` for routed custom elements

`createApplication()` does NOT auto-trigger the router's initial navigation like `bootstrapApplication()` does. For any bundle that uses routing (e.g., ACORD PCS CRM), add after `customElements.define()`:

```typescript
const router = app.injector.get(Router);
router.initialNavigation();
```

## Common Issues

### 404 on WordPress page
- Check WordPress admin: Page must exist with correct slug
- Template must be set to "Custom PHP Page Template"
- Flush permalinks: Settings → Permalinks → Save

### Content cut off at top
- Missing `padding-top: 5rem` for navbar offset

### Components not rendering
- Check DevTools Console for errors
- Verify bundle loaded with `type="module"` in Network tab
- Verify custom element registered: `customElements.get('element-name')`
- Check `:host { display: block }` in component SCSS
- Check tsconfig paths point to library source, not dist

### Second bundle fails / console errors
- Confirm scripts loaded via `wp_enqueue_script_module()`, NOT `wp_enqueue_script()`
- Check Network tab for `type="module"` attribute on script tags
- Each bundle must use `createApplication()` with its own injector

## API Configuration

OrderStack API: `https://get-order-stack-restaurant-backend.onrender.com/api/restaurant`
Test Restaurant ID: `f2cfe8dd-48f3-4596-ab1e-22a28b23ad38`

---

## Migration Plan

This project is being built incrementally from a clean workspace. The old workspace (`geek-at-your-spot-workspace-old`) is kept as reference.

### Migration Phases

| Phase | Components Added | Status |
|---|---|---|
| 0 | Setup — rename old, create new workspace | **Complete** |
| 1 | `geek-navbar` + `geek-footer` + OrderStack bundle validation | **Complete** |
| 2 | `geek-home-hero` + `geek-trust-bar` | **Complete** |
| 3 | `geek-services-highlight` + `geek-about-teaser` + `geek-home-cta` | **Complete** |
| 4 | `geek-quote-ai` (with services) | **Complete** |
| 5 | `geek-about-hero` + `geek-services-page-hero` + `geek-services-detail` | **Complete** |
| 6 | `geek-pong` | **Complete** |
| 7 | Expand OrderStack elements (added 5 components, outputHashing: none) | **Complete** |
| 8 | Restructure ACORD PCS CRM as Angular workspace with library + elements app | **Complete** |
| 9 | Finalize — sidebar links, CLAUDE.md updates, final deploy | **In Progress** |

**Update this table as phases are completed.**

---

## Before Context Compression / Ending Session

**CRITICAL:** Before context gets compressed or session ends, update this file with:

- Current migration phase and what was completed
- Update the Migration Phases table status
- Any new patterns or decisions made during the session
- Errors encountered and how they were resolved
- File changes that aren't obvious from the code
- Any component modifications made during migration
- Bundle filenames if they changed

This ensures critical context survives compression and new sessions start with full knowledge.

### Session Notes

**February 5, 2026 (Session 1):**
- Phase 0 complete: renamed old workspace to `-old`, created new Angular 21 workspace with git
- Created `geek-at-your-spot-component-library` + `geek-at-your-spot-elements`
- Installed `@angular/elements`, `bootstrap@5.3.8`
- Configured `outputHashing: "none"`, `provideZonelessChangeDetection()`, `provideHttpClient()`
- `functions.php` updated to use `wp_enqueue_script_module()` with conditional loading
- Phase 1: migrated `geek-navbar`, `geek-sidebar`, `geek-footer`
- Build output: `main.js` (158KB), `styles.css` (227KB) — clean, no warnings
- Sass: use `@use` not `@import` (deprecated)

**February 5, 2026 (Session 2):**
- Phases 2-6 complete: all 12 geek site components migrated, builds clean at 631 kB
- Phase 2: `geek-home-hero`, `geek-trust-bar`, `geek-contact-modal`, services (`api.service`, `geek-email-service`), environments
- Phase 3: `geek-services-highlight`, `geek-about-teaser`, `geek-home-cta`
- Phase 4: `geek-quote-ai`, `geek-quote-modal`, `geek-quote-ai.service`
- Phase 5: `geek-about-hero`, `geek-services-page-hero`, `geek-services-detail`, `geek-services-business-logic-data.service`
- Phase 6: `geek-pong`
- All deprecated methods replaced: `toPromise()` → `firstValueFrom()`, `*ngFor` → `@for`, CSS → SCSS
- Budget increased to 1MB warning / 2MB error
- Phase 7 complete: Get-Order-Stack `outputHashing: "none"` set, 4 custom elements registered (login, restaurant-select, sos-terminal, kds-display)
- Phase 8 complete: ACORD PCS CRM restructured as Angular 21 workspace with library + elements app
  - Old project renamed to `acord-pcs-crm-old` (backup)
  - New workspace: library (`acord-pcs-crm-library`) + elements app (`acord-pcs-crm-elements`)
  - Registers `<acord-pcs-crm-app>` with hash routing (`withHashLocation()`)
  - All code already modern (signals, `@if`/`@for`, functional guards/interceptors) — no deprecated methods
  - CLAUDE.md added to ACORD PCS CRM project
- Phase 9: sidebar links already correct, CLAUDE.md updated, migration table current

**February 6, 2026 (Session 3):**
- Debugged Get-Order-Stack integration — cart flow not working on WordPress demo page
- **Root cause 1:** `page-taipa-demo.php` used `<get-order-stack-menu-display>` which is NOT a registered custom element. Only 4 are registered: login, restaurant-select, sos-terminal, kds-display
- **Root cause 2:** Components loaded data in `ngOnInit` which fires once at page load (before user authenticates). After login, templates updated reactively via signals but data loading never re-triggered
- **Root cause 3:** No flow orchestration — login/restaurant-select/sos-terminal were independent custom elements with no gating
- **Fixes applied (OrderStack library — `/Users/jam/development/Get-Order-Stack-Restaurant-Frontend-Workspace`):**
  - `menu-display.ts`: Replaced `ngOnInit` + `OnInit` with `effect()` that watches `isAuthenticated()` and loads menu reactively
  - `restaurant-select.ts`: Replaced `ngOnInit` + `OnInit` with `effect()` that watches `isAuthenticated()` and loads restaurants reactively
  - `sos-terminal.ts`: Replaced `ngOnInit` with `effect()` that watches `selectedRestaurantId()` and connects socket reactively
  - `login.html`: Wrapped entire template in `@if (!isAuthenticated())` to hide after login
  - `restaurant-select.html`: Changed condition to `@if (isAuthenticated() && !selectedRestaurantId())` to hide after restaurant selection; removed redundant "Auth Required" fallback
- **Fixes applied (Geek workspace):**
  - `page-taipa-demo.php`: Changed `<get-order-stack-menu-display>` to `<get-order-stack-sos-terminal>`
  - `functions.php`: Fixed typo on line 51 (stray `n` character)
  - `test-local/index.html`: Updated bundle status checker from 9 to 4 registered OrderStack elements
- **Clarification:** OrderStack main.ts registers 4 custom elements (not 9 as previously documented). The other 5 (menu-display, menu-item-card, checkout-modal, category-management, item-management) are internal Angular components used inside sos-terminal
- Build output: OrderStack 629 kB (397 kB JS + 231 kB CSS), Geek 732 kB (342 kB JS + 389 kB CSS)
- Verified with Playwright: 19/19 elements registered, auth gating works correctly
- **Additional fix:** MenuDisplay `effect()` updated to also watch `selectedRestaurantId()` — menu only loads when both authenticated AND restaurant selected
- Added `<get-order-stack-restaurant-select>` to test-local/index.html between login and sos-terminal
- **E2E test passed with real credentials** (admin@orderstack.com):
  - Login → form hides on success
  - Restaurant select → 2 restaurants found (Taipa selected), selector hides after selection
  - Menu → 42 items across 5 categories load reactively via effect()
  - Add to cart → items added successfully, cart badge updates (tested 2 items)
  - Checkout modal → opens with items, quantity controls, table number input, Place Order button
- CORS note: Backend only allows WordPress domain origin. Local testing requires `--disable-web-security` flag or a proxy. WordPress deploy will work normally
- Next: FTP deploy updated bundles + PHP templates to WordPress

---

*Last Updated: February 6, 2026*
