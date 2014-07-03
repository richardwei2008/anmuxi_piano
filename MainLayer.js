
START = 0;
OVER = 1;
STOP = 2;
var MainLayer = function () {
    this.blockNode = this.blockNode || {};
    this.gameStatus = START;
	this.countDownStatus = STOP;
    this.currentTime = 0;	
	// this.currentTime = 30;
    this.lastScoreTime = 0;
	this.totalTap = 0;
	this.getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	this.max_20 = 2;
	this.max_5 = 8;
	this.count_20 = 0;
	this.count_5 = 0;
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
    this.scaleX = (this.blockWidth - 2) / 320;
    this.scaleY = (this.blockHeight - 2) / 500;
	this.moveNum = 0;
	
	console.log("[blockWidth , blockHeight]: [" + this.blockWidth + ", " + this.blockHeight + "] ");
	console.log("[scaleX , scaleY]: [" + this.scaleX + ", " + this.scaleY + "] ");
	
	this.positionX = this.blockWidth / 2;
	// for NO_BORDER mode
	// if (window.resolution.device == 'iPhone') {
	// 	this.positionX = (this.blockWidth / 2) + this.blockWidth * 0.2 ;
	// }

    //piano music length
    this.pianoListIndex = KISS_THE_RAIN;
    this.pianoLengthIndex = this.pianoListIndex.length;

    this.pianoLength = 5;   //init length 5
    cc.log("length==" + this.pianoLength);

	  //score font
	this.scoreBg = cc.Sprite.create("res/scoreBlock.png");
	this.scoreBg.setScaleY(this.scaleX);	
	this.scoreBg.setScaleY(this.scaleY);
	// console.log("scaleY==" + this.scaleY);    
	var positionY = winSize.height - 40 * this.scaleY;
    this.scoreBg.setPosition(cc.p(this.blockWidth * 4 / window.devicePixelRatio, positionY));
    // console.log("winSizeHeight==" + winSize.height); 
	// console.log("scoreBgHeight==" + this.scoreBg._contentSize.height); 
	// console.log("positionY==" + positionY);    
	this.scoreBg.setAnchorPoint(cc.p(0.5, 0.5));
	this.rootNode.addChild(this.scoreBg);
    // this.scoreBg.setColor(cc.c3b(0, 92, 165));
    this.scoreBg.setZOrder(199);
    this.scoreLabel = cc.LabelTTF.create("0.00''", "Arial", 50 / window.devicePixelRatio);
	// this.scoreLabel.setString("总时间30.00''    块数: " + this.totalTap);
    this.rootNode.addChild(this.scoreLabel);
    this.scoreLabel.setPosition(cc.p(this.blockWidth * 4 / window.devicePixelRatio, positionY - 10));
	
    this.scoreLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // this.scoreLabel.setColor(cc.c3b(255, 20, 147));
	// richard modify change score color
    this.scoreLabel.setColor(cc.c3b(178, 206, 228));
    this.scoreLabel.setZOrder(200);
	
	// effect
	this.effectLabel = cc.LabelTTF.create("I Want U!", "Arial", 110 / window.devicePixelRatio);
	// this.rootNode.addChild(effectLabel);
    this.effectLabel.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2));
    this.effectLabel.setAnchorPoint(cc.p(0.5, 0.5));
	this.effectLabel.setColor(cc.c3b(178, 206, 228));
	this.effectLabel.setZOrder(200);
	
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
    block.setPosition(cc.p(this.positionX + this.blockWidth * i, this.blockHeight / 2 + this.blockHeight * j));
	if (cc.Director.getInstance().getWinSize().width < 800) {
		block.setScaleX(this.scaleX * 1.01);
		block.setScaleY(this.scaleY * 1.005);
	} else {
		block.setScaleX(this.scaleX);
		block.setScaleY(this.scaleY);
	}
    block.setZOrder(100);
    block.setAnchorPoint(cc.p(0.5, 0.5));
    var color = "white";
	// var seconds = 0;
	var award = 0;
	var awardType = "tile";
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
				// alert("[blockWidth , blockHeight]: [" + this.blockWidth + ", " + this.blockHeight + "] ");
				// alert("[scaleX , scaleY]: [" + this.scaleX + ", " + this.scaleY + "] ");
				console.log("[blockWidth , blockHeight]: [" + this.blockWidth + ", " + this.blockHeight + "] ");
				console.log("[scaleX , scaleY]: [" + this.scaleX + ", " + this.scaleY + "] ");
				startLabel.setPosition(cc.p(this.blockWidth * window.devicePixelRatio, this.blockHeight * window.devicePixelRatio));	
				startLabel.setAnchorPoint(cc.p(0.5, 0.5));
				startLabel.setColor(cc.c3b(255, 255, 255));
				startLabel.setZOrder(1);
			}
			if (j % 11 == 7 && this.count_20 < this.max_20) {
				// seconds = 1;
				// var pointLabel = cc.LabelTTF.create("减" + seconds + "秒", "Arial", 50);
				// awardType = "seconds";
				award = 20;		
				// var pointLabel = cc.LabelTTF.create("+ 35%", "Arial", 50);				
				// block.addChild(pointLabel);
				// pointLabel.setPosition(cc.p((this.blockWidth + 70 * 0.5) * window.devicePixelRatio, (this.blockHeight * 2) * window.devicePixelRatio - this.blockHeight * 0.5));	
				// pointLabel.setAnchorPoint(cc.p(0.5, 0.5));
				// pointLabel.setColor(cc.c3b(255, 255, 255));
				// pointLabel.setZOrder(2);
				var pointIcon = cc.Sprite.create("res/protein.png");
				block.addChild(pointIcon);
				pointIcon.setPosition(cc.p(this.blockWidth * window.devicePixelRatio, (this.blockHeight - 20) * window.devicePixelRatio)) ;		
				pointIcon.setAnchorPoint(cc.p(0.5, 0.5));
				pointIcon.setColor(cc.c3b(255, 255, 255));
				pointIcon.setZOrder(1);	
				this.count_20++;
			} else 
			if (j % 5 == 3 && this.count_5 < this.max_5) {
				// seconds = 1;
				// var pointLabel = cc.LabelTTF.create("减" + seconds + "秒", "Arial", 50);
				award = 5;		
				// var pointLabel = cc.LabelTTF.create("奖" + award + "块", "Arial", 50);				
				// block.addChild(pointLabel);
				// pointLabel.setPosition(cc.p((this.blockWidth + 70 * 0.5) * window.devicePixelRatio, (this.blockHeight * 2) * window.devicePixelRatio - this.blockHeight * 0.5));	
				// pointLabel.setAnchorPoint(cc.p(0.5, 0.5));
				// pointLabel.setColor(cc.c3b(255, 255, 255));
				// pointLabel.setZOrder(2);
				var pointIcon = cc.Sprite.create("res/yogurt.png");
				block.addChild(pointIcon);
				pointIcon.setPosition(cc.p(this.blockWidth * window.devicePixelRatio, (this.blockHeight - 20) * window.devicePixelRatio)) ;		
				pointIcon.setAnchorPoint(cc.p(0.5, 0.5));
				pointIcon.setColor(cc.c3b(255, 255, 255));
				pointIcon.setZOrder(1);	
				this.count_5++;
			}
			if (j == 30) {
				var logoIcon = cc.Sprite.create("image/logo.png");
				block.addChild(logoIcon);
				logoIcon.setPosition(cc.p(this.blockWidth * window.devicePixelRatio, (this.blockHeight - 20) * window.devicePixelRatio)) ;		
				logoIcon.setAnchorPoint(cc.p(0.5, 0.5));
				logoIcon.setColor(cc.c3b(255, 255, 255));
				logoIcon.setZOrder(1);				
			}
            // block.setColor(cc.c3b(30, 30, 30));
			// richard modify to new block color
            block.setColor(cc.c3b(0, 92, 165));
            color = "black";
        }
    }
    // block.blockData = {col: i, row: j, color: color, seconds : seconds};
	block.blockData = {col: i, row: j, color: color, award : award, awardType : awardType};
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
    var bgColor = cc.Sprite.create("image/last.jpg");
    bgColor.setPosition(cc.p(0, 0)); // +32
	// bgColor.setScaleX(720 / 300);
    // bgColor.setScaleY(1280 / 500);
    bgColor.setScaleX(window.resolution.width / 640);
    bgColor.setScaleY(window.resolution.height / 1136);
    bgColor.setAnchorPoint(cc.p(0, 0));
    // bgColor.setColor(cc.c3b(0, 255, 0));
	// richard modify the footer color to light blue
    bgColor.setColor(cc.c3b(178, 206, 228));
    this.scoreNode.addChild(bgColor);
    this.scoreNode.bgColor = bgColor;

    //mode
    // var wordsMode = ["经典", "街机", "禅"];
    // var modeLabel = cc.LabelTTF.create(wordsMode[GAME_MODE] + "模式", "Arial", 130 / window.devicePixelRatio);
    // this.scoreNode.addChild(modeLabel);
    // modeLabel.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 3));
    // // modeLabel.setColor(cc.c3b(0, 0, 0));
	// // richard modify the mode label to dark blue
    // modeLabel.setColor(cc.c3b(0, 92, 165));
    // modeLabel.setAnchorPoint(cc.p(0.5, 0.5));
	var spriteScale = 1 / window.devicePixelRatio;
		
    // var modeLabel = cc.Sprite.create("image/classic.png");
    // this.scoreNode.addChild(modeLabel);
	// modeLabel.setScaleX(spriteScale * 1.4);
	// modeLabel.setScaleY(spriteScale * 1.4);
    // modeLabel.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2));
    // // modeLabel.setColor(cc.c3b(0, 0, 0));
	// // richard modify the mode label to dark blue
    // // modeLabel.setColor(cc.c3b(0, 92, 165));
    // modeLabel.setAnchorPoint(cc.p(0.5, 0.5));
	
    //result
    // var resultLabel = cc.LabelTTF.create("成功", "Arial", 110 / window.devicePixelRatio);
	// var successLabel = cc.Sprite.create("image/score.png");
    // this.scoreNode.addChild(successLabel);
	// successLabel.setScaleX(spriteScale);
	// successLabel.setScaleY(spriteScale);
    // successLabel.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2 - 200 / window.devicePixelRatio ));
    // successLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // // successLabel.setColor(cc.c3b(139, 58, 58));
	// this.scoreNode.success = successLabel;
    // this.scoreNode.result = successLabel;
	
	// var failedLabel = cc.Sprite.create("image/failed.png"); // cc.LabelTTF.create("失  败  了", "Arial", 60 / window.devicePixelRatio);   
	// failedLabel.setScaleX(0.7 * 1 / window.devicePixelRatio);
	// failedLabel.setScaleY(0.7 * 1 / window.devicePixelRatio);	
	// failedLabel.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2 - 200 / window.devicePixelRatio ));
    // failedLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // // failedLabel.setColor(cc.c3b(139, 58, 58));
	// this.scoreNode.failed = failedLabel;
	
	
	//score	
    // var resultLabel2 = cc.LabelTTF.create("分数", "Arial", 120 / window.devicePixelRatio);
    // this.scoreNode.addChild(resultLabel2);
    // resultLabel2.setPosition(cc.p(this.blockWidth * 2, (this.blockHeight) * 2 - 110 / window.devicePixelRatio));
    // resultLabel2.setAnchorPoint(cc.p(0.5, 0.5));
    // resultLabel2.setColor(cc.c3b(0, 92, 165));
    // this.scoreNode.result2 = resultLabel2;

    //back
	
	// var btnBackX = this.blockWidth;
	// var btnBackY = this.blockHeight * 0.2;
	// var btnBack = cc.Sprite.create("image/back.png");
	// btnBack.setScaleX(spriteScale);
	// btnBack.setScaleY(spriteScale);
    // this.scoreNode.addChild(btnBack);
    // btnBack.setPosition(cc.p(btnBackX, btnBackY));    
    // btnBack.setAnchorPoint(cc.p(0.5, 0.5));
	// 
    // // var backLabel = cc.LabelTTF.create("重来", "Arial", 40 / window.devicePixelRatio);
    // // // this.scoreNode.addChild(backLabel);
	// // btnBack.addChild(backLabel);
    // // backLabel.setPosition(cc.p(btnBackX, btnBackY));
    // // backLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // // // backLabel.setColor(cc.c3b(0, 0, 0));
	// // // richard modify the mode label to dark blue
    // // backLabel.setColor(cc.c3b(178, 206, 228));
    // // this.scoreNode.back = backLabel;
	// this.scoreNode.back = btnBack;
	
	// bonus
    var btnBonus = cc.Sprite.create("image/bonus.png");
	btnBonus.setScaleX(0.8);
	btnBonus.setScaleY(0.8);
    this.scoreNode.addChild(btnBonus);
    btnBonus.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 1.1));
    btnBonus.setAnchorPoint(cc.p(0.5, 0.5));   
    this.scoreNode.bonus = btnBonus;
	
	//rank
	// var btnRankX = this.blockWidth * 3;
	// var btnRankY = this.blockHeight * 0.2;
	// 
	// var btnRank = cc.Sprite.create("image/rank.png");
	// btnRank.setScaleX(spriteScale);
	// btnRank.setScaleY(spriteScale);
    // this.scoreNode.addChild(btnRank);
    // btnRank.setPosition(cc.p(btnRankX, btnRankY));    
    // btnRank.setAnchorPoint(cc.p(0.5, 0.5));
	// 
    // // var rankLabel = cc.LabelTTF.create("排名", "Arial", 40 / window.devicePixelRatio);
    // // // this.scoreNode.addChild(rankLabel);
    // // btnRank.addChild(rankLabel);
    // // rankLabel.setPosition(cc.p(btnRankX, btnRankY));
    // // rankLabel.setAnchorPoint(cc.p(0.5, 0.5));    
    // // rankLabel.setColor(cc.c3b(178, 206, 228));
    // // // this.scoreNode.rank = rankLabel;
    // this.scoreNode.rank = btnRank;
    
	
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
	// if (this.currentTime <= 0) {	
	// 	this.currentTime = 0;
	// 	// this.scoreLabel.setString("时间到！" + "      块数: " + this.totalTap);
	// 	this.gameStatus = OVER;
		// this.createTopOverNode();   //create score node and move 
        // cc.AudioEngine.getInstance().playEffect(SOUNDS.win, false);
		// PauseAudio();        
        // this.scoreNode.bgColor.setColor(cc.c3b(178, 206, 228)); 
        // // this.scoreNode.result.setString("挑战成功");		
		// this.scoreNode.result2.setString(this.totalTap);
        // this.scoreNode.runAction(cc.MoveTo.create(0.2, cc.p(0, this.blockHeight * this.moveNum)));		
        // 
		// // var wxTitle = "安慕希浓醇酸奶—不睬白格，我已经踩到" + highscore + "格子啦！在" + rank[0] + "个人里已经排名第" + rank[1] + "！速度来挑战我！";
		// var wxTitle = "安慕希不睬白格赢红包，我已经踩到" + this.totalTap + "个格子啦！速度来挑战我！";
		// setWxContent(wxTitle);
		// // alert("After-game " + JSON.stringify(globalUser));
		// window.onGameOverEvent.fire({type:'gameOver', success : true, score : this.totalTap});
		
	// 	return;
	// }
	this.currentTime += dt;
		if (this.currentTime - this.lastScoreTime > 0.09) {
			this.scoreLabel.setString(getD(this.currentTime, 2) + "''");
			this.lastScoreTime = this.currentTime;
		}
	
	// if (this.countDownStatus == START) {
	// 	this.currentTime -= dt;
	// 	if (this.currentTime - this.lastScoreTime > -0.09) {
	// 		this.scoreLabel.setString(getD(this.currentTime, 1) + "''");
	// 		this.lastScoreTime = this.currentTime;
	// 	}
	// } 
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
                    var blockRect = cc.rectCreate(block.getPosition(), [this.positionX, this.blockHeight / 2]);
                    if (cc.rectContainsPoint(blockRect, newTouchPos)) {
                        if (j == 0) {							
                            return;
                        }
						if (j == 1) {
							this.countDownStatus = START;
							this.totalTap += 1;
							// PlayAudio();
                        }		
                        //touch black
                        if (block.blockData.color == "black") {							
                            if (block.blockData.row == (this.moveNum + 1)) {
                            	// if (block.blockData.seconds != 0) {
                            	// 	this.currentTime = this.currentTime - block.blockData.seconds;
                            	// }
								if (block.blockData.awardType == 'tile' && block.blockData.award != 0) {
                            		this.totalTap = this.totalTap + block.blockData.award;
									this.rootNode.addChild(this.effectLabel);
									this.effectLabel.runAction(cc.Sequence.create(
										cc.ScaleTo.create(0.1, 1.3),
										cc.CallFunc.create(function () {
											this.effectLabel.setScaleX(0.1);
											this.effectLabel.setScaleY(0.1);
											this.rootNode.removeChild(this.effectLabel);					
										}, this)
									), this);
																										
                            	}
								if (block.blockData.awardType == 'seconds' && block.blockData.award != 0) {
                            		this.currentTime = this.currentTime * block.blockData.award;
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
									// window.onGameOverEvent.fire({type:'gameOver', success : false, score : this.totalTap});
                                    this.gameStatus = OVER;
									this.rootNode.removeChild(this.scoreBg);
									this.rootNode.removeChild(this.scoreLabel);
									// this.scoreNode.result2.setString(this.totalTap);
                                    cc.AudioEngine.getInstance().playEffect(SOUNDS.win, false);
									// PauseAudio();									
                                }
                                this.blockNode.runAction(cc.MoveTo.create(0.2, cc.p(0, (this.blockNode.getPositionY() - this.blockHeight * heightNum))));
                                this.moveNum += 1;
								this.totalTap += 1;
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
							// PauseAudio();
                            block.setColor(cc.c3b(255, 0, 0)); /* red */
                            block.runAction(cc.Sequence.create(
                                cc.ScaleTo.create(0, this.scaleX * 4 / 5, this.scaleY * 4 / 5),
                                cc.ScaleTo.create(0.2, this.scaleX, this.scaleY)
                            ));
                            // this.scoreNode.bgColor.setColor(cc.c3b(255, 0, 0)); 
							// richard modify
                            this.scoreNode.bgColor.setColor(cc.c3b(178, 206, 228)); 
							this.rootNode.removeChild(this.scoreBg);
							this.rootNode.removeChild(this.scoreLabel);
                            // this.scoreNode.result.setString("失 败 了");
							// this.scoreNode.removeChild(this.scoreNode.success);
							// this.scoreNode.addChild(this.scoreNode.failed);
							// this.scoreNode.result2.setString(this.totalTap);
                            this.scoreNode.runAction(cc.MoveTo.create(0.2, cc.p(0, this.blockHeight * this.moveNum)));
							// alert("After-game " + JSON.stringify(globalUser));
							// window.onGameOverEvent.fire({type:'gameOver', success : false, score : this.totalTap})
                        }
                    }
                }
            }
        }
    }
	else if (this.gameStatus == OVER) {  //game over
        //back
        // var backRect = cc.rectCreate(this.scoreNode.back.getPosition(), [50, 30]);
        // if (cc.rectContainsPoint(backRect, this.pBegan)) {
        //     this.scoreNode.back.runAction(cc.Sequence.create(cc.ScaleTo.create(0.001, 0.999),
        //         cc.CallFunc.create(function () {
        //             cc.AudioEngine.getInstance().stopAllEffects();
        //             cc.BuilderReader.runScene("", "MainLayer");
        //         })
        //     ));
        // }
		
		var viewBonusEvent = {type:'viewBonus', success : true, score : this.totalTap};
		var bonusRect = cc.rectCreate(this.scoreNode.bonus.getPosition(), [50, 30]);
        if (cc.rectContainsPoint(bonusRect, this.pBegan)) {
            this.scoreNode.bonus.runAction(cc.Sequence.create(cc.ScaleTo.create(0.001, 0.999),
                cc.CallFunc.create(function () {
                    cc.AudioEngine.getInstance().stopAllEffects();
                    window.onViewBonusEvent.fire(viewBonusEvent);
                })
            ));
        }
		
		//share
		// var shareRect = cc.rectCreate(this.scoreNode.share.getPosition(), [50, 30]);
		// if (cc.rectContainsPoint(shareRect, this.pBegan)) {
		// 	this.scoreNode.share.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1),
		// 			cc.CallFunc.create(function () {
		// 				cc.AudioEngine.getInstance().stopAllEffects();
		// 				// cc.BuilderReader.runScene("", "MainLayer");
		// 				var title = "安慕希别踩白格赢红包";
		// 				var link = "http://www.36kr.com";
		// 				var desc = "我在安慕希浓醇酸奶-别踩白块-微信红包的游戏中获得" + this.totalTap + "的成绩";
		// 				var imgUrl = "http://192.168.1.9/image/icon.jpg";
		// 				ShareToWeibo(imgUrl, link, title, desc);
		// 			})
		// 		)
		// 	);
		// }
        //rank
		// var fireEvent = {type:'viewResult', success : true, score : this.totalTap};
        // var rankRect = cc.rectCreate(this.scoreNode.rank.getPosition(), [50, 30]);
        // if (cc.rectContainsPoint(rankRect, this.pBegan)) {
        //     this.scoreNode.rank.runAction(cc.Sequence.create(cc.ScaleTo.create(0.001, 0.999),
        //         cc.CallFunc.create(function () {
        //             cc.AudioEngine.getInstance().stopAllEffects();
		// 			window.onViewResultEvent.fire(fireEvent);	
        //         })
        //     ));
        // }
    }
};




