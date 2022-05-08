<?php

require_once '../config.php';
session_start();

if (isset($_SESSION['userid'])) {
    $itemid = $_POST['itemid'];
    
    $sql = "DELETE FROM cart WHERE itemid = ?";
    $stmt = $dbh->prepare($sql);

    $stmt->execute([$itemid]);
    $error = ['success' => 'success'];
        echo json_encode($error);
        exit();

} else {
    header("Location: /4MS/home/"); /* Redirect browser */
}