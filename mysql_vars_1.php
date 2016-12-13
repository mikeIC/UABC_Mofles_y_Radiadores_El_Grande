<?php
        error_reporting(0);
	$dbUsername = "2197837_mr1";
	$dbPassword = "e09280258";
	$db = "2197837_mr1";
	$server = "fdb15.awardspace.net";
        $connection = mysql_connect($server, $dbUsername, $dbPassword);

	function formatInput($rawURLData)
	{
                  $data = trim($data);
                  $data = stripslashes($data);
                  $data = htmlspecialchars($data);
		return $rawURLData;
	}
?>
