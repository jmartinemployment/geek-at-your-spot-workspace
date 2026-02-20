<?php
/*
Template Name: OrderStack Server Ordering
Description: Server-only ordering interface. Requires Server role authentication.
*/
get_header();
?>

<body style="background-color:white;overflow-x: hidden;padding: 0;margin: 0;height:auto;width:100%;scroll-behavior: smooth;">
  <header>
    <geek-navbar></geek-navbar>
  </header>
  <main style="padding-top: 5rem; min-height: 100vh;">
    <!-- Server Ordering: Requires login with Server role -->
    <get-order-stack-login></get-order-stack-login>
    <get-order-stack-restaurant-select></get-order-stack-restaurant-select>
    <get-order-stack-sos-terminal></get-order-stack-sos-terminal>
  </main>
</body>
<?php
get_footer();
?>
