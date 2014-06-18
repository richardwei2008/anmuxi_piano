<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>安慕希·不踩白格-排名</title>
    </head>
    <body>我的游戏排名 <?php
        require_once("services/db.php");

        echo htmlentities($_GET["user"]) . "<br/>";

        $userID = UserDB::getInstance()->get_user_id_by_name($_GET["user"]);
        if (!$userID) {
            exit("The person " . $_GET["user"] . " is not found. Please check the spelling and try again");
        }
        ?>

        <table border="black">
            <tr>
				<th>Id</th>
                <th>Open Id</th>
                <th>Nickname</th>
            </tr>
            <?php
            $result = UserDB::getInstance()->get_users_by_user_id($userID);
            while ($row = mysqli_fetch_array($result)) {
                echo "<tr><td>" . htmlentities($row["id"]) . "</td>";
                echo "<td>" . htmlentities($row["openId"]) . "</td>";
				echo "<td>" . htmlentities($row["nickname"]) . "</td></tr>\n";
            }
            mysqli_free_result($result);
            ?>
        </table>
		总榜
		 <table border="black">
            <tr>
				<th>Id</th>
                <th>Open Id</th>
                <th>Nickname</th>
            </tr>
			
            <?php
            $result = UserDB::getInstance()->get_users();
            while ($row = mysqli_fetch_array($result)) {
                echo "<tr><td>" . htmlentities($row["id"]) . "</td>";
                echo "<td>" . htmlentities($row["openId"]) . "</td>";
				echo "<td>" . htmlentities($row["nickname"]) . "</td></tr>\n";
            }
            mysqli_free_result($result);
            ?>
			
        </table>
    </body>
</html>