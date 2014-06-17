
        var dataForWeixin = {
            appId: 'wxc63c757bdae5dd41',
            TLImg: "http://112.124.117.175/image/icon.jpg",
            url: "http://112.124.117.175/index.htm?from=singlemessage&isappinstalled=0",
            title: "伊利·安慕希—浓醇酸奶",
            desc: "不睬白格，微信红包等你拿！更有希腊之旅，I Want You!"
        };
        var onBridgeReady = function(){
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                WeixinJSBridge.invoke('sendAppMessage', {
                    "appid": dataForWeixin.appId,
                    "img_url":"http://112.124.117.175/image/icon.jpg",
                    "img_width": "120",
                    "img_height": "120",
                    "link": "http://112.124.117.175/index.htm?from=singlemessage&isappinstalled=0",
                    "title": "伊利·安慕希—浓醇酸奶",
                    "desc": " 不睬白格，微信红包等你拿！更有希腊之旅，I Want You!"
                });
                share_callback_hy();
            });
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                WeixinJSBridge.invoke('shareTimeline', {
                    "appid": dataForWeixin.appId,
                    "img_url":"http://112.124.117.175/image/icon.jpg",
                    "img_width": "120",
                    "img_height": "120",
                    "link": "http://112.124.117.175/index.htm?from=singlemessage&isappinstalled=0",
                    "title": "伊利·安慕希—浓醇酸奶",
                    "desc": " 不睬白格，微信红包等你拿！更有希腊之旅，I Want You!"
                });
                share_callback_pyq();
            });
        };
        if(document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if(document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }; 
		
		function ShareTofriends(img_url, link, title, desc) {
			//在HTML页面内嵌入这一段JS代码
			// alert(window.WeixinJSBridge);			
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
				WeixinJSBridge.invoke('shareTimeline’', {
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
				});
				return false;
			} else {
				alert("请先通过搜索微信号 wow36kr 添加XXX为好友，通过微信分享文章 :) ");
			}
		};
		
		function WeiXinShareBtn(score) {
							if (typeof WeixinJSBridge == 'undefined') {
								alert("请先通过微信搜索 wow36kr 添加XXX为好友，通过微信分享文章 :) ");
							} else {
								WeixinJSBridge.invoke('shareTimeline', {
									"title" : "安慕希",
									"link" : "http://www.36kr.com",
									"desc" : "我在安慕希浓醇酸奶-别踩白块-微信红包的游戏中获得" + score + "的成绩",
									"img_url" : "http://112.124.117.175/image/icon.jpg"
								});
							}
						};