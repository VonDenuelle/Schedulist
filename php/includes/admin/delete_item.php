<?php
require_once '../../config.php';

if (isset($_GET['itemid']) && isset($_GET['image'])) {
    $sql = "DELETE FROM items WHERE id = ?";
    $stmt = $dbh->prepare($sql);

    $path = "../../../images/flowers/".$_GET['image'];
    
    if ($stmt->execute([$_GET['itemid']]) && unlink($path)) {
        $error = ["success" => "success"];
        echo json_encode($error);

        header("Location: /Temp"); /* Redirect browser */
        exit();
    }else{
        $error = ["cantdelete" => "Unable to delete item"];
        echo json_encode($error);

        header("Location: /Temp"); /* Redirect browser */
        exit();
    }
} else {
    header("Location: /Temp/home/"); /* Redirect browser */
}
