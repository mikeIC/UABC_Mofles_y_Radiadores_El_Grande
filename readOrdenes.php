<?php
        include 'mysql_vars_1.php';
        error_reporting(0);
        mysql_select_db($db, $connection);

        $resultado = mysql_query("SELECT * FROM OrdenTrabajo;");
        $todoArray = array();
        while($columna = mysql_fetch_array($resultado)) {
                $todoArray[] = array("id"=>$columna['id'],
                "NumOrden"=> $columna['num_orden'],
                "Folio"=>$columna['folio'],
                "FechaRecepcion"=>$columna['fecha_recepcion'],
                "FechaEntrega"=>$columna['fecha_entrega'],
                "NombreCliente"=>$columna['nom_cliente'],
                "TelCliente"=>$columna['tel_cliente'],
                "Vehiculo"=>$columna['vehiculo'],
                "Servicios"=>$columna['servicios'],
                "Productos"=>$columna['productos'],
                "Descripcion"=>$columna['descripcion'],
                "Observaciones"=>$columna['observaciones'],
                "Adelanto"=>$columna['adelanto'],
                "Restante"=>$columna['restante'],
                "Total"=>$columna['total']);
         }
        $returnItems = array( "resultado" => "...", "data" => $todoArray);
        $JSONResult = json_encode($returnItems);
        echo $JSONResult;
?>
