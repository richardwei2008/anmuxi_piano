<?php 
require('conn.php'); 
$jsonPOST = json_decode(file_get_contents("php://input"));
// $jsonPOST->nickname = 'ServerUser';
$score=$jsonPOST->score;
$subscribe=$jsonPOST->subscribe;
$openId=$jsonPOST->openid;
$nickname=$jsonPOST->nickname; 
$sex = $jsonPOST->sex;
$language = $jsonPOST->language;
$city = $jsonPOST->city;
$province = $jsonPOST->province;
$country = $jsonPOST->country;
$headimgurl = $jsonPOST->headimgurl;
$subscribe_time = $jsonPOST->subscribe_time;
$sql_query = "SELECT info.id, info.openId, nickname, info.headimgurl, info.score FROM user_info info WHERE openid = '$openId'";
$sql_insert = "INSERT INTO user_info (score, subscribe, openid, nickname, sex, language, city, province, country, headimgurl, subscribe_time) VALUES ($score, '$subscribe', '$openId', '$nickname', $sex, '$language', '$city', '$province', '$country', '$headimgurl', $subscribe_time)";
$sql_update = "UPDATE user_info set score = $score, subscribe = '$subscribe', nickname = '$nickname', sex=$sex, language='$language', city='$city', province='$province', country='$country', headimgurl='$headimgurl', subscribe_time=$subscribe_time WHERE openid = '$openId'";

$result = mysqli_query($mysqli_con, $sql_query);
$me = mysqli_fetch_object($result);
echo json_encode(array('me'=>$me, 'openid' => $openId, 'sql'=>$sql_query));
if (null != $openId && "" != $openId) {
	if ($me == null) {
		if (mysqli_query($mysqli_con, $sql_insert)) {
			echo json_encode(array('user'=>$jsonPOST, 'me'=>$me, 'message'=>"Successfully inserted ". mysqli_affected_rows($mysqli_con)."row"));
		} else {
			echo "Error occurred: " . mysqli_error($mysqli_con);
		}
	} else if ($me->score <= $score) {
		if (mysqli_query($mysqli_con, $sql_update)) {
			echo json_encode(array('user'=>$jsonPOST, 'me'=>$me, 'message'=>"Successfully updated ". mysqli_affected_rows($mysqli_con)."row"));
		} else {
			echo "Error occurred: " . mysqli_error($mysqli_con);
		}
	}
} else {
	echo json_encode(array('user'=>$jsonPOST, 'me'=>$me, 'message'=>"Invalid Open Id [".$openId."]"));
}


mysqli_close($mysqli_con);
?>