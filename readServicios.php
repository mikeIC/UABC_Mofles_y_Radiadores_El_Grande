<?php  
        include 'mysql_vars_1.php';
        error_reporting(0);
        mysql_select_db($db, $connection);

        $resultado = mysql_query("SELECT * FROM Servicios;");
        $todoArray = array();
        while($columna = mysql_fetch_array($resultado)) {
                $todoArray[] = array("id"=>$columna['id'],"nombre"=> $columna['nombre'],"meses"=>$columna['meses_garantia']);
         }
        $returnItems = array( "resultado" => "...", "data" => $todoArray);
        $JSONResult = json_encode($returnItems);
        echo $JSONResult;
?>
