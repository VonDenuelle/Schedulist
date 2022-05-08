<?php

require_once '../config.php';
session_start();

if (isset($_GET['itemid']) && isset($_SESSION['userid'])) {
    $userid = $_SESSION['userid'];
    $itemid = $_GET['itemid'];
    $date = date("Y-m-d H:i:s");
    $quantity = 1;

    $sql = "INSERT INTO cart (userid, itemid, quantity, date_added) VALUES (?,?,?,?)";
    $stmt = $dbh->prepare($sql);

    $stmt->execute([$userid, $itemid, $quantity, $date]);
    $error = ['success' => 'success'];
        echo json_encode($error);
        exit();

} else {
    header("Location: /4MS"); /* Redirect browser */
}