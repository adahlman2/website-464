<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<header>
    <div class="container">
      <h1>Globetrotting Guru Guide</h1>
      <nav>
        <ul>
          <li><a href="final.html">Home</a></li>
          <li class="dropdown">
            <a href="final.html" class="dropbtn">Destinations</a>
            <div class="dropdown-content">
              <a href="Americas.html">Americas</a>
              <a href="Eurasia.html">Eurasia</a>
            </div>
          </li>
          <li><a href="blog.php">Blog</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="guide.html">Guide</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="overlay" id="overlay">
    <div class="popup">
      <h2>Where do you want to travel?</h2>
      <form id="pollForm">
        <label>
          <input type="radio" name="destination" value="Cambodia"> Cambodia
        </label><br>
        <label>
          <input type="radio" name="destination" value="Utah"> Utah
        </label><br>
        <label>
          <input type="radio" name="destination" value="Indonesia"> Indonesia
        </label><br>
        <label>
          <input type="radio" name="destination" value="Canada"> Canada
        </label><br>
        <label>
          <input type="radio" name="destination" value="Brazil"> Brazil
        </label><br>
        <label>
          <input type="radio" name="destination" value="Italy"> Italy
        </label><br>
        <label>
          <input type="radio" name="destination" value="Spain"> Spain
        </label><br>
        <label>
          <input type="radio" name="destination" value="Greece"> Greece
        </label><br>
        <label>
          <input type="radio" name="destination" value="Turkey"> Turkey
        </label><br>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  
  <section id="blog" class="container">

      <h2>Latest Blog Posts</h2>

      <div class="blog-posts">
        <?php
        function getBlogPosts() {
          $jsonData = file_get_contents('./blog_posts.json');
           $blogPosts = json_decode($jsonData, true);
           $recentPosts = array_slice($blogPosts, -3);
           return $recentPosts;
               }

        $blogPosts = getBlogPosts();
        foreach ($blogPosts as $post) {
          echo "<div class='blog-post'>";
          echo "<h3>" . $post['title'] . "</h3>";
          echo "<p>" . $post['content'] . "</p>";
          echo "</div>";
        }
        ?>

      <section class="new-post-form">
        <h2>Write a New Blog Post</h2>
        <form method="post" action="submit_post.php" class="form">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="content">Content:</label>
            <textarea id="content" name="content" class="form-control" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn">Post</button>
        </form>
      </section>

      </div>

      <div class="blog-image">
        <img src="bask.jpeg" alt="Share">
      </div>

  </section>

  <footer>
    <div class="container">
      <p>Copyright Globetrotting Guru &copy; 2024 </p>
    </div>
  </footer>
</body>
</html>

<style type="text/css">
  @import url(./final.css);
</style>

<script src="./final.js" type="text/javascript"></script>

<!-- Pop-up Poll Modal -->
<script>
document.addEventListener("DOMContentLoaded", function() {
  var overlay = document.getElementById("overlay");

  overlay.style.display = "flex";

  document.getElementById("pollForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var selectedDestination = document.querySelector('input[name="destination"]:checked');
    if (selectedDestination) {
      var destinationValue = selectedDestination.value;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "submit_vote.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
        }
      };
      xhr.send("destination=" + encodeURIComponent(destinationValue));
    }

    overlay.style.display = "none";
  });
});
</script>
