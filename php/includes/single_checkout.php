<?php
// directly in items
require_once '../config.php';
session_start();

if (isset($_GET['itemid']) && isset($_SESSION['userid'])) {
    $userid = $_SESSION['userid'];
    $itemid = $_GET['itemid'];
    $address = $_POST['address'];
    $date_added = date("Y-m-d H:i:s");
    $quantity = 1;

    $sql = "INSERT INTO orders (userid, itemid, address, date_added, quantity) VALUES (?,?,?,?,?)";
    $stmt = $dbh->prepare($sql);

    $stmt->execute([$userid, $itemid, $address, $date_added, $quantity]);
    $error = ['success' => 'success'];
        echo json_encode($error);
        exit();

} else {
    header("Location: /4MS"); /* Redirect browser */
}