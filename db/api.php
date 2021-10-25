<?php
    include __DIR__.'/./open_connection.php';

    $method = $_GET['method'];

    $tableChosen = $_GET['tableChosen'];

    // prova
    // $tableChosen = 'coefficienti_prodotti';

    // $query = "INSERT INTO $tableChosen (coefficienti_id, prodotti_id, cliente, agente, accettazione, created_at) VALUES (2, 14, 'gino', 'marcello', 1, now())";

    // $newRecord = mysqli_query($myconn, $query) or die('Bad Query: '.$query);
    // ;

    // echo json_encode($query);     return;



    // if ($newRecord) {
    //     echo "Inserito correttamente";
    // } else {
    //     echo json_encode("Error: " . $query . "<br>" . mysqli_error($conn));
    // }

    // return;


    // fineprova

    switch ($method) {


        case 'get':

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
        break;

        case 'store':

            header('Content-Type: application/json');

            if ($tableChosen==='coefficienti_prodotti') {

                $query = "INSERT INTO $tableChosen (coefficienti_id, prodotti_id, cliente, agente, accettazione, created_at) VALUES (2, 14, 'gino', 'marcello', 1, now())";
            }

            $newRecord = mysqli_query($myconn, $query);
        
        
            if ($newRecord) {
                echo "Inserito correttamente";
              } else {
                echo json_encode("Error: " . $query . "<br>" . mysqli_error($conn));
              }
        break;

        
        default:
            # code...
        break;
    }


    include __DIR__.'/./close_connection.php';
?>

