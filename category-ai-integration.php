
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
// Get posts for the current category
$args = array(
    'category' => get_queried_object_id(), // Automatically gets current category ID
    'posts_per_page' => 10
);

$cat_posts = get_posts($args);

if ($cat_posts) :
    foreach ($cat_posts as $post) :
        setup_postdata($post); // Essential to make template tags work ?>

        <article>
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div><?php the_excerpt(); ?></div>
        </article>

    <?php endforeach;
    wp_reset_postdata(); // Important: Restore the global $post object
endif;
?>
  </main>
  <?php
  get_footer();
  ?>
