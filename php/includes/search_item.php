<?php
require_once '../config.php';

if (isset($_POST['search'])) {
    $keyword = $_POST['search'];

    $sql = "SELECT name,id FROM items WHERE name LIKE '%$keyword%'";
    $query = $dbh -> query($sql);
    $row = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($row);
        exit();
}
