<?php
        include 'mysql_vars_1.php';
        error_reporting(0);
        mysql_select_db($db, $connection);

        $resultado = mysql_query("SELECT * FROM Productos;");
        $todoArray = array();
        while($columna = mysql_fetch_array($resultado)) {
                $todoArray[] = array("id"=>$columna['id'],"Nombre"=> $columna['nombre'],"Cantidad"=>$columna['cantidad'],"Fecha"=>$columna['fecha_edicion']);
         }
        $returnItems = array( "resultado" => "...", "data" => $todoArray);
        $JSONResult = json_encode($returnItems);
        echo $JSONResult;
?>
