
START = 0;
OVER = 1;
var MainLayer = function () {
    this.blockNode = this.blockNode || {};
    this.gameStatus = START;
    this.currentTime = 0;
    this.lastScoreTime = 0;
};

MainLayer.prototype.onDidLoadFromCCB = function () {
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function () {
            this.controller.onEnter();
        };
    }

    this.rootNode.schedule(function (dt) {
        this.controller.onUpdate(dt);
    });

    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };
    this.rootNode.setTouchEnabled(true);
};


MainLayer.prototype.onEnter = function () {
    cc.log("game mode==" + GAME_MODE);
    // return;

    var winSize = cc.Director.getInstance().getWinSize();
    this.blockWidth = winSize.width / 4;
    this.blockHeight = winSize.height / 4;
    this.scaleX = (this.blockWidth - 2) / 300;
    this.scaleY = (this.blockHeight - 2) / 500;
    this.moveNum = 0;

    //piano music length
    this.pianoListIndex = KISS_THE_RAIN;
    this.pianoLengthIndex = this.pianoListIndex.length;

    this.pianoLength = 5;   //init length 5
    cc.log("length==" + this.pianoLength);

	  //score font
	this.scoreBg = cc.Sprite.create("res/scoreBlock.png");
	this.scoreBg.setScaleY(this.scaleX);
	this.scoreBg.setScaleY(this.scaleY);    
    this.scoreBg.setPosition(cc.p(360, winSize.height - this.scoreBg._contentSize.height * this.scaleY));
    this.scoreBg.setAnchorPoint(cc.p(0.5, 0.5));
	this.rootNode.addChild(this.scoreBg);
    // this.scoreBg.setColor(cc.c3b(0, 92, 165));
    this.scoreBg.setZOrder(199);
    this.scoreLabel = cc.LabelTTF.create("0.00", "Arial", 50);
    this.rootNode.addChild(this.scoreLabel);
    this.scoreLabel.setPosition(cc.p(360, winSize.height - this.scoreLabel._contentSize.height * this.scaleY));
    this.scoreLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // this.scoreLabel.setColor(cc.c3b(255, 20, 147));
	// richard modify change score color
    this.scoreLabel.setColor(cc.c3b(178, 206, 228));
    this.scoreLabel.setZOrder(200);
	
    //tables
    this.tables = new Array(this.pianoLengthIndex);
    for (var j = 0; j < this.pianoLength; j++) {
        var sprites = new Array(4);
        var random = getRandom(4);
        for (var i = 0; i < 4; i++) {
            sprites[i] = this.newBlock(i, j, random);
        }
        this.tables[j] = sprites;
    }

  
};

MainLayer.prototype.newBlock = function (i, j, colorType) {
    //simple block
    var block = cc.Sprite.create("res/whiteBlock.png");
    block.setPosition(cc.p(this.blockWidth / 2 + this.blockWidth * i, this.blockHeight / 2 + this.blockHeight * j));
    block.setScaleX(this.scaleX);
    block.setScaleY(this.scaleY);
    block.setZOrder(100);
    block.setAnchorPoint(cc.p(0.5, 0.5));
    var color = "white";
	var seconds = 0;
    if (j == 0) {
        // block.setColor(cc.c3b(0, 255, 0));
		// richard modify the footer color to light blue
        block.setColor(cc.c3b(178, 206, 228));
    } else {
		if (i == colorType) {
			if (j == 1) {
				// add start label to the block
				var startLabel = cc.LabelTTF.create("Start", "Arial", 90);
				block.addChild(startLabel);
				startLabel.setPosition(cc.p(this.blockWidth / 2 + 60, this.blockHeight / 2 + 60));	
				startLabel.setAnchorPoint(cc.p(0.5, 0.5));
				startLabel.setColor(cc.c3b(255, 255, 255));
				startLabel.setZOrder(1);
			}
			if (j % 10 == 7) {
				seconds = 1;
				var pointLabel = cc.LabelTTF.create("减" + seconds + "秒", "Arial", 50);
				block.addChild(pointLabel);
				pointLabel.setPosition(cc.p(this.blockWidth + 40, this.blockHeight + 120));	
				pointLabel.setAnchorPoint(cc.p(0.5, 0.5));
				pointLabel.setColor(cc.c3b(255, 255, 255));
				pointLabel.setZOrder(2);
				var pointIcon = cc.Sprite.create("res/yogurt.png");
				block.addChild(pointIcon);
				pointIcon.setPosition(cc.p(this.blockWidth / 2 + 60, this.blockHeight / 2 + 60));		
				pointIcon.setAnchorPoint(cc.p(0.5, 0.5));
				pointIcon.setColor(cc.c3b(255, 255, 255));
				pointIcon.setZOrder(1);				
			}
            // block.setColor(cc.c3b(30, 30, 30));
			// richard modify to new block color
            block.setColor(cc.c3b(0, 92, 165));
            color = "black";
        }
    }
    block.blockData = {col: i, row: j, color: color, seconds : seconds};
    this.blockNode.addChild(block);
    return block;
};

MainLayer.prototype.createTopOverNode = function () {
    //top score node
    this.scoreNode = cc.Node.create();
    this.scoreNode.setPosition(cc.p(0, this.blockHeight * this.pianoLength));
    this.scoreNode.setAnchorPoint(cc.p(0, 0));
    this.scoreNode.setZOrder(130);
    this.blockNode.addChild(this.scoreNode);

    //color bg
    var bgColor = cc.Sprite.create("res/whiteBlock.png");
    bgColor.setPosition(cc.p(0, 0));
    bgColor.setScaleX(720 / 300);
    bgColor.setScaleY(1280 / 500);
    bgColor.setAnchorPoint(cc.p(0, 0));
    // bgColor.setColor(cc.c3b(0, 255, 0));
	// richard modify the footer color to light blue
    bgColor.setColor(cc.c3b(178, 206, 228));
    this.scoreNode.addChild(bgColor);
    this.scoreNode.bgColor = bgColor;

    //mode
    var wordsMode = ["经典", "街机", "禅"];
    var modeLabel = cc.LabelTTF.create(wordsMode[GAME_MODE] + "模式", "Arial", 70);
    this.scoreNode.addChild(modeLabel);
    modeLabel.setPosition(cc.p(350, 1000));
    // modeLabel.setColor(cc.c3b(0, 0, 0));
	// richard modify the mode label to dark blue
    modeLabel.setColor(cc.c3b(0, 92, 165));
    modeLabel.setAnchorPoint(cc.p(0.5, 0.5));

    //result
    var resultLabel = cc.LabelTTF.create("成功", "Arial", 110);
    this.scoreNode.addChild(resultLabel);
    resultLabel.setPosition(cc.p(360, 750));
    resultLabel.setAnchorPoint(cc.p(0.5, 0.5));
    resultLabel.setColor(cc.c3b(139, 58, 58));
    this.scoreNode.result = resultLabel;

    //back
    // var backLabel = cc.LabelTTF.create("确认", "Arial", 50);
    // this.scoreNode.addChild(backLabel);
    // backLabel.setPosition(cc.p(200, 400));
    // backLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // // backLabel.setColor(cc.c3b(0, 0, 0));
	// // richard modify the mode label to dark blue
    // backLabel.setColor(cc.c3b(0, 92, 165));
    // this.scoreNode.back = backLabel;
    // 
    // //return
    // var returnLabel = cc.LabelTTF.create("重来", "Arial", 50);
    // this.scoreNode.addChild(returnLabel);
    // returnLabel.setPosition(cc.p(500, 400));
    // returnLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // // returnLabel.setColor(cc.c3b(0, 0, 0));
	// // richard modify the mode label to dark blue
    // returnLabel.setColor(cc.c3b(0, 92, 165));
    // this.scoreNode.return = returnLabel;
};


MainLayer.prototype.onUpdate = function (dt) {
    if (this.gameStatus == OVER) {
        return;
    }

    this.currentTime += dt;
    if (this.currentTime - this.lastScoreTime > 0.09) {
        this.scoreLabel.setString(getD(this.currentTime, 2) + "''");
        this.lastScoreTime = this.currentTime;
    }
};

MainLayer.prototype.moveAddNewSprites = function () {
    cc.log("moveAddNewSprites");
    var sprites = new Array(4);
    var random = getRandom(4);
    for (var k = 0; k < 4; k++) {
        sprites[k] = this.newBlock(k, this.pianoLength, random);
    }
    this.tables[this.pianoLength] = sprites;
    this.pianoLength += 1;
};


MainLayer.prototype.onTouchesBegan = function (touches, event) {
    this.pBegan = touches[0].getLocation();
    // cc.log("this.pianoLength==" + this.pianoLength);
	// console.log("this.pianoLength==" + this.pianoLength);
    if (this.gameStatus == START) {  //game start
        var newTouchPos = cc.p(this.pBegan.x, (this.pBegan.y + this.moveNum * this.blockHeight));
        for (var j = 0; j < this.pianoLength; j++) {
            for (var i = 0; i < 4; i++) {
                var block = this.tables[j][i];
                if (block) {
                    var blockRect = cc.rectCreate(block.getPosition(), [this.blockWidth / 2, this.blockHeight / 2]);
                    if (cc.rectContainsPoint(blockRect, newTouchPos)) {
                        if (j == 0) {
                            return;
                        }						
                        //touch black
                        if (block.blockData.color == "black") {							
                            if (block.blockData.row == (this.moveNum + 1)) {
                            	if (block.blockData.seconds != 0) {
                            		this.currentTime = this.currentTime - block.blockData.seconds;
                            	}
                            	//create new sprite
                            	if (this.pianoLength < this.pianoLengthIndex) { //not reach top
                                    this.moveAddNewSprites();
                                }

                                if (this.pianoLength == this.pianoLengthIndex) {  //when reach top
                                    this.createTopOverNode();
                                }

                                //move down richard TODO comment sound
                                // cc.AudioEngine.getInstance().playEffect(PIANO_SIMPLE[this.pianoListIndex[j - 1]], false);								
                                // block.setColor(cc.c3b(100, 100, 100)); /* gray touched */
								// richard modify to a deep light blue after touched
                                block.setColor(cc.c3b(100, 160, 208));
                                var heightNum = 1;
                                if (block.blockData.row == (this.pianoLengthIndex - 1)) { //when last row ,game success end, move two height
                                    heightNum = 2;
                                    cc.log("end");
                                    this.gameStatus = OVER;
                                    cc.AudioEngine.getInstance().playEffect(SOUNDS.win, false);
									PauseAudio();
									// TODO refactor to fire event mode
									setTimeout(function () {
										window.location.href = "win.html";
									}, 1000);
                                }
                                this.blockNode.runAction(cc.MoveTo.create(0.2, cc.p(0, (this.blockNode.getPositionY() - this.blockHeight * heightNum))));
                                this.moveNum += 1;
                                block.runAction(cc.Sequence.create(
                                    cc.ScaleTo.create(0, this.scaleX * 4 / 5, this.scaleY),
                                    cc.ScaleTo.create(0.2, this.scaleX, this.scaleY)
                                ));
                            }
                        }

                        //touch white ,game over
                        else {
                            this.createTopOverNode();   //create score node and move 
                            this.gameStatus = OVER;
                            cc.AudioEngine.getInstance().playEffect(SOUNDS.error, false);
							PauseAudio();
                            block.setColor(cc.c3b(255, 0, 0)); /* red */
                            block.runAction(cc.Sequence.create(
                                cc.ScaleTo.create(0, this.scaleX * 4 / 5, this.scaleY * 4 / 5),
                                cc.ScaleTo.create(0.2, this.scaleX, this.scaleY)
                            ));
                            // this.scoreNode.bgColor.setColor(cc.c3b(255, 0, 0)); 
							// richard modify
                            this.scoreNode.bgColor.setColor(cc.c3b(178, 206, 228)); 
                            this.scoreNode.result.setString("失败了");
							// this.scoreNode.back.setString("返回");
                            this.scoreNode.runAction(cc.MoveTo.create(0.2, cc.p(0, this.blockHeight * this.moveNum)));
                        }
                    }
                }
            }
        }
    }
    // else if (this.gameStatus == OVER) {  //game over
    //     //back
    //     var backRect = cc.rectCreate(this.scoreNode.back.getPosition(), [50, 30]);
    //     if (cc.rectContainsPoint(backRect, this.pBegan)) {
    //         this.scoreNode.back.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1),
    //             cc.CallFunc.create(function () {
    //                 cc.AudioEngine.getInstance().stopAllEffects();
    //                 cc.BuilderReader.runScene("", "StartLayer");
    //             })
    //         ));
    //     }
    // 
    //     //return
    //     var returnRect = cc.rectCreate(this.scoreNode.return.getPosition(), [50, 30]);
    //     if (cc.rectContainsPoint(returnRect, this.pBegan)) {
    //         this.scoreNode.return.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1),
    //             cc.CallFunc.create(function () {
    //                 cc.AudioEngine.getInstance().stopAllEffects();
    //                 cc.BuilderReader.runScene("", "MainLayer");
    //             })
    //         ));
    //     }
    // }
};



