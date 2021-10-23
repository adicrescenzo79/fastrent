<?php
    include __DIR__.'/./open_connection.php';

    $tableChosen = $_GET['tableChosen'];

    header('Content-Type: application/json');

    $query = "SELECT * FROM `$tableChosen`";

    $researh = mysqli_query($myconn, $query) or die('Bad Query: '.$query);

    $result = array();

    while ($obj = mysqli_fetch_object($researh)) {
        $result[] = $obj;
    };
    
    if ($result) {
        echo json_encode($result);
    }

    include __DIR__.'/./close_connection.php';
?>