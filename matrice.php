<?php
require('actions/database.php');
$data= $_POST["hidden"];
echo($data);
$temp = $bdd->prepare('UPDATE room SET mat=? WHERE id=?');
$temp->execute(array($data, $_SESSION['ret']));
file_put_contents("matrice.json", $data);