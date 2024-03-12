<?php
require("actions/database.php");
$temp = $bdd->prepare('SELECT mat FROM room WHERE id=?');
$temp->execute(array($_SESSION['ret']));
$arr = $temp->fetch();
echo($arr[0]);
?>