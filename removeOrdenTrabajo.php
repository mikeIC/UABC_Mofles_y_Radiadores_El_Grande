<?php
        include 'mysql_vars_1.php';
        $nombre = formatInput($_GET['nombre']);
        $telefono = formatInput($_GET['telefono']);
        error_reporting(0);

        mysql_select_db($db, $connection);

        if(!empty($nombre))
        {
          $resultado = mysql_query("DELETE FROM OrdenTrabajo WHERE nom_cliente = '".$nombre."' AND tel_cliente = '".$telefono."';");
          $addItemResult = array("resultado" => "exito", "val" => $resultado);
          mysql_close($connection);
          $JSONResult = json_encode($addItemResult);
          echo $JSONResult;
        }
        else
        {
          $editItemResult = "Error el nombre no existe";
          mysql_close($connection);
          $JSONResult = json_encode($addItemResult);
          echo $JSONResult;

        }

?>
