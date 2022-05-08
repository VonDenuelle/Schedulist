<?php

require_once '../config.php';
session_start();

if (isset($_SESSION['userid'])) {
    $quantity = $_POST['quantity'] + 1;
    $itemid = $_POST['itemid'];
    
    $sql = "SELECT stock FROM items WHERE id = ".$itemid;
    $query = $dbh -> query($sql);
    $row = $query->fetch(PDO::FETCH_ASSOC);

    if ($row['stock'] - $quantity < 0) {
        $error = ['outofstock' => 'Cannot Proceed, Out of Stock'];
        echo json_encode($error);
        exit();
    } else {

        $sql = "UPDATE cart SET quantity = ? WHERE itemid = ?";
        $stmt = $dbh->prepare($sql);
    
        $stmt->execute([$quantity, $itemid]);
        $error = ['success' => $quantity, 'item' => $itemid];
            echo json_encode($error);
            exit();
    }


} else {
    header("Location: /4MS/home/"); /* Redirect browser */
}