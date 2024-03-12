<?php
try{
    ini_set('session.save_path',realpath(dirname($_SERVER['DOCUMENT_ROOT']) . '/../session'));
    session_start();
    $bdd = new PDO('mysql:host=localhost;dbname=forum;charset=utf8;', 'root', 'root');
}catch(Exception $e){
    die('une erreur a été trouvée! : '. $e->getMessage());
}