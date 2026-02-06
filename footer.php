<footer>
    <?php wp_footer(); ?>
<geek-footer></geek-footer>
<!-- Add this to your website footer -->
<div id="cookie-notice" style="position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: white; padding: 15px; text-align: center; font-size: 14px; z-index: 9999;">
  This website uses cookies to improve your experience and analyze site traffic.
  <a href="/privacy-policy" style="color: #4A90E2; text-decoration: underline;">Privacy Policy</a> |
  <a href="/cookie-policy" style="color: #4A90E2; text-decoration: underline;">Cookie Policy</a>
  <button onclick="document.getElementById('cookie-notice').style.display='none'; localStorage.setItem('cookie-notice-dismissed', 'true');" style="margin-left: 15px; background: #4A90E2; color: white; border: none; padding: 8px 20px; cursor: pointer; border-radius: 4px;">Got It</button>
</div>

<script>
  // Hide notice if user already dismissed it
  if (localStorage.getItem('cookie-notice-dismissed')) {
    document.getElementById('cookie-notice').style.display = 'none';
  }
</script>
</footer>
</body>

</html>
