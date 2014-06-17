function ShareTofriends(img_url, link, title, desc) {
			//在HTML页面内嵌入这一段JS代码
			alert(window.WeixinJSBridge);			
			if (window.WeixinJSBridge) {
				if (typeof(img_url) == 'undefined' || img_url == "") {
					var img_url = "http://112.124.117.175/image/icon.jpg";
				}
				if (typeof(link) == 'undefined' || link == "") {
					var link = window.location.href;
				}
				if (typeof(title) == 'undefined' || title == "") {
					var title = '点开看一下吧!';
				}
				if (typeof(desc) == 'undefined' || desc == "") {
					var desc = "安慕希浓醇酸奶-别踩白块-微信红包的游戏中";
				}
				alert("img_url==" + img_url);
				alert("link==" + link);
				alert("desc==" + desc);
				alert("title==" + title);
				WeixinJSBridge.invoke('shareTimeline', {
					"img_url" : img_url,
					//"img_width": "640",
					//"img_height": "640",
					"link" : link,
					"desc" : desc,
					"title" : title
				}, function (res) {
					// 返回res.err_msg,取值
					// share_timeline:cancel 用户取消
					// share_timeline:fail　发送失败
					// share_timeline:ok 发送成功
					WeixinJSBridge.log(res.err_msg);
					alert(res.err_msg);
					alert(JSON.stringify(res));
				});
				return false;
			} else {
				alert("请先通过搜索微信号 wow36kr 添加XXX为好友，通过微信分享文章 :) ");
			}
		};
		
function ShareToWeibo(img_url, link, title, desc) {
			//在HTML页面内嵌入这一段JS代码
			alert(window.WeixinJSBridge);			
			if (window.WeixinJSBridge) {
				if (typeof(img_url) == 'undefined' || img_url == "") {
					var img_url = "http://112.124.117.175/image/icon.jpg";
				}
				if (typeof(link) == 'undefined' || link == "") {
					var link = window.location.href;
				}
				if (typeof(title) == 'undefined' || title == "") {
					var title = '点开看一下吧!';
				}
				if (typeof(desc) == 'undefined' || desc == "") {
					var desc = "安慕希浓醇酸奶-别踩白块-微信红包的游戏中";
				}
				alert("img_url==" + img_url);
				alert("link==" + link);
				alert("desc==" + desc);
				alert("title==" + title);
				WeixinJSBridge.invoke('shareWeibo', {
					"content" : title + link,
					"url" : link
				});
				return false;
			} else {
				alert("请先通过搜索微信号 wow36kr 添加XXX为好友，通过微信分享文章 :) ");
			}
		};		
		