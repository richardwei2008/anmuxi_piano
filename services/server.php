<?php

//��Ҫִ�е�SQL���
//����
$sql="SELECT id, openId, nickname FROM user_info LIMIT 6";
//��������
//$sql="select id,name from tbl_user";

//����conn.php�ļ��������ݿ���� 
require('conn.php'); 

//��ʾ�����ɹ���Ϣ��ע�⣺$result������conn.php�ļ��У������ó��� 
if($result) 
{ 
//	$array=mysql_fetch_array($result,MYSQL_ASSOC);
	
		
	/*���ݼ�*/

	$users=array();
	$i=0;
	while($row=mysql_fetch_array($result,MYSQL_ASSOC)){
		// echo $row['openId'].'-----------'.$row['nickname'].'</br>';
		$users[$i]=$row;
		$i++;
	}
	echo json_encode(array('dataList'=>$users));
	/*��������*/

	// $row=mysql_fetch_row($result,MYSQL_ASSOC);
	// 
	// echo json_encode(array('jsonObj'=>$row));
} 

mysql_free_result($result);
//�ͷŽ��
mysql_close();
//�ر�����

?>