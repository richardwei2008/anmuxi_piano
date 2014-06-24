var StartLayer = function () {
    cc.log("StartLayer")
    this.startNode = this.startNode || {};
};

StartLayer.prototype.onDidLoadFromCCB = function () {
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function () {
            this.controller.onEnter();
        };
    }

    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };

    this.rootNode.setTouchEnabled(true);
};
/* start 单模式 */

StartLayer.prototype.onEnter = function () {
    var winSize = cc.Director.getInstance().getWinSize();
    this.blockWidth = winSize.width;
    this.blockHeight = winSize.height;
	
	this.positionX = this.blockWidth / 2
	// for NO_BORDER mode
	// alert('window.resolution.device == ' + window.resolution.device + ' ' + (window.resolution.device == 'iPhone'));	
	// if (window.resolution.device == 'iPhone') {
	// 	this.positionX = (this.blockWidth * 1.1) / 2;
	// }
    // this.scaleX = this.blockWidth / 300;
    // this.scaleY = this.blockHeight / 500;
	//this.blockWidth = winSize.width;
    //this.blockHeight = 1014; // winSize.height;
    console.log("[blockWidth , blockHeight]: [" + this.blockWidth + ", " + this.blockHeight + "] ");
	// alert("[blockWidth , blockHeight]: [" + this.blockWidth + ", " + this.blockHeight + "] ");
	this.scaleX = this.blockWidth / 320;
    this.scaleY = this.blockHeight / 500;
	console.log("[scaleX , scaleY]: [" + this.scaleX + ", " + this.scaleY + "] ");
	// only 1 block
    this.tables = new Array(1);
    for (var j = 0; j < 1; j++) {
        var sprites = new Array(1);
        for (var i = 0; i < 1; i++) {
            sprites[i] = this.newBlock(i, j);
        }
        this.tables[j] = sprites;
    }
	$('#container').css({"padding-top":"0px"});
	$('#container').css({"padding-bottom":"0px"});
};

StartLayer.prototype.newBlock = function (i, j) {
    var block = cc.Sprite.create("res/whiteBlock.png");
    block.setPosition(cc.p(this.positionX, this.blockHeight / 2)); // 
    block.setScaleX(this.scaleX);
    block.setScaleY(this.scaleY);
    block.setZOrder(100);
    block.setAnchorPoint(cc.p(0.5, 0.5));

    var words = ["禅", "CocosEditor", "经典模式", "街机"];
    // always "经典模式"
	var wordNum = 2;	
    // if (j == 0 && i == 1) {
    //     wordNum = 1
    // } else if (j == 1 && i == 0) {
    //     wordNum = 2
    // } else if (j == 1 && i == 1) {
    //     wordNum = 3
    // }
	var welcomeText = "没有授权访问您的用户信息";
	// alert(window.user != undefined);
	// alert(window.user.openId);
	if (window.user != undefined && window.user.openId != null && window.user.openId != "testId") {
		welcomeText = "Welcome, " + window.user.openId;
	}
	var welcomeLabel = cc.LabelTTF.create(welcomeText, "Arial", 15);
    block.addChild(welcomeLabel);
    welcomeLabel.setPosition(cc.p(this.blockWidth / this.scaleX * 0.5 , this.blockHeight / this.scaleY * 0.9));	
    welcomeLabel.setAnchorPoint(cc.p(0.5, 0.5));

    var blockLabel = cc.LabelTTF.create(words[wordNum], "Arial", 60);
    block.addChild(blockLabel);
    blockLabel.setPosition(cc.p(this.blockWidth / this.scaleX * 0.5, this.blockHeight / this.scaleY * 0.6));	
    blockLabel.setAnchorPoint(cc.p(0.5, 0.5));
	var clickLabel = cc.LabelTTF.create('开始游戏', "Arial", 40);
	block.addChild(clickLabel);
    clickLabel.setPosition(cc.p(this.blockWidth / this.scaleX * 0.5, this.blockHeight / this.scaleY * 0.3));	
    clickLabel.setAnchorPoint(cc.p(0.5, 0.5));
	this.startNode.enter = clickLabel;
    // var colors = [cc.c3b(0, 0, 0) /*black*/, cc.c3b(255, 255, 255) /*white*/];
	// richard modify the color for anmuxi RGB(0, 92, 165)	
	var colors = [cc.c3b(0, 92, 165) /*dark blue*/, cc.c3b(255, 255, 255) /*white*/];	
	var theBlockColor = "black";
	if (i == j) {
		block.setColor(colors[0]);
		blockLabel.setColor(colors[1]);
		clickLabel.setColor(colors[1]);
	} else {
		theBlockColor = "white";
		block.setColor(colors[1]);
		blockLabel.setColor(colors[0]);
		clickLabel.setColor(colors[0]);
	}
    block.label = blockLabel;

    this.startNode.addChild(block);
    return block;
};


StartLayer.prototype.onTouchesBegan = function (touches, event) {
    this.pBegan = touches[0].getLocation();  // to get touch position
    for (var j = 0; j < 1; j++) {
        for (var i = 0; i < 1; i++) {
            var block = this.tables[j][i];
            if (block) {
				// richard change the touch area to the label 
                var touchRect = cc.rectCreate(block.getPosition(), [this.blockWidth / 2, this.blockHeight / 2]);
				// touchRect = cc.rectCreate(this.startNode.enter.getPosition(), [100, 60]);
			    if (cc.rectContainsPoint(touchRect, this.pBegan)) {
					// richard remove sound
                    // cc.AudioEngine.getInstance().playEffect(PIANO_SIMPLE[1 + getRandom(6)], false);
					// cc.AudioEngine.getInstance().playEffect(MUSIC.bg, true);
					try {
						PlayAudio();
					} catch (err) {
						alert(err);
					}					
                    if (j == 0 && i == 0) {
                        GAME_MODE = MODE_ZEN;
                    } else if (j == 0 && i == 1) {
                        GAME_MODE = MODE_NOT;
                    } else if (j == 1 && i == 0) {
                        GAME_MODE = MODE_CLASSIC;
                    } else if (j == 1 && i == 1) {
                        GAME_MODE = MODE_ARCADE;
                    }
					// richard always classic
					GAME_MODE = MODE_CLASSIC;
                    if (GAME_MODE != MODE_NOT) {
                        cc.BuilderReader.runScene("", "MainLayer");
                    } else {
                        var key = block.label.getString();
                        if (key == "TouchSnow") {
                            block.label.setString("CocosEditor");
                        } else {
                            block.label.setString("TouchSnow");
                        }
                    }
                }
            }
        }
    }
};
/* end 单模式 */

