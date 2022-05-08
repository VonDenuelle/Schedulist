<?php

require_once '../config.php';
session_start();

if (isset($_SESSION['userid'])) {
    $quantity = $_POST['quantity'] - 1;
    $itemid = $_POST['itemid'];
    
    $sql = "UPDATE cart SET quantity = ? WHERE itemid = ?";
    $stmt = $dbh->prepare($sql);

    $stmt->execute([$quantity, $itemid]);
    $error = ['success' => $quantity, 'item' => $itemid];
        echo json_encode($error);
        exit();

} else {
    header("Location: /4MS/home/"); /* Redirect browser */
}