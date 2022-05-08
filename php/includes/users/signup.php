<?php

require_once '../../config.php';

$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$firstname = $_POST["firstname"];
$middlename = $_POST["middlename"];
$lastname = $_POST["lastname"];
$age = $_POST["age"];
$gender = $_POST["gender"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$address1 = $_POST["address1"];
$address2 = $_POST["address2"];
$username = $_POST["username"];
$password = $_POST["password"];
$repassword = $_POST["repassword"];

if (isset($firstname)) {
    if (empty($firstname) || empty($middlename) || empty($lastname) || empty($age) || empty($gender) ||
      empty($phone) || empty($email) || empty($address1) || empty($address2) || empty($username) ||
      empty($password) || empty($repassword)) {
        $error = ['emptyfields' => 'Please fill in all the fields'];
        echo json_encode($error);
        exit();
    } elseif (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $username) || strlen($username) < 6) {
        $error = ['invalidusername' => 'Invalid username, should not contain symbols and must be atleast 6 characters'];
        echo json_encode($error);
        exit();
    } elseif (strlen($username) > 25) {
        $error = ['usernametoolong' => 'Username is too long(max 25)'];
        echo json_encode($error);
        exit();
    } elseif ($password !== $repassword) {
        $error = ['passwordnotmatch' => 'Password do not match'];
        echo json_encode($error);
        exit();
    } else {
        // Validate password strength
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);
        $specialChars = preg_match('@[^\w]@', $password);

        if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
            $error = ['passwordstr' => 'Password should be at least 8 characters in length and should
            include at least one upper case letter, one number, and one special character'];
            echo json_encode($error);
            exit();
        } else {
            $sql = "SELECT username FROM users WHERE username=?"; //checks if username is taken
            $stmt = $dbh->prepare($sql);

            $stmt->execute([$username]);
            $rowCount = $stmt->rowCount(); //get row count

            if ($rowCount > 0) {
                $error = ['usernametaken' => 'Username already taken'];
                echo json_encode($error);
                exit();
            } else {
                $sql = "INSERT INTO users (firstname, middlename, lastname, age, gender, phone, email, address1, address2, username, password) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                $stmt = $dbh->prepare($sql);

                // hash password
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt->execute([$firstname, $middlename, $lastname, $age, $gender, $phone, $email, $address1, $address2, $username, $hashedPassword]);

        //immediately transfer to another page with session started
                $insertedID = $dbh->lastInsertId();
                $query = 'SELECT * FROM users WHERE Id = '.$insertedID;
                $stmt = $dbh->query($query);

                $row = $stmt->fetch(); 
                session_start();
                $_SESSION['userid']= $row['id'];
                $_SESSION['username']= $row['username'];
                $_SESSION['email']= $row['email'];

                $error = ['success' => 'success'];
                echo json_encode($error);
                exit();
            }
            exit();
        }
    }
} else {
    header("Location: /4MS"); /* Redirect browser */
}
