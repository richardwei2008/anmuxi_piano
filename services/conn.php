<?php
//�������ݿ���� 
$db_host   = 'localhost';  //���ݿ��������ƣ�һ�㶼Ϊlocalhost 
$db_user   = 'root';        //���ݿ��û��ʺţ����ݸ���������� 
$db_passw = 'AbC123';   //���ݿ��û����룬���ݸ���������� 
$db_name  = 'app_beyondwechattest';         //���ݿ�������ƣ��ԸղŴ��������ݿ�Ϊ׼


//�������ݿ� 
$conn = mysql_connect($db_host,$db_user,$db_passw) or die ('���ݿ�����ʧ�ܣ�</br>����ԭ��'.mysql_error()); 


//�����ַ�������utf8��gbk�ȣ��������ݿ���ַ������� 
mysql_query("set names 'utf8'"); 


//ѡ�����ݿ� 
mysql_select_db($db_name,$conn) or die('���ݿ�ѡ��ʧ�ܣ�</br>����ԭ��'.mysql_error()); 


//ִ��SQL���(��ѯ) 
$result = mysql_query($sql) or die('���ݿ��ѯʧ�ܣ�</br>����ԭ��'.mysql_error()); 


//˵������δ��뱾��û��ʲô���ã���Ϊ��Ҫ�����õ�������ֻ��Ϊ�˼��ٹ����������ظ�д�������԰���ר�ŷ���һ���ļ�������Ϳ�����ʱ�����ˡ���ֻ��Ҫ���ݸ��������һ�¡��������ݿ�������͡������ַ������Ĳ��־Ϳ����ˡ�
?>