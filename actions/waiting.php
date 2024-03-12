<?php 
require('database.php');
echo $_POST['ret'];
echo $_SESSION['pseudo'];
$temp = $bdd->prepare('SELECT * FROM room WHERE id=?');
$temp->execute(array($_POST['ret']));
$room = $temp->fetch();
$upd1 = $bdd->prepare('UPDATE room SET user1=?, complet=? WHERE id=?');
$upd2 = $bdd->prepare('UPDATE room SET user2=?, complet=? WHERE id=?');
if($room['user1']==NULL){
$room['user1']=$_SESSION['pseudo'];
$room['complet']++;
$upd1->execute(array($room['user1'], $room['complet'], $_POST['ret']));
$_SESSION['ret']=$_POST['ret'];
header('Location: ../attente.php');
}
elseif($room['user2']==NULL){
$room['user2']=$_SESSION['pseudo'];
$room['complet']++;
$_SESSION['ret']=$_POST['ret'];
$upd2->execute(array($room['user2'], $room['complet'], $_POST['ret']));
header('Location: ../damme.php');
}
else{
  echo 'cette room est complete';
  sleep(2);
  header('Location : ../room.php');
  }
