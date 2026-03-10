<?php

define('GEEK_THEME_VERSION', GEEK_THEME_VERSION);

// Theme Setup - MUST be on after_setup_theme hook
function geek_theme_setup()
{
  // Enable featured images (post thumbnails)
  add_theme_support('post-thumbnails');

  // Set default thumbnail sizes
  add_image_size('blog-thumbnail', 300, 200, true); // For blog listing
  add_image_size('blog-featured', 900, 400, true);  // For single posts

  // Add title tag support
  add_theme_support('title-tag');

  // Add HTML5 support
  add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'geek_theme_setup');

// Enqueue Styles
function geek_enqueue_styles()
{
  // Geek site stylesheet — all pages
  wp_enqueue_style(
    'geek-elements-css',
    get_template_directory_uri() . '/assets/geek-elements/styles.css',
    array(),
    GEEK_THEME_VERSION,
    'all'
  );

  // Get-Order-Stack stylesheet — OrderStack pages
  $orderstack_pages = array(
    'orderstack-server-ordering',
    'orderstack-kds',
    'orderstack-menu-engineering',
    'orderstack-sales',
    'orderstack-inventory',
    'orderstack-menu-management',
    'orderstack-orders',
    'orderstack-online-ordering',
    'orderstack-reservations',
    'orderstack-command-center',
    'orderstack-floor-plan',
    'orderstack-crm',
    'orderstack-ai-chat',
    'orderstack-monitoring',
    'orderstack-voice-order',
    'orderstack-pricing',
    'orderstack-waste',
    'orderstack-sentiment',
    'orderstack-order-pad',
    'orderstack-staff-portal',
    'orderstack-food-cost',
    'orderstack-multi-location',
    'orderstack-pos',
    'orderstack-close-of-day',
    'orderstack-kiosk',
    'orderstack-settings',
    'orderstack-scheduling',
    'orderstack-marketing',
    'orderstack-invoicing',
  );
  if (is_page($orderstack_pages)) {
    wp_enqueue_style(
      'order-stack-elements-css',
      get_template_directory_uri() . '/assets/geek-elements/get-order-stack-elements/styles.css',
      array(),
      '1.2.0',
      'all'
    );
  }

  // ACORD PCS CRM stylesheet — demo pages only
  if (is_page('acord-pcs-demo')) {
    wp_enqueue_style(
      'crm-elements-css',
      get_template_directory_uri() . '/assets/geek-elements/acord-pcs-crm-elements/styles.css',
      array(),
      GEEK_THEME_VERSION,
      'all'
    );
  }

  // ACORD LHA CRM stylesheet — demo pages only
  if (is_page('acord-lhs-demo')) {
    wp_enqueue_style(
      'lha-crm-elements-css',
      get_template_directory_uri() . '/assets/geek-elements/acord-lha-crm-elements/styles.css',
      array(),
      GEEK_THEME_VERSION,
      'all'
    );
  }

  // RankPilot stylesheet — rankpilot page only
  if (is_page('rankpilot')) {
    wp_enqueue_style(
      'rankpilot-elements-css',
      get_template_directory_uri() . '/assets/geek-elements/rankpilot/styles.css',
      array(),
      '0.1.0',
      'all'
    );
  }

  // GeekFlow stylesheet — geek-flow page only
  if (is_page('geek-flow')) {
    wp_enqueue_style(
      'geek-flow-elements-css',
      get_template_directory_uri() . '/assets/geek-elements/geek-flow-elements/styles.css',
      array(),
      '0.1.0',
      'all'
    );
  }
}
add_action('wp_enqueue_scripts', 'geek_enqueue_styles');

// OrderStack Signup — Bootstrap CSS, PayPal SDK, Stripe.js
function orderstack_signup_assets()
{
  if (!is_page('orderstack-signup'))
    return;

  // Bootstrap 5.3.8 (not bundled in any Angular Elements build)
  wp_enqueue_style(
    'bootstrap-css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css',
    array(),
    '5.3.8',
    'all'
  );

  // PayPal SDK — sandbox with vault for subscriptions
  wp_enqueue_script(
    'paypal-sdk',
    'https://www.paypal.com/sdk/js?client-id=Ad4s6CdaCdVAaN047scpnIbJQx0_jNBmjuN7gn4ivxdkujaupt9C4csFMwlyaYw5yUGY268m5Fw90ig3&vault=true&intent=subscription',
    array(),
    null,
    true
  );


}
add_action('wp_enqueue_scripts', 'orderstack_signup_assets');

// Enqueue Script Modules — loaded with type="module" for scope isolation
// Each bundle is in its own directory since outputHashing: "none" produces main.js for all
function geek_enqueue_modules()
{
  // Geek site elements bundle — all pages
  wp_enqueue_script_module(
    'geek-elements',
    get_template_directory_uri() . '/assets/geek-elements/main.js',
    array(),
    GEEK_THEME_VERSION
  );

  // Get-Order-Stack elements bundle — OrderStack pages
  $orderstack_pages = array(
    'orderstack-server-ordering',
    'orderstack-kds',
    'orderstack-menu-engineering',
    'orderstack-sales',
    'orderstack-inventory',
    'orderstack-menu-management',
    'orderstack-orders',
    'orderstack-online-ordering',
    'orderstack-reservations',
    'orderstack-command-center',
    'orderstack-floor-plan',
    'orderstack-crm',
    'orderstack-ai-chat',
    'orderstack-monitoring',
    'orderstack-voice-order',
    'orderstack-pricing',
    'orderstack-waste',
    'orderstack-sentiment',
    'orderstack-order-pad',
    'orderstack-staff-portal',
    'orderstack-food-cost',
    'orderstack-multi-location',
    'orderstack-pos',
    'orderstack-close-of-day',
    'orderstack-kiosk',
    'orderstack-settings',
    'orderstack-scheduling',
    'orderstack-marketing',
    'orderstack-invoicing',
  );
  if (is_page($orderstack_pages)) {
    wp_enqueue_script_module(
      'order-stack-elements',
      get_template_directory_uri() . '/assets/geek-elements/get-order-stack-elements/main.js',
      array(),
      '1.2.0'
    );
  }

  // ACORD PCS CRM elements bundle — demo pages only
  if (is_page('acord-pcs-demo')) {
    wp_enqueue_script_module(
      'crm-elements',
      get_template_directory_uri() . '/assets/geek-elements/acord-pcs-crm-elements/main.js',
      array(),
      GEEK_THEME_VERSION
    );
  }

  // ACORD LHA CRM elements bundle — demo pages only
  if (is_page('acord-lhs-demo')) {
    wp_enqueue_script_module(
      'lha-crm-elements',
      get_template_directory_uri() . '/assets/geek-elements/acord-lha-crm-elements/main.js',
      array(),
      GEEK_THEME_VERSION
    );
  }

  // RankPilot elements bundle — rankpilot page only
  if (is_page('rankpilot')) {
    wp_enqueue_script_module(
      'rankpilot-elements',
      get_template_directory_uri() . '/assets/geek-elements/rankpilot/main.js',
      array(),
      '0.1.0'
    );
  }

  // GeekFlow elements bundle — geek-flow page only
  if (is_page('geek-flow')) {
    wp_enqueue_script_module(
      'geek-flow-elements',
      get_template_directory_uri() . '/assets/geek-elements/geek-flow-elements/main.js',
      array(),
      '0.1.0'
    );
  }
}
add_action('wp_enqueue_scripts', 'geek_enqueue_modules');
