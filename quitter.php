<?php 
require("actions/database.php");
$temp = $_SESSION['ret'];
$req = $bdd->prepare('UPDATE room SET complet=?, user1=?, user2=?, mat=? WHERE id=?');
$req->execute(array(0, NULL, NULL, NULL, $temp));
header('Location: room.php');
