<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>安慕希·不踩白格-排名</title>
    </head>
	<script src="js/jquery.min.js"></script>
	<script src="js/json2.js"></script>
	<script type="text/javascript"> 
	$(window).load(function () {
			$.getJSON("services/server.php", function(json){ 
				alert(JSON.stringify(json));
			});

			$.ajax({
				type : "Get",
				url : "services/server.php",
				// data : "nbw=" + nbw,
				datatype : "json",
				success : function (response) {
					alert(response);
					var responseObj = JSON.parse(response);
					$(responseObj.dataList).each(function(i, user) { 
						alert("OpenId: " + user.openId + " Nickname: " + user.nickname);
					}); 
				},
				error : function (xhr, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		});
	</script>
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
		<ul id="userlist"> 
   <li><a href="#" rel="1">张三</a></li> 
   <li><a href="#" rel="2">李四</a></li> 
   <li><a href="#" rel="3">王五</a></li> 
</ul> 
<div id="info"> 
   <p>姓名：<span id="name"></span></p> 
   <p>性别：<span id="sex"></span></p> 
   <p>电话：<span id="tel"></span></p> 
   <p>邮箱：<span id="email"></span></p> 
</div>
    </body>
</html>