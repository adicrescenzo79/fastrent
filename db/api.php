<?php
    include __DIR__.'/./open_connection.php';

    $method = $_GET['method'];

    $tableChosen = $_GET['tableChosen'];

    // prova
    // fineprova

    switch ($method) {


        case 'get':

            header('Content-Type: application/json');

            if ($tableChosen==='coefficienti_prodotti'){

                $query = "SELECT * FROM coefficienti_prodotti AS CP, prodotti AS P, coefficienti as C WHERE CP.prodotti_id = P.id AND CP.coefficienti_id = C.id";

            } else {
                $query = "SELECT * FROM `$tableChosen`";
            }

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

                //  echo $tableChosen; return;


                $coefficienti_id = $_GET['coefficienti_id'];

                $prodotti_id = $_GET['prodotti_id'];

                $agente = $_GET['agente'];

                $cliente = $_GET['cliente'];

                $accettazione = $_GET['accettazione'];

                
                
                
                if (isset($_GET['fakeDate'])) {
                    
                    $fakeDate = $_GET['fakeDate'];
                    
                    $query = "INSERT INTO $tableChosen (coefficienti_id, prodotti_id, cliente, agente, accettazione, created_at) VALUES ($coefficienti_id,  $prodotti_id, '$cliente', '$agente', $accettazione, '$fakeDate')";
                    
                } else {

                    $query = "INSERT INTO $tableChosen (coefficienti_id, prodotti_id, cliente, agente, accettazione, created_at) VALUES ($coefficienti_id,  $prodotti_id, '$cliente', '$agente', $accettazione, now())";
                }
                

            }

            $newRecord = mysqli_query($myconn, $query);

            $success = false;

            if ($newRecord) {
                $success = true;
                echo $success;
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

