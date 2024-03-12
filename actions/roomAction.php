
<?php
require('database.php');
//Validation du formulaire
    //Vérifier si l'user a bien complété tout les chmaps du formulaire
        $checkifRoomExist = $bdd->prepare('SELECT id, user1, user2, complet FROM room');
        $checkifRoomExist->execute();

        if($checkifRoomExist->rowCount() > 0){
            //Récépurer les informations de l'utilisateur
            $room_info =$checkifRoomExist->fetchAll(PDO::FETCH_ASSOC);
            
               //rederiger l'utilisateur vers la page d'acceuil

               
            }
   
       
        
        else{
            $error_msg = "no error";


 }