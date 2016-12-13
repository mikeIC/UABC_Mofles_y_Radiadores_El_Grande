<?php
        include 'mysql_vars_1.php';

        $nombre = formatInput($_GET['nombre']);
        $cantidad = formatInput($_GET['cantidad']);
        date_default_timezone_set("America/Tijuana");
        $fecha = date("Y/m/d");


        error_reporting(0);
        mysql_select_db($db, $connection);


        if($cantidad <= 0)
        {
          $addItemResult = "Error la cantidad agregada es incorrecta";
          mysql_close($connection);
          $JSONResult = json_encode($addItemResult);
          echo $JSONResult;
        }
        else
        {
          $resultado = mysql_query("INSERT INTO Productos (nombre,cantidad,fecha_edicion)VALUES ('".$nombre."','".$cantidad."','".$fecha."');");
          $addItemResult = array("resultado" => "exito", "val" => $resultado);
          mysql_close($connection);
          $JSONResult = json_encode($addItemResult);
          echo $JSONResult;
        }

        //}
       // else
       // {
       //   $addItemResult = array("resultado" => "error", "val" => mysql_error());
       //   mysql_close($connection);
       //   $JSONResult = json_encode($addItemResult);
       //   echo $JSONResult;
       // }

?>
