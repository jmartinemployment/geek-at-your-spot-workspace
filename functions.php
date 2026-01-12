<?php

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
function initialize_styles()
{
  // Add custom elements polyfill for Safari compatibility (from CDN)
  wp_enqueue_script(
    'custom-elements-polyfill',
    'https://unpkg.com/@webcomponents/webcomponentsjs@2.8.0/webcomponents-loader.js',
    array(),
    '2.8.0',
    false
  );

  // Enqueue main stylesheet
  wp_enqueue_style(
    'my-elements-css',
    get_template_directory_uri() . '/assets/css/styles-7ZT44ZCQ.css',
    array(),
    '1.0.0',
    'all'
  );
}
add_action('wp_head', 'initialize_styles');

// Enqueue Scripts
function my_custom_scripts()
{
  // Enqueue Custom Elements from my-elements-app build
  wp_enqueue_script(
    'my-elements-js',
    get_template_directory_uri() . '/assets/js/main-6LQGVLKZ.js',
    array('custom-elements-polyfill'),
    '1.0.0',
    true
  );
}
add_action('wp_enqueue_scripts', 'my_custom_scripts');
