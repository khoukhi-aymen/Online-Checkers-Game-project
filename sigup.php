<?php require('actions/signUpAction.php');?>

<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css"/>
 </head>
<body>
  <br>
  <br>
<form class="container"  method="POST">
  <?php
      if(isset($errorMsj)){
        echo '<p>'.$errorMsj.'</p>';
      }
  ?>
  <h2>creer votre compte</h2>
  <div>
    <input type="text" name="pseudo" placeholder="pseudo"/>
  </div>
  <div>
    <input type="text" name="Nom" placeholder="Nom"/>
  </div>
  <div>
    <input type="text" name="prénom" placeholder="prénom"/>
  </div>
  <div>
    <input type="password" name="mdp" placeholder="mot de passe"/>
  </div>
  <button type="submit" name="validate">S'inscrire</button>
  <br>
  <br>
  <a href="sigin.php"><p>j'ai déja un compte, je me connecte</p></a>
</form>
</body>
</html>