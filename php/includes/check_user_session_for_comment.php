<?php

session_start();

if (isset($_SESSION['userid'])) {
  // code...
  $error = ["sessionispressent" => "User Session is Present"];
  echo json_encode($error);
} else {
  $error = ["sessionnotpresent" => "User Session is Not Present"];
  echo json_encode($error);
  
}
