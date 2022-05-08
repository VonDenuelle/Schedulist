<?php

require_once '../../config.php';

$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$username = $_POST['username'];
$password = $_POST['password'];

if (isset($_POST['username'])) {
    if (empty($username) || empty($password)) {
        $error =['emptyfields'=>'Please fill in all the fields'];
        echo json_encode($error);
        exit();
    } else {
        $sql = "SELECT * FROM users WHERE username=?";
        $stmt = $dbh->prepare($sql);

        $stmt->execute([$username]);

        if ($row = $stmt->fetch()) {
            $passwordCheck = password_verify($password, $row['password']);
            if ($passwordCheck) {
                session_start();
                $_SESSION['userid']= $row['id'];
                $_SESSION['username']= $row['username'];
                $_SESSION['email']= $row['email'];

                $error = ['success' => 'success'];
                echo json_encode($error);
                exit();
            } else {
                $error = ['passwordnotmatch' => 'Password do not match'];
                echo json_encode($error);
                exit();
            }
        } else {
            $error = ['nouser' => 'No user match detected'];
            echo json_encode($error);
            exit();
        }
    }
} else {
    header("Location: /4MS"); /* Redirect browser */
}
