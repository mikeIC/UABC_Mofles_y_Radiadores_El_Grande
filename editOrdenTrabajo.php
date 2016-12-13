<?php
        include 'mysql_vars_1.php';

        $oldnom = formatInput($_GET['oldnom']);
        $oldtel = formatInput($_GET['oldtel']);

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

        error_reporting(0);
        mysql_select_db($db, $connection);

        $resultado = mysql_query("UPDATE OrdenTrabajo SET
		fecha_entrega = '".$fechaEntrega."',
          nom_cliente = '".$nombre."',
          tel_cliente= '".$telefono."',
          vehiculo = '".$vehiculo."',
          servicios= '".$servicios."',
          productos = '".$productos."',
          descripcion = '".$descripcion."',
          observaciones = '".$observaciones."',
          adelanto = '".$adelanto."',
          restante = '".$restante."',
          total = '".$total."' WHERE nom_cliente= '".oldnom."' AND tel_cliente = '".oldtel."';");


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
