<?php
require_once '../../config.php';
$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);



$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$color = $_POST['color'];
$custom = $_POST['custom'];
$stock = $_POST['stock'];
$date_added = date("Y-m-d H:i:s");

  if($_FILES["file"]["name"])
  {
    $file = $_FILES["file"]["name"];
     $location = '../../../images/flowers/' . $file;
     move_uploaded_file($_FILES["file"]["tmp_name"], $location);

     $query = "INSERT INTO items (name, description, image, price, color, custom, stock, date_added) VALUES (?,?,?,?,?,?,?,?)";
     $stmt = $dbh->prepare($query);
     $stmt->execute([$name, $description, $file, $price, $color, $custom, $stock, $date_added]);
     exit();
  } else {
    header("Location: /Temp"); /* Redirect browser */
  }
?>
