﻿<?php

//需要执行的SQL语句
//单条
$openId = "openid1";
$sql="SELECT id, openId, nickname FROM user_info LIMIT 6";
$sql_me="SELECT info.id, info.openId, nickname, info.headimgurl, s.score FROM user_info info, user_score s where info.openId = '$openId'";
$sql_global="SELECT info.id, info.openId, nickname, info.headimgurl, s.score FROM user_info info, user_score s where info.id = s.userid ORDER BY s.score LIMIT 6";
$sql_total="SELECT count(info.id) as value FROM user_info info ";
//多条数据
//$sql="select id,name from tbl_user";

//调用conn.php文件进行数据库操作 
require('conn.php'); 



//执行SQL语句(查询) 
$result_me = mysql_query($sql_me) or die('数据库查询失败！</br>错误原因：'.mysql_error()); 
$result_global = mysql_query($sql_global) or die('数据库查询失败！</br>错误原因：'.mysql_error()); 
$result_total= mysql_query($sql_total) or die('数据库查询失败！</br>错误原因：'.mysql_error()); 
//提示操作成功信息，注意：$result存在于conn.php文件中，被调用出来 
if($result_global) 
{ 
//	$array=mysql_fetch_array($result,MYSQL_ASSOC);
	/*数据集*/
	$me = mysql_fetch_object($result_me);
	$totalObj = mysql_fetch_object($result_total);
	// echo json_encode($me);
	
	$users=array();
	$i=0;	
	while($row=mysql_fetch_array($result_global, MYSQL_ASSOC)){
		// echo $row['openId'].'-----------'.$row['nickname'].'</br>';
		$users[$i]=$row;
		$i++;
	}
	echo json_encode(array('dataList'=>$users, 'me'=>$me, 'total'=>$totalObj)); //
	/*单条数据*/

	// $row=mysql_fetch_row($result,MYSQL_ASSOC);
	// 
	// echo json_encode(array('jsonObj'=>$row));
} 
mysql_free_result($result_me);
mysql_free_result($result_global);
mysql_free_result($result_total);
//释放结果
mysql_close();
//关闭连接

?>