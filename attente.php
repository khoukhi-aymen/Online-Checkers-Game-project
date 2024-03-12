<?php 
require('actions/database.php');
echo 'attente du 2eme joueur';
$tem = $bdd->prepare('SELECT * FROM room where id=?');
$sess = $_SESSION['ret'];
$tem->execute(array($sess));

$room = $tem->fetch();
echo $room['complet'];

if($room['complet'] != 2){
sleep(1);    
header('Location: attente.php');
}
else{
sleep(2);
header('Location: damme.php');
exit();
}