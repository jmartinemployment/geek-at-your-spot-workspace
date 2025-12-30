# WordPress Integration Guide

How to integrate Angular web components with WordPress.

## Build Process

### Step 1: Build Both Packages
```bash
cd ~/development/geek-at-your-spot-workspace
ng build geek-at-your-spot-component-library && ng build my-elements-app
```

### Step 2: Note the Output Hash
```bash
ls -lh dist/my-elements-app/browser/
```

Output example:
```
main-A54RTSSB.js      357K
styles-2324HHXG.css   295K
```

## WordPress Deployment

### 1. Upload Files

Upload to WordPress theme directory:
- `main-[HASH].js` → `/wp-content/themes/geek-at-your-spot/js/`
- `styles-[HASH].css` → `/wp-content/themes/geek-at-your-spot/css/`

### 2. Update functions.php
```php
function enqueue_geek_at_your_spot_scripts() {
    wp_enqueue_script(
        'geek-at-your-spot-elements',
        get_template_directory_uri() . '/js/main-A54RTSSB.js',
        array(),
        null,
        true
    );

    wp_enqueue_style(
        'geek-at-your-spot-styles',
        get_template_directory_uri() . '/css/styles-2324HHXG.css',
        array(),
        null
    );

    wp_enqueue_style(
        'bootstrap',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        array(),
        '5.3.0'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_geek_at_your_spot_scripts');
```

### 3. Clear Cache

1. Log in to SiteGround
2. Go to Speed → Caching
3. Click "Purge All Caches"
4. Hard refresh browser (Cmd+Shift+R)

## Using Components in Templates

### front-page.php
```php
<?php get_header(); ?>

<geek-navbar></geek-navbar>
<geek-hero-main></geek-hero-main>
<geek-quote-ai></geek-quote-ai>
<geek-services-grid></geek-services-grid>

<?php get_footer(); ?>
```

### page-services.php
```php
<?php get_header(); ?>

<geek-navbar></geek-navbar>
<geek-services-grid></geek-services-grid>
<geek-services-detail></geek-services-detail>

<?php get_footer(); ?>
```

## Available Components

| Component | Tag |
|-----------|-----|
| Navbar | `<geek-navbar>` |
| Hero (Main) | `<geek-hero-main>` |
| Hero (Reusable) | `<geek-hero>` |
| Quote AI | `<geek-quote-ai>` |
| Contact Modal | `<geek-contact-modal>` |
| Services Grid | `<geek-services-grid>` |
| Services Detail | `<geek-services-detail>` |

## Troubleshooting

### Component Not Displaying

**Check selector matches registration:**
```typescript
// Component
selector: 'geek-navbar'

// main.ts
customElements.define('geek-navbar', ...)

// WordPress
<geek-navbar></geek-navbar>
```

**Check browser console for errors (F12)**

**Verify file hash in functions.php matches uploaded files**

### Clear All Caches
1. SiteGround Dynamic Cache
2. Browser cache (hard refresh)
3. WordPress object cache if applicable
