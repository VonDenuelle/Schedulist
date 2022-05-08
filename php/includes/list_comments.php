<?php
require_once '../config.php';

if (isset($_GET['itemid'])) {
    $sql  = 'SELECT 
    u.username as username,
    c.rating,
    c.comment,
    c.date
   FROM comments c
   LEFT JOIN users u on c.userid = u.id 
   WHERE c.itemid = '. $_GET['itemid'].'
   ORDER BY c.date DESC';

$query = $dbh -> query($sql);
$rowCount = $query -> rowCount();

    if ($rowCount > 0) {
        $row = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($row);
        exit();
    } else{
        $error = ["nocomments" => "No Comments Yet"];
        echo json_encode($error);
        exit();
    }
} else {
    header("Location: /4MS"); /* Redirect browser */
}
