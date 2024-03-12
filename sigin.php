<?php
require('actions/database.php');
?>
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
<form class="container" method="POST" target="sigin.php" action="actions/siginAction.php">
  <?php
      if(isset($_SESSION["error"])){
        echo '<p>'.$_SESSION["error"].'</p>';
      }
  ?>
  <div>
    <input type="text" name="pseudo" placeholder="pseudo"/>
  </div>
    <input type="password" placeholder="mot de passe" name="mdp">
  </div>
  <br>
  <button type="submit" class="btn btn-primary" name="validate">Se connecter</button>
  <br>
  <br>
  <a href="sigup.php"><p>je n'ai pas de compte, je m'incris</p></a>
</form>
</body>
</html>