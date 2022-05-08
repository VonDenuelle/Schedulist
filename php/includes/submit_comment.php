<?php
require_once '../config.php';

session_start();


if(isset($_GET['comment']) && isset($_SESSION['userid'])){
    $comment = $_GET['comment'];
    $rating = $_GET['rating'];
    $userid = $_SESSION['userid'];
    $itemid = $_GET['itemid'];
    $date = date("Y-m-d H:i:s");

    if (empty($comment) || empty($rating)) {
        $error = ['emptyfields' => 'Please fill in all the fields'];
        echo json_encode($error);
        exit();
    } else {
        $sql = "INSERT INTO comments (userid, itemid, rating, comment, date) VALUES (?,?,?,?,?)";
               
        $stmt = $dbh->prepare($sql);

        $stmt->execute([$userid, $itemid, $rating, $comment, $date]);
        $error = ['success' => 'success'];
        echo json_encode($error);
        exit();
    }
    
} else {
    header("Location: /4MS/comments?itemid=".$itemid); /* Redirect browser */
}