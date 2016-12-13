<?php
        include 'mysql_vars_1.php';
        $nombre = formatInput($_GET['nombre']);
        error_reporting(0);

        mysql_select_db($db, $connection);

        if(!empty($nombre))
        {
          $resultado = mysql_query("DELETE FROM Productos WHERE nombre = '".$nombre."';");
          $addItemResult = array(	"resultado" => "exito", "val" => $resultado);
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
