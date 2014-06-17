
(function () {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
	function onBridgeReady() {
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


