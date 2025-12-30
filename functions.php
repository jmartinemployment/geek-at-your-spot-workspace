<?php
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
  wp_register_style('my-elements-css', get_template_directory_uri() . '/assets/css/styles-2324HHXG.css', false);
  wp_enqueue_style('my-elements-css', get_template_directory_uri() . '/assets/css/styles-2324HHXG.css', array(), '1.0.0', 'all');

}
add_action('wp_head', 'initialize_styles');

function my_custom_scripts()
{
  // Enqueue Custom Elements from my-elements-app build (includes Bootstrap 5.3 + zone.js for Safari)
  // Update the hash values (UDEK6KLO, 6RNQ5KQO) after each build to match your dist output
  wp_register_script('my-elements-js', get_template_directory_uri() . '/assets/js/main-4ABSSSYH.js');
  wp_enqueue_script('my-elements-js', get_template_directory_uri() . '/assets/js/main-4ABSSSYH.js', array('custom-elements-polyfill'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'my_custom_scripts');


