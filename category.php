<?php
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
  <main style="padding-top: 5rem; min-height: 100vh;">
    <?php
    // Get all categories
    $categories = get_categories(array(
      'orderby' => 'name',
      'order' => 'ASC',
      'hide_empty' => false // Set to false to show categories with no posts
    ));

    if ($categories) {
      foreach ($categories as $category) {
        // Get the image ID using ACF's get_field() function
        $image_id = get_field('your_image_field_name', 'category_' . $category->term_id); // Replace 'your_image_field_name' with your actual field name
    
        // Check if an image was found
        if ($image_id) {
          // Get the image HTML using wp_get_attachment_image()
          $image_html = wp_get_attachment_image($image_id, 'medium'); // Change 'medium' to 'thumbnail', 'large', or 'full' as needed
    
          // Output the category information and image
          echo '<div class="category-box">';
          echo '<a href="' . esc_url(get_category_link($category->term_id)) . '">';
          echo $image_html; // Display the image
          echo '<h2>' . esc_html($category->name) . '</h2>';
          echo '</a>';
          echo '</div>';
        } else {
          // Output category info without image if no image is set
          echo '<div class="category-box">';
          echo '<a href="' . esc_url(get_category_link($category->term_id)) . '">';
          echo '<h2>' . esc_html($category->name) . '</h2>';
          echo '</a>';
          echo '</div>';
        }
      }
    }
    ?>

  </main>
  <?php
  get_footer();
  ?>