<?php
        include 'mysql_vars_1.php';
        $num_orden = formatInput($_GET['num_orden']);
        $folio = formatInput($_GET['folio']);
        $fechaEntrega = formatInput($_GET['fechaEntrega']);
        $nombre = formatInput($_GET['nombre']);
        $telefono = formatInput($_GET['telefono']);
        $vehiculo = formatInput($_GET['vehiculo']);
        $servicios = formatInput($_GET['servicios']);
        $productos = formatInput($_GET['productos']);
        $descripcion = formatInput($_GET['descripcion']);
        $observaciones = formatInput($_GET['observaciones']);
        $adelanto = formatInput($_GET['adelanto']);
        $restante = formatInput($_GET['restante']);
        $total = formatInput($_GET['total']);

        date_default_timezone_set("America/Tijuana");
        $fechaRecepcion = date("Y/m/d");
        error_reporting(0);
        mysql_select_db($db, $connection);

        $resultado = mysql_query("INSERT INTO OrdenTrabajo (num_orden,folio,fecha_recepcion,fecha_entrega,
          nom_cliente,
          tel_cliente,
          vehiculo,
          servicios,
          productos,
          descripcion,
          observaciones,
          adelanto,
          restante,
          total)VALUES ('".$num_orden."','".
          $folio."','".
          $fechaRecepcion."','".
          $fechaEntrega."','".
          $nombre."','".
          $telefono."','".
          $vehiculo."','".
          $servicios."','".
          $productos."','".
          $descripcion."','".
          $observaciones."','".
          $adelanto."','".
          $restante."','".
          $total."');");


        if($resultado){
                $addItemResult = array(	"resultado" => "exito", "val" => $resultado);
                mysql_close($connection);
                $JSONResult = json_encode($addItemResult);
                echo $JSONResult;
        }else{
                $addItemResult = array(	"resultado" => "error", "val" => mysql_error());
                mysql_close($connection);
                $JSONResult = json_encode($addItemResult);
                echo $JSONResult;
        }

?>
