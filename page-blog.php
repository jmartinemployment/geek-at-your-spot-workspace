<?php
/* Template Name: Blog Custom Page Template */
get_header();
?>
<?php wp_body_open(); ?>

  </body>
</html>
<header>
  <geek-navbar></geek-navbar>
</header>

<main id="primary" class="site-main">
  <div class="container">
    <h1>Latest Blog Posts</h1>

    <!-- Category Filter -->
    <div class="category-filter" style="margin: 2rem 0; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
      <strong>Filter by Category:</strong>
      <ul style="list-style: none; padding: 0; margin: 1rem 0 0 0; display: flex; flex-wrap: wrap; gap: 1rem;">
        <li>
          <a href="<?php echo get_permalink(); ?>"
             style="display: inline-block; padding: 0.5rem 1rem; background: <?php echo (!isset($_GET['cat']) ? '#7E5EF2' : '#0A0B26'); ?>; color: white; text-decoration: none; border-radius: 5px;">
            All Posts
          </a>
        </li>
        <?php
        $categories = get_categories(array(
          'orderby' => 'name',
          'order' => 'ASC',
          'hide_empty' => true,
        ));

        foreach ($categories as $category):
          $active = (isset($_GET['cat']) && $_GET['cat'] == $category->term_id) ? '#7E5EF2' : '#0A0B26';
          ?>
          <li>
            <a href="<?php echo add_query_arg('cat', $category->term_id, get_permalink()); ?>"
               style="display: inline-block; padding: 0.5rem 1rem; background: <?php echo $active; ?>; color: white; text-decoration: none; border-radius: 5px;">
              <?php echo $category->name; ?> (<?php echo $category->count; ?>)
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <?php
    // Get category from URL if set
    $category_id = isset($_GET['cat']) ? intval($_GET['cat']) : '';

    // Define our custom query arguments
    $args = array(
      'post_type' => 'post',
      'post_status' => 'publish',
      'orderby' => 'date',
      'order' => 'DESC',
      'posts_per_page' => 10,
      'paged' => (get_query_var('paged')) ? get_query_var('paged') : 1,
    );

    // Add category filter if set
    if ($category_id) {
      $args['cat'] = $category_id;
    }

    // Create a new WP_Query instance
    $custom_query = new WP_Query($args);

    // Start the Loop
    if ($custom_query->have_posts()):
      while ($custom_query->have_posts()):
        $custom_query->the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class('blog-post-card'); ?> style="display: grid; grid-template-columns: 300px 1fr; gap: 2rem; margin-bottom: 2rem; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

          <!-- Featured Image -->
          <?php if (has_post_thumbnail()): ?>
            <div class="post-thumbnail" style="border-radius: 8px; overflow: hidden;">
              <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('medium', array('style' => 'width: 100%; height: 200px; object-fit: cover; display: block;')); ?>
              </a>
            </div>
          <?php else: ?>
            <!-- Placeholder if no image -->
            <div class="post-thumbnail" style="border-radius: 8px; overflow: hidden; background: linear-gradient(135deg, #7E5EF2 0%, #3D80D9 100%); display: flex; align-items: center; justify-content: center; height: 200px;">
              <span style="color: white; font-size: 3rem;">📄</span>
            </div>
          <?php endif; ?>

          <!-- Post Content -->
          <div class="post-content">
            <h2 class="entry-title" style="font-size: 2rem; margin-bottom: 0.5rem;">
              <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" style="color: #0A0B26; text-decoration: none; transition: color 0.3s ease;">
                <?php the_title(); ?>
              </a>
            </h2>

            <div class="entry-meta" style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">
              Posted on <?php the_time('F j, Y'); ?> by <?php the_author(); ?>
              <?php
              // Display categories
              $categories = get_the_category();
              if ($categories) {
                echo ' | ';
                foreach ($categories as $cat) {
                  echo '<span style="color: #7E5EF2; font-weight: 600;">' . $cat->name . '</span> ';
                }
              }
              ?>
            </div>

            <div class="entry-content" style="line-height: 1.8; margin-bottom: 1rem;">
              <?php the_excerpt(); ?>
            </div>

            <a href="<?php the_permalink(); ?>" class="read-more" style="display: inline-block; color: #7E5EF2; font-weight: 600; text-decoration: none; transition: color 0.3s ease;">
              Read More →
            </a>
          </div>

        </article>

        <?php
      endwhile;

      // Pagination
      if ($custom_query->max_num_pages > 1):
        ?>
        <nav class="pagination" style="display: flex; justify-content: space-between; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #eee;">
          <div class="nav-previous">
            <?php next_posts_link(__('&larr; Older posts'), $custom_query->max_num_pages); ?>
          </div>
          <div class="nav-next">
            <?php previous_posts_link(__('Newer posts &rarr;')); ?>
          </div>
        </nav>
        <?php
      endif;

    else:
      ?>
      <p>Sorry, no posts matched your criteria.</p>
      <?php
    endif;

    // Reset Post Data
    wp_reset_postdata();
    ?>
  </div><!-- .container -->
</main><!-- #primary -->

<?php
get_footer();
?>
