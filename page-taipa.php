<?php
/*
Template Name: Custom PHP Page Template
*/
get_header(); // This includes your theme's header file
?>

<!-- Your custom HTML and PHP code goes here -->
<h1>Welcome to my custom PHP page!</h1>
<?php
// Example of adding dynamic PHP content
echo "<p>The current date is: " . date_i18n(get_option('date_format')) . "</p>";
?>

<body
  style="background-color:white;overflow-x: hidden;padding: 0;margin: 0;height:auto;width:100%;scroll-behavior: smooth;">
  <header>
    <geek-navbar></geek-navbar>
  </header>
</body>
  <?php
  get_footer();
  ?>
