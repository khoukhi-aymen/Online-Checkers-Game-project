<?php
require('actions/database.php');
//Validation du formulaire
if(isset($_POST['validate'])){
    //Vérifier si l'user a bien complété tout les chmaps du formulaire
    if(!empty($_POST['pseudo']) AND !empty($_POST['Nom']) AND !empty($_POST['prénom']) AND !empty($_POST['mdp'])){
        //les données de l'user
        $user_pseudo = htmlspecialchars($_POST['pseudo']);
        $user_Nom = htmlspecialchars($_POST['Nom']);
        $user_prenom = htmlspecialchars($_POST['prénom']);
        $user_mdp = password_hash($_POST['mdp'],PASSWORD_DEFAULT);

        //vérifier si l'utilisateur existe déja

        $checkIfUserAlreadyExist = $bdd->prepare('SELECT pseudo FROM users WHERE pseudo = ?');
        $checkIfUserAlreadyExist->execute(array($user_pseudo));
        if($checkIfUserAlreadyExist->rowCount() == 0){
            //insérer l'utilisateur dans la BDD
            $insertUserOnWebsite = $bdd->prepare('INSERT INTO users(pseudo,Nom,prénom,mdp) VALUES(?,?,?,?)');
            $insertUserOnWebsite->execute(array($user_pseudo, $user_Nom, $user_prenom, $user_mdp));

            //Récépurer les informations de l'utilisateur

            $getInfoOfThisUserrequet = $bdd->prepare('SELECT id,Nom,prénom,pseudo FROM users WHERE Nom = ? AND prénom = ? AND pseudo = ?');
            $getInfoOfThisUserrequet->execute(array($user_Nom,$user_prenom,$user_pseudo));
            $userInfo = $getInfoOfThisUserrequet->fetch();

            //Authentifier l'utilsateur sur le site et récupérer ses données dans des varibales globales sessions
            $_SESSION['auth'] = true;
            $_SESSION['id'] = $userInfo['id'];
            $_SESSION['Nom'] = $userInfo['Nom'];
            $_SESSION['prénom'] = $userInfo['prénom'];
            $_SESSION['pseudo'] = $userInfo['pseudo'];

            //rederiger l'utilsateur vers la page de connexion
            header('Location: sigin.php');

        }else{
            $errorMsj = "l'utilisateur existe déja sur le site";
        }   
    }else{
        $errorMsj = "Veuillez complétez tous les champs...";
    }
}