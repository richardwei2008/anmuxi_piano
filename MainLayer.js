
START = 0;
OVER = 1;
STOP = 2;
STARTED = 3;
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
    this.RANDOM_2_START_SEED = [2, 3, 4, 5];
    this.RANDOM_8_SEED = [2, 3, 5, 7];

    this.random2 = 3;
    this.start_2_point = this.getRandomInt(2, 3, 4);
    this.random2Mod = this.random2 - this.getRandomInt(1, 2);

    this.random8 = this.RANDOM_8_SEED[this.getRandomInt(0, 3)];
    this.start_8_point = this.getRandomInt(4, 9);
    this.random8Mod = this.random8 - 1;

	this.max_8_point = 5;
	this.max_2_point = 15;
	this.count_8_point = 0;
	this.count_2_point = 0;
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
    
    this.winSize = cc.Director.getInstance().getWinSize();	
	this.blockWidth = this.winSize.width / 4;
    this.blockHeight = this.winSize.height / 4;
	var tileWidth = 160;	// 320
	var tileHeight = 250;  // 500
    this.blockScaleX = (this.blockWidth - 2) / 160;
    this.blockScaleY = (this.blockHeight - 2) / 250;
	this.scaleX = this.winSize.width / 320;
	this.scaleY = this.winSize.height / (500 + 4);
	this.bgScaleX = this.winSize.width / 80;
	this.bgScaleY = this.winSize.height / 142;
	this.dpiScale = 1 / window.devicePixelRatio;
	this.moveNum = 0;
	// alert("device pixel ratio: " + window.devicePixelRatio);
	// alert("[winSize.width , winSize.height]: [" + this.winSize.width + ", " + this.winSize.height + "] ");
	// alert("[blockWidth , blockHeight]: [" + this.blockWidth + ", " + this.blockHeight + "] ");
	// alert("[scaleX , scaleY]: [" + this.scaleX + ", " + this.scaleY + "] ");
	// alert("[blockScaleX , blockScaleY]: [" + this.blockScaleX + ", " + this.blockScaleY + "] ");
	
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
	this.scoreBg.width = 320;
	this.scoreBg.height = 32;	
	
	this.scoreBg.setScaleX(this.scaleX);
	this.scoreBg.setScaleY(this.scaleX);
	var positionY = this.winSize.height - this.scoreBg.height * this.scaleX / 2;
    this.scoreBg.setPosition(cc.p(this.blockWidth * 2, positionY));
	this.scoreBg.setAnchorPoint(cc.p(0.5, 0.5));
	this.rootNode.addChild(this.scoreBg);    
    this.scoreBg.setZOrder(199);
    this.scoreLabel = cc.LabelTTF.create("0.00''", "Arial", this.scoreBg.height * this.scaleY * 0.7);
	this.rootNode.addChild(this.scoreLabel);
	this.scoreLabel.setPosition(cc.p(this.blockWidth * 2, positionY));
    this.scoreLabel.setAnchorPoint(cc.p(0.5, 0.5));    	
    this.scoreLabel.setColor(cc.c3b(178, 206, 228));
    this.scoreLabel.setZOrder(200);
	
	// effect
	this.effectLabel = cc.LabelTTF.create("I Want U!", "Arial", 110);	
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
    var block = cc.Sprite.create("res/tile.png");
    block.setPosition(cc.p(this.positionX + this.blockWidth * i, this.blockHeight / 2 + this.blockHeight * j));
	var scaleX = this.blockScaleX;
	var scaleY = this.blockScaleY;
	if (cc.Director.getInstance().getWinSize().width < 400) {
		var scaleX = this.blockScaleX * 1.01;
		var scaleY = this.blockScaleY * 1.005;
	} 
	block.setScaleX(scaleX);
	block.setScaleY(scaleY);
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
			// var iconPositionX = this.blockWidth / 2;
			// var iconPositionY = (this.blockHeight - 10) / 2;
			var iconPositionX = this.blockWidth / this.scaleX;
			var iconPositionY = (this.blockHeight - 10) / this.scaleY;
			if (j == 1) {
				// add start label to the block
				var startLabel = cc.Sprite.create("res/start.png");
				block.addChild(startLabel);
				startLabel.setPosition(cc.p(iconPositionX, iconPositionY));	
				startLabel.setAnchorPoint(cc.p(0.5, 0.5));
				startLabel.setColor(cc.c3b(255, 255, 255));
				startLabel.setZOrder(1);
			}
			if (j % this.random2 == this.random2Mod && this.count_2_point < this.max_2_point && j >= this.start_2_point) {
				award = 2;
				var pointIcon = cc.Sprite.create("res/yogurt.png");
				block.addChild(pointIcon);
				pointIcon.setPosition(cc.p(iconPositionX, iconPositionY)) ;		
				pointIcon.setAnchorPoint(cc.p(0.5, 0.5));
				pointIcon.setColor(cc.c3b(255, 255, 255));
				pointIcon.setZOrder(1);	
				this.count_2_point++;
			} else 
			if (j % this.random8 == this.random8Mod && this.count_8_point < this.max_8_point && j >= this.start_8_point) {
				award = 8;
				var pointIcon = cc.Sprite.create("res/protein.png");
				block.addChild(pointIcon);					
				pointIcon.setPosition(cc.p(iconPositionX, iconPositionY)) ;		
				pointIcon.setAnchorPoint(cc.p(0.5, 0.5));
				pointIcon.setColor(cc.c3b(255, 255, 255));
				pointIcon.setZOrder(1);	
				this.count_8_point++;
			}  
			
			if (j == 50) {
				var logoIcon = cc.Sprite.create("res/iwantu.png");	
				logoIcon.setPosition(cc.p(iconPositionX, iconPositionY)) ;		
				logoIcon.setAnchorPoint(cc.p(0.5, 0.5));
				logoIcon.setColor(cc.c3b(255, 255, 255));
				logoIcon.setZOrder(1);		
				block.addChild(logoIcon);
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
	var bgColor = cc.Sprite.create("res/last.png");
	bgColor.setPosition(cc.p(0, 0)); // 
	bgColor.setScaleX(this.bgScaleX);
	bgColor.setScaleY(this.bgScaleY);
	bgColor.setAnchorPoint(cc.p(0, 0));
    
    //color bg
    this.scoreNode.addChild(bgColor);
    this.scoreNode.bgColor = bgColor;
		
	var successHeader1 = cc.LabelTTF.create("恭喜您", "Arial", 50 * this.scaleY);    	
    successHeader1.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2.5 + 110 * this.scaleY));
    successHeader1.setAnchorPoint(cc.p(0.5, 0.5));		
	
	var successHeader2 = cc.LabelTTF.create("通关了!", "Arial", 50 * this.scaleY);    	
    successHeader2.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2.5 + 60 * this.scaleY));
    successHeader2.setAnchorPoint(cc.p(0.5, 0.5));	
	
	var successHeader3 = cc.LabelTTF.create("100分", "Arial", 70 * this.scaleY);  
    successHeader3.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2.5));
    successHeader3.setAnchorPoint(cc.p(0.5, 0.5));	
	
	this.scoreNode.addChild(successHeader1);
	this.scoreNode.sh1 = successHeader1;
	this.scoreNode.addChild(successHeader2);
	this.scoreNode.sh2 = successHeader2;
	this.scoreNode.addChild(successHeader3);
	this.scoreNode.sh3 = successHeader3;
	
	var failureHeader1 = cc.LabelTTF.create("抱歉", "Arial", 50 * this.scaleY);    
	failureHeader1.setScaleX(1);
	failureHeader1.setScaleY(1);
    failureHeader1.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2.2 + 110 * this.scaleY));
    failureHeader1.setAnchorPoint(cc.p(0.5, 0.5));
	
	var failureHeader2 = cc.LabelTTF.create("游戏失败了", "Arial", 50 * this.scaleY);  
    failureHeader2.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 2.2 + 60 * this.scaleY));
    failureHeader2.setAnchorPoint(cc.p(0.5, 0.5));	
	this.scoreNode.fh1 = failureHeader1;
	this.scoreNode.fh2 = failureHeader2;
	
    //result
	var successLabel1 = cc.LabelTTF.create("总共用时", "Arial", 25 * this.scaleY);
    successLabel1.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 1.5 + 35 * this.scaleY));
    successLabel1.setAnchorPoint(cc.p(0.5, 0.5));
    this.scoreNode.addChild(successLabel1);
	this.scoreNode.sc1 = successLabel1;

	var successLabel2 = cc.LabelTTF.create("时间", "Arial", 30 * this.scaleY);
    successLabel2.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 1.5));
    successLabel2.setAnchorPoint(cc.p(0.5, 0.5));
    this.scoreNode.addChild(successLabel2);
	this.scoreNode.sc2 = successLabel2;
	
	var failedLabel = cc.LabelTTF.create("继续努力吧!", "Arial", 30 * this.scaleY); 
	failedLabel.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 1.5));
    failedLabel.setAnchorPoint(cc.p(0.5, 0.5)); 
	this.scoreNode.fc1 = failedLabel;
	
	// bonus
	var btnScaleX = this.winSize.width / 360 * this.dpiScale;
	var btnScaleY = btnScaleX;
	// alert("[btnScaleX , btnScaleY]: [" + btnScaleX + ", " + btnScaleY + "] ");
//    var btnBonus = cc.Sprite.create("image/bonus.png");
//	btnBonus.setScaleX(btnScaleX);
//	btnBonus.setScaleY(btnScaleY);
//    btnBonus.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 1.5 - 40 * this.scaleY));
//    btnBonus.setAnchorPoint(cc.p(0.5, 0.5));
//    this.scoreNode.addChild(btnBonus);
//    this.scoreNode.bonus = btnBonus;

	var btnAgain = cc.Sprite.create("image/again.png");
	btnAgain.setScaleX(btnScaleX);
	btnAgain.setScaleY(btnScaleY);
    btnAgain.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 1.5 - 40 * this.scaleY));
    btnAgain.setAnchorPoint(cc.p(0.5, 0.5));
    this.scoreNode.addChild(btnAgain);
    this.scoreNode.again = btnAgain;
	
	var footerLabel = cc.LabelTTF.create("如果您喜欢这个游戏，那么请分享您的好友吧!", "Arial", 18);   // fixed font size and scale
	footerLabel.setScaleX(this.scaleX * this.dpiScale);
	footerLabel.setScaleY(this.scaleY * this.dpiScale);	
	footerLabel.setPosition(cc.p(this.blockWidth * 2, this.blockHeight * 1.5 - 80 * this.scaleY));
    footerLabel.setAnchorPoint(cc.p(0.5, 0.5)); 
	this.scoreNode.addChild(footerLabel);
	   	
};


MainLayer.prototype.onUpdate = function (dt) {
    if (this.gameStatus == OVER) {
        return;
    }
    if (this.gameStatus == STARTED) {
        this.currentTime += dt;
        if (this.currentTime - this.lastScoreTime > 0.09) {
            this.scoreLabel.setString(getD(this.currentTime, 2) + "''");

            this.lastScoreTime = this.currentTime;
        }
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
    if (this.gameStatus == STARTED || this.gameStatus == START) {  //game start
        var newTouchPos = cc.p(this.pBegan.x, (this.pBegan.y + this.moveNum * this.blockHeight));
        for (var j = 0; j < this.pianoLength; j++) {
            for (var i = 0; i < 4; i++) {
                var block = this.tables[j][i];
                if (block) {
                    var blockRect = cc.rectCreate(block.getPosition(), [this.positionX, this.blockHeight / 2]);
                    if (cc.rectContainsPoint(blockRect, newTouchPos)) {
                        this.gameStatus = STARTED;
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
                                    // cc.AudioEngine.getInstance().playEffect(SOUNDS.win, false);
									// PauseAudio();									
                                }
                                this.blockNode.runAction(cc.MoveTo.create(0.2, cc.p(0, (this.blockNode.getPositionY() - this.blockHeight * heightNum))));
                                this.moveNum += 1;
								this.totalTap += 1;
                                this.scoreNode.sc2.setString(getD(this.currentTime, 2) + "''");
                                block.runAction(cc.Sequence.create(
                                    cc.ScaleTo.create(0, this.blockScaleX * 4 / 5, this.blockScaleY),
                                    cc.ScaleTo.create(0.2, this.blockScaleX, this.blockScaleY)
                                ));
                            }
                        }

                        //touch white ,game over
                        else {
                            
                            this.gameStatus = OVER;
                            // cc.AudioEngine.getInstance().playEffect(SOUNDS.error, false);
							// PauseAudio();
                            block.setColor(cc.c3b(255, 0, 0)); /* red */
                            block.runAction(cc.Sequence.create(
                                cc.ScaleTo.create(0, this.blockScaleX * 4 / 5, this.blockScaleY * 4 / 5),
                                cc.ScaleTo.create(0.2, this.blockScaleX, this.blockScaleY),
								cc.ScaleTo.create(0, this.blockScaleX * 4 / 5, this.blockScaleY * 4 / 5),
                                cc.ScaleTo.create(0.2, this.blockScaleX, this.blockScaleY),
								cc.ScaleTo.create(0, this.blockScaleX * 4 / 5, this.blockScaleY * 4 / 5),
                                cc.ScaleTo.create(0.2, this.blockScaleX, this.blockScaleY),
								cc.CallFunc.create(function () {
									this.createTopOverNode();   //create score node and move 
									// richard modify
									this.scoreNode.removeChild(this.scoreNode.sh1);
									this.scoreNode.addChild(this.scoreNode.fh1);
									this.scoreNode.removeChild(this.scoreNode.sh2);
									this.scoreNode.addChild(this.scoreNode.fh2);
									this.scoreNode.removeChild(this.scoreNode.sh3);
									this.scoreNode.removeChild(this.scoreNode.sc1);
									this.scoreNode.removeChild(this.scoreNode.sc2);
									this.scoreNode.addChild(this.scoreNode.fc1);									
									
//									this.scoreNode.removeChild(this.scoreNode.bonus);
									this.scoreNode.addChild(this.scoreNode.again);
									
									this.rootNode.removeChild(this.scoreBg);
									this.rootNode.removeChild(this.scoreLabel);
									// this.scoreNode.result.setString("失 败 了");
									// this.scoreNode.removeChild(this.scoreNode.success);
									// this.scoreNode.addChild(this.scoreNode.failed);
									// this.scoreNode.result2.setString(this.totalTap);
									this.scoreNode.runAction(cc.MoveTo.create(0.2, cc.p(0, this.blockHeight * this.moveNum)));	
									// alert("After-game " + JSON.stringify(globalUser));
									// window.onGameOverEvent.fire({type:'gameOver', success : false, score : this.totalTap})
								}, this)
                            ), this);
							
                            
                        }
                    }
                }
            }
        }
    }
	else if (this.gameStatus == OVER) {  //game over
        //back
        var backRect = cc.rectCreate(this.scoreNode.again.getPosition(), [200, 120]);
        if (cc.rectContainsPoint(backRect, this.pBegan)) {
            this.scoreNode.again.runAction(cc.Sequence.create(
                cc.CallFunc.create(function () {
                    cc.AudioEngine.getInstance().stopAllEffects();
                    cc.BuilderReader.runScene("", "MainLayer");
                })
            ));
        }
		
//		var viewBonusEvent = {type:'viewBonus', success : true, score : this.totalTap};
//		var bonusRect = cc.rectCreate(this.scoreNode.bonus.getPosition(), [200, 120]);
//        if (cc.rectContainsPoint(bonusRect, this.pBegan)) {
//            this.scoreNode.bonus.runAction(cc.Sequence.create(
//                cc.CallFunc.create(function () {
//                    cc.AudioEngine.getInstance().stopAllEffects();
//                    window.onViewBonusEvent.fire(viewBonusEvent);
//                })
//            ));
//        }
    }
};




