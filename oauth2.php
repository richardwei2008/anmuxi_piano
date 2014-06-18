<?php 
	$code = $_GET['code']; //前端传来的code值
	$appid = "wxc63c757bdae5dd41";
	$appsecret = "fa68568880b31435badf3070cdd27a54";//获取openid
	$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
	$result = https_request($url);
	$jsoninfo = json_decode($result, true);
	$openid = $jsoninfo["openid"]; //从返回json结果中读出openid
	$callback=$_GET['callback'];  // 
	echo $callback."({result:'".$openid."'})"; 
	/// echo $openid; //把openid 送回前端
	function https_request($url, $data = null) {    
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
		if (!empty($data)){        
			curl_setopt($curl, CURLOPT_POST, 1);        
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);    
		}    
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);    
		$output = curl_exec($curl);    
		curl_close($curl);    
		return $output;
	}
?> 
