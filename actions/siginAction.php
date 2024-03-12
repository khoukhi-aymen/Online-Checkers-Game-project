<?php
require('database.php');
//Validation du formulaire
if(isset($_POST['validate'])){
    //Vérifier si l'user a bien complété tout les chmaps du formulaire
    if(!empty($_POST['pseudo']) AND !empty($_POST['mdp'])){
        //les données de l'user
        $user_pseudo = htmlspecialchars($_POST['pseudo']);
        $user_mdp = htmlspecialchars($_POST['mdp']);
        //vérifier si l'utilisateur existe déja(si le pseudo est correct)

        $checkifUserExist = $bdd->prepare('SELECT * FROM users WHERE pseudo = ?');
        $checkifUserExist->execute(array($user_pseudo));

        if($checkifUserExist->rowCount() > 0){
            //Récépurer les informations de l'utilisateur

            $user_info = $checkifUserExist->fetch();
            //verifier si le mot de passe est correcte

            if(password_verify($user_mdp, $user_info['mdp'])){
               //Authentifier l'utilsateur sur le site et récupérer ses données dans des varibales globales sessions
               $_SESSION['auth'] = true;
               $_SESSION['id'] = $user_info['id'];
               $_SESSION['Nom'] = $user_info['Nom'];
               $_SESSION['prénom'] = $user_info['prénom'];
               $_SESSION['pseudo'] = $user_info['pseudo'];
               $_SESSION['error'] = "";
               //rederiger l'utilisateur vers la page d'acceuil
               header('Location: ../room.php');
            }else{
                $errorMsj = "votre mot de passe est incorrect..."; 
                $_SESSION["error"]=$errorMsj;
                header('Location: ../sigin.php');
            }

        }else{
            $errorMsj = "votre pseudo est incorrect...";
            $_SESSION["error"]=$errorMsj;
            header('Location: ../sigin.php');

        }

 
    }else{
        $errorMsj = "Veuillez complétez tous les champs...";
        $_SESSION["error"]=$errorMsj;
        header('Location: ../sigin.php');
    }
}