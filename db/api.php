<?php
    include __DIR__.'/./open_connection.php';

    $tableChosen = $_GET['tableChosen'];

    $table = 'prodotti';

    $categoria = 'ALL-IN-ONE';
    

    header('Content-Type: application/json');

    $query = "SELECT * FROM `$table`";

    $researh = mysqli_query($myconn, $query) or die('Bad Query: '.$query);

    $result = array();

    while ($obj = mysqli_fetch_object($researh)) {
        $result[] = $obj;
    };
    
    print_r($result);

    if ($result) {
        # code...
        echo json_encode($result);
    }

    include __DIR__.'/./close_connection.php';
?>