<?php
$selectedDestination = $_POST['destination'];

$votesData = json_decode(file_get_contents('./votes.json'), true);

foreach ($votesData as &$destination) {
  if ($destination['name'] === $selectedDestination) {
    $destination['votes']++;
    break;
  }
}

file_put_contents('./votes.json', json_encode($votesData));

echo "Votes updated successfully!";
?>
