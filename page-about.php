<?php
get_header();
?>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WL9NJH8FLH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WL9NJH8FLH');
</script>
<?php wp_body_open(); ?>
<header>
  <geek-navbar></geek-navbar>
  <geek-about-hero></geek-about-hero>
</header>
<main>
  <geek-mission-banner></geek-mission-banner>
  <geek-forty-years-banner></geek-forty-years-banner>
  <geek-pong></geek-pong>
  <geek-quote-ai></geek-quote-ai>
</main>

<?php
get_footer();
?>
