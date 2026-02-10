<?php
/*
Template Name: Custom PHP Page Template
*/
get_header();
?>

<body
  style="background-color:white;overflow-x: hidden;padding: 0;margin: 0;height:auto;width:100%;scroll-behavior: smooth;">
  <header>
    <geek-navbar></geek-navbar>
  </header>
  <main style="padding-top: 5rem; min-height: 100vh;">
    <get-order-stack-login></get-order-stack-login>
    <get-order-stack-restaurant-select></get-order-stack-restaurant-select>
    <get-order-stack-menu-engineering></get-order-stack-menu-engineering>
  </main>
</body>
<?php
get_footer();
?>
