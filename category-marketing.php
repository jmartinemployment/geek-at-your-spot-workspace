<?php get_header(); ?>

<body <?php body_class(); ?>
  style="background-color:white; overflow-x: hidden; padding: 0; margin: 0; height:auto; width:100%; scroll-behavior: smooth;">

  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K5CXSQRP" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript>

  <header>
    <geek-navbar></geek-navbar>
  </header>

  <main style="padding-top: 5rem; min-height: 100vh; max-width: 1100px; margin: 0 auto; padding-inline: 20px;">

    <header style="margin-bottom: 3rem; border-bottom: 2px solid #eee; padding-bottom: 1rem;">
      <h1 style="font-size: 2.5rem; text-transform: capitalize; margin: 0;">
        <?php echo single_cat_title('', false); ?>
      </h1>
    </header>

    <?php
    $args = array(
      'cat' => get_queried_object_id(),
      'posts_per_page' => 10,
    );

    $cat_query = new WP_Query($args);

    if ($cat_query->have_posts()):
      while ($cat_query->have_posts()):
        $cat_query->the_post(); ?>

        <article <?php post_class(); ?> style="display: flex; gap: 30px; margin-bottom: 50px; align-items: flex-start;">

          <?php if (has_post_thumbnail()): ?>
            <div class="post-inline-image" style="flex-shrink: 0; width: 250px;">
              <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('medium', ['style' => 'width:100%; height:auto; border-radius:8px; display:block;']); ?>
              </a>
            </div>
          <?php endif; ?>

          <div class="post-inline-content" style="flex-grow: 1;">
            <span
              style="text-transform: uppercase; font-size: 0.75rem; font-weight: bold; color: #0073aa; letter-spacing: 1px;">
              <?php echo get_the_category_list(', '); ?>
            </span>

            <h2 style="margin: 5px 0 15px 0; font-size: 1.75rem;">
              <a href="<?php the_permalink(); ?>" style="text-decoration: none; color: #222;">
                <?php the_title(); ?>
              </a>
            </h2>

            <div class="excerpt" style="color: #555; line-height: 1.7;">
              <?php the_excerpt(); ?>
            </div>
          </div>
        </article>

      <?php endwhile;
      wp_reset_postdata();
    else: ?>
      <p>No posts found in the <?php echo single_cat_title('', false); ?> category.</p>
    <?php endif; ?>

  </main>

  <?php get_footer(); ?>