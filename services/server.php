<?php

//需要执行的SQL语句
//单条
$sql="SELECT id, openId, nickname FROM user_info LIMIT 6";
//多条数据
//$sql="select id,name from tbl_user";

//调用conn.php文件进行数据库操作 
require('conn.php'); 

//提示操作成功信息，注意：$result存在于conn.php文件中，被调用出来 
if($result) 
{ 
//	$array=mysql_fetch_array($result,MYSQL_ASSOC);
	
		
	/*数据集*/

	$users=array();
	$i=0;
	while($row=mysql_fetch_array($result,MYSQL_ASSOC)){
		// echo $row['openId'].'-----------'.$row['nickname'].'</br>';
		$users[$i]=$row;
		$i++;
	}
	echo json_encode(array('dataList'=>$users));
	/*单条数据*/

	// $row=mysql_fetch_row($result,MYSQL_ASSOC);
	// 
	// echo json_encode(array('jsonObj'=>$row));
} 

mysql_free_result($result);
//释放结果
mysql_close();
//关闭连接

?>