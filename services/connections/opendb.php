<?php
// This is an example opendb.php
$conn = mysql_connect($dbHost, $dbUser, $dbPass) or die ('Error connecting to mysql');
mysql_select_db($dbName);
?> 