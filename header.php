<!DOCTYPE html>
<html lang="en"
  style="background-color: white;overflow-x: hidden;padding: 0;margin: 0;height: auto;width: 100%;scroll-behavior: smooth;">

<head>
  <base href="/">
  <!-- Google Tag Manager -->
  <script>(function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-K5CXSQRP');</script>
  <!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <?php if (is_front_page()) : ?>
  <!-- Homepage-specific meta tags -->
  <meta name="description"
    content="Your competitors are using AI. Are you? Geek At Your Spot helps small businesses in Broward and Palm Beach County leverage Artificial Intelligence, custom development, and smart automation to compete with the big players.">
  <meta name="keywords"
    content="AI for small business, Artificial Intelligence, business automation, custom development, SEO, web applications, Broward County, Palm Beach County, Florida, small business technology">
  <?php else : ?>
  <!-- Standard page meta tags -->
  <meta name="description"
    content="Geek At Your Spot is an award-winning developer offering Artificial Intelligence programming, Web Design, Content Marketing, SEO &amp; Data Analytics, and Cybersecurity services for small businesses in Broward and Palm Beach County, Florida.">
  <meta name="keywords"
    content="Artificial Intelligence, AI, MCP Agents, Web Design, Content Marketing, SEO, Data Analytics, Cybersecurity, Broward County, Palm Beach County, Florida">
  <?php endif; ?>
  <meta name="author" content="Geek at Your Spot">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="<?php echo esc_url(get_permalink()); ?>" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <?php if (is_front_page()) : ?>
  <meta property="og:title" content="Your Competitors Are Using AI. Are You? | Geek At Your Spot" />
  <meta property="og:description"
    content="Small businesses that embrace AI now will dominate their markets. Get your free AI assessment and discover how smart technology can give you a competitive edge." />
  <?php else : ?>
  <meta property="og:title"
    content="<?php echo esc_attr(get_the_title()); ?> | Geek At Your Spot" />
  <meta property="og:description"
    content="Geek At Your Spot offers Artificial Intelligence programming, Web Design, Content Marketing, SEO &amp; Data Analytics, and Cybersecurity services for small businesses in South Florida." />
  <?php endif; ?>
  <meta property="og:image" content="https://geekatyourspot.com/wp-content/uploads/2025/10/GeekAtYourSpot.svg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="<?php echo esc_url(get_permalink()); ?>" />
  <meta property="og:site_name"
    content="Geek At Your Spot: Programming, Design, Content Strategy, and Conversion Marketing" />

  <!-- LocalBusiness Schema Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Geek At Your Spot",
    "description": "Award-winning developer offering Artificial Intelligence programming, Web Design, Content Marketing, SEO & Data Analytics, and Cybersecurity services for small businesses.",
    "url": "https://geekatyourspot.com",
    "logo": "https://geekatyourspot.com/wp-content/uploads/2025/10/GeekAtYourSpot.svg",
    "image": "https://geekatyourspot.com/wp-content/uploads/2025/10/geek@yourSpot-1.jpeg",
    "telephone": "+1-954-555-GEEK",
    "email": "contact@geekatyourspot.com",
    "areaServed": [
      {
        "@type": "County",
        "name": "Broward County",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "County",
        "name": "Palm Beach County",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "sameAs": [],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "serviceType": [
      "Artificial Intelligence Programming",
      "Web Design",
      "Content Marketing",
      "SEO & Data Analytics",
      "Cybersecurity"
    ]
  }
  </script>
  <?php wp_head(); ?>
</head>
