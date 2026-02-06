<?php
/**
 * Template for displaying single blog posts
 */
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

  <main id="primary" class="site-main single-post">
    <div class="container" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
      <?php
      while (have_posts()):
        the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

          <header class="entry-header" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #eee;">
            <h1 class="entry-title" style="font-size: 2.5rem; color: #0A0B26; margin-bottom: 1rem;">
              <?php the_title(); ?>
            </h1>

            <div class="entry-meta" style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">
              <span class="posted-on">
                Posted on <?php the_time('F j, Y'); ?>
              </span>
              <span class="byline">
                by <?php the_author(); ?>
              </span>
            </div>

            <!-- Post Categories -->
            <div class="post-categories" style="margin: 1rem 0;">
              <?php
              $categories = get_the_category();
              if ($categories) {
                echo '<strong>Categories:</strong> ';
                foreach ($categories as $category) {
                  echo '<a href="' . get_category_link($category->term_id) . '"
                      style="display: inline-block; padding: 0.3rem 0.8rem;
                      background: #7E5EF2; color: white; text-decoration: none;
                      border-radius: 5px; margin-right: 0.5rem; font-size: 0.9rem;">'
                    . $category->name . '</a>';
                }
              }
              ?>
            </div>
          </header>

          <!-- Featured Image -->
          <?php if (has_post_thumbnail()): ?>
            <div class="post-thumbnail" style="margin-bottom: 2rem; border-radius: 8px; overflow: hidden;">
              <?php the_post_thumbnail('large', array('style' => 'width: 100%; height: auto; display: block;')); ?>
            </div>
          <?php endif; ?>

          <div class="entry-content" style="font-size: 1.1rem; line-height: 1.8;">
            <?php the_content(); ?>
          </div>

          <footer class="entry-footer" style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #eee;">
            <?php
            // Post navigation
            the_post_navigation(array(
              'prev_text' => '<span style="color: #7E5EF2;">← Previous Post</span>',
              'next_text' => '<span style="color: #7E5EF2;">Next Post →</span>',
            ));
            ?>
          </footer>

        </article>

        <?php
      endwhile;
      ?>
    </div><!-- .container -->
  </main><!-- #primary -->

  <?php
  get_footer();
  ?>
