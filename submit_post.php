<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST["title"]) && isset($_POST["content"]) && !empty($_POST["title"]) && !empty($_POST["content"])) {
    $jsonData = file_get_contents('./blog_posts.json');
    $blogPosts = json_decode($jsonData, true);

    $newPost = array(
      'title' => $_POST['title'],
      'content' => $_POST['content']
    );
    $blogPosts[] = $newPost;
    $jsonData = json_encode($blogPosts, JSON_PRETTY_PRINT);

    if (file_put_contents('./blog_posts.json', $jsonData)) {
      header("Location: blog.php");
      exit();
    }
  } else {
    echo "Title and content are required.";
  }
}
?>
