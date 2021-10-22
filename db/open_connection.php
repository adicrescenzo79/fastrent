<?php
    $myconn = mysql_connect('localhost', 'root', 'root') or die('Errore connessione a localhost');
    mysql_select_db('fastrent', $myconn) or die('Errore connessione al DB ');        
?>