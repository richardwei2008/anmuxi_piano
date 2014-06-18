﻿
(function () {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
	
	function onBridgeReady() {
		// subscribe  用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。  
		// openid  用户的标识，对当前公众号唯一  
		// nickname  用户的昵称  
		// sex  用户的性别，值为1时是男性，值为2时是女性，值为0时是未知  
		// city  用户所在城市  
		// country  用户所在国家  
		// province  用户所在省份  
		// language  用户的语言，简体中文为zh_CN  
		// headimgurl  用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空  
		// subscribe_time  用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间
		window.user = {
			"subscribe": 0,
			"openId": null,
			"nickname": null,
			"sex": null,
			"city": null,
			"country": null,
			"province": null,
			"language": null,
			"headimgurl": null,
			"subscribe_time": null
		};
		window.shareData = {
			"imgUrl": "http://192.168.1.9/image/icon.jpg",
			//可以是页面的头像，也可以是自己定义的一张图片不变，每个页面可以有这个JS
			"timeLineLink": "http://192.168.1.9",
			"sendFriendLink": "http://192.168.1.9",
			"weiboLink": "http://192.168.1.9",
			//发送朋友圈
			"tTitle": "伊利·安慕希浓醇酸奶—不睬白格，红包等你拿！速来挑战我！",
			"tContent": "不睬白格，微信红包等你拿！更有希腊之旅，I Want You!",
			//发送给朋友
			"fTitle": "伊利·安慕希浓醇酸奶—不睬白格，红包等你拿！速来挑战我！",
			"fContent": "不睬白格，微信红包等你拿！更有希腊之旅，I Want You!",
			"wContent": "伊利·安慕希浓醇酸奶—不睬白格，红包等你拿！速来挑战我！"
		};
		var content = "不睬白格，微信红包等你拿！更有希腊之旅，I Want You!";
		var title = "伊利·安慕希浓醇酸奶—不睬白格，红包等你拿！";		
		// if (url.indexOf('?') < 0) {
		// 	url = url + '?user=richard';
		// }
		// 发送给好友;
		WeixinJSBridge.on('menu:share:appmessage', function (argv) {
			WeixinJSBridge.invoke('sendAppMessage', {
				"img_url" : window.shareData.imgUrl,
				"img_width" : "640",
				"img_height" : "640",
				"link" : window.shareData.sendFriendLink + "&source=friend",
				"desc" : window.shareData.fContent,
				"title" : window.shareData.fTitle
			}, function (res) {});
		});
		// 分享到朋友圈;
		WeixinJSBridge.on('menu:share:timeline', function (argv) {
			WeixinJSBridge.invoke('shareTimeline', {
				"img_url" : window.shareData.imgUrl,
				"img_width" : "640",
				"img_height" : "640",
				"link" : window.shareData.timeLineLink + "&source=timeline",
				"desc" : window.shareData.tContent,
				"title" : window.shareData.tTitle
			}, function (res) {});
		});
		// 分享到微博;
		var weiboContent = '';
		WeixinJSBridge.on('menu:share:weibo', function (argv) {
			WeixinJSBridge.invoke('shareWeibo', {
				"content" : window.shareData.tTitle,
				"url" : window.shareData.weiboLink + "&source=weibo",
			}, function (res) {});
		});
		// 分享到Facebook
		WeixinJSBridge.on('menu:share:facebook', function (argv) {
			WeixinJSBridge.invoke('shareFB', {
				"img_url" : window.shareData.imgUrl,
				"img_width" : "640",
				"img_height" : "640",
				"link" : window.shareData.weiboLink + "&source=facebook",
				"desc" : window.shareData.tTitle,
				"title" : window.shareData.tContent
			}, function (res) {});
		});
		// 新的接口
		// WeixinJSBridge.on('menu:general:share', function (argv) {
		// 	var scene = 0;
		// 	switch (argv.shareTo) {
		// 	case 'friend':
		// 		scene = 1;
		// 		break;
		// 	case 'timeline':
		// 		scene = 2;
		// 		break;
		// 	case 'weibo':
		// 		scene = 3;
		// 		break;
		// 	}
		// 	argv.generalShare({
		// 		"appid" : "",
		// 		"img_url" : img_url,
		// 		"img_width" : "640",
		// 		"img_height" : "640",
		// 		"link" : url + "&screen=" + chapterShare.chapter + "&scene=" + scene,
		// 		"desc" : content,
		// 		"title" : title
		// 	}, function (res) {});
		// });
		// get network type
		var nettype_map = {
			"network_type:fail" : "fail",
			"network_type:edge" : "2g",
			"network_type:wwan" : "3g",
			"network_type:wifi" : "wifi"
		};
		/*
		if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke){
		WeixinJSBridge.invoke('getNetworkType',{}, function(res) {
		var networkType = nettype_map[res.err_msg];
		if(networkType=="2g"){
		alert("请使用3G或wifi浏览本网页。");
		}
		});
		}
		 */

	};
	setWxContent = function (title) {
		if (typeof(window.shareData) != "undefined") {
			window.shareData["tTitle"] = title;
			window.shareData["fTitle"] = title;
			window.shareData["wContent"] = title + " —— " + window.shareData["fContent"] + "【http://192.168.1.9/index.html】";
		}

	};
})();

function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	};
	
