<?php
        include 'mysql_vars_1.php';
        $nombre = formatInput($_GET['nombre']);
        $newnombre = formatInput($_GET['newnombre']);
        $cantidad = formatInput($_GET['cantidad']);
        date_default_timezone_set("America/Tijuana");
        $fecha = date("Y/m/d");
        echo "Nombre:"+$nombre;
        mysql_select_db($db, $connection);
        error_reporting(0);



        if($cantidad <=0)
        {
          $editItemResult = "Error la cantidad agregada es incorrecta";
          mysql_close($connection);
          $JSONResult = json_encode($addItemResult);
          echo $JSONResult;
        }
        else
        {
          $resultado = mysql_query("UPDATE Productos SET nombre = '".$newnombre."',cantidad='".$cantidad."',fecha_edicion='".$fecha."' WHERE nombre = '".$nombre."';");
          $editItemResult = array("resultado" => "exito", "val" => $resultado);
          mysql_close($connection);
          $JSONResult = json_encode($editItemResult);
          echo $JSONResult;
        }
        //else{
        //        $editItemResult = array("resultado" => "error", "val" => mysql_error());
        //        mysql_close($connection);
        //        $JSONResult = json_encode($editItemResult);
        //        echo $JSONResult;
        //}
?>
