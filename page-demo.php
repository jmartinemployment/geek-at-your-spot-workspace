<?php
/*
Template Name: Custom PHP Page Template
*/
get_header(); // This includes your theme's header file
?>

<body
  style="background-color:white;overflow-x: hidden;padding: 0;margin: 0;height:auto;width:100%;scroll-behavior: smooth;">
  <header>
    <geek-navbar></geek-navbar>
  </header>

  <geek-crm-demo></geek-crm-demo>

</body>
<?php
get_footer();
?>