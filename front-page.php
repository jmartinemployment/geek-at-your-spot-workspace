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

  <main>
    <!-- Section 1: Hero (Dark) - Pain point hook -->
    <geek-home-hero></geek-home-hero>

    <!-- Section 2: Trust Bar (Light/White) - Quick stats -->
    <geek-trust-bar></geek-trust-bar>

    <!-- Section 3: AI Quote Tool (Purple) - Instant estimate -->
    <geek-quote-ai></geek-quote-ai>

    <!-- Section 4: Services Highlights (Dark) - 4 key services -->
    <geek-services-highlight></geek-services-highlight>

    <!-- Section 5: About Teaser (Light) - Brief intro with action figure -->
    <geek-about-teaser></geek-about-teaser>

    <!-- Section 6: Final CTA (Purple) - Contact info -->
    <geek-home-cta></geek-home-cta>
  </main>

  <?php
  get_footer();
  ?>