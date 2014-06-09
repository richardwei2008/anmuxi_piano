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

//StartLayer和MainLayer代码有重复相似之处 本应该整合到一块 不过考虑下还是分开 这样更清晰点 更好理解 也易于维护

/* start 四模式 */
StartLayer.prototype.onEnter = function () {
    var winSize = cc.Director.getInstance().getWinSize();
    this.blockWidth = winSize.width / 2;
    this.blockHeight = winSize.height / 2;
    this.scaleX = this.blockWidth / 300;
    this.scaleY = this.blockHeight / 500;
	
	
    this.tables = new Array(2);
    for (var j = 0; j < 2; j++) {
        var sprites = new Array(2);
        for (var i = 0; i < 2; i++) {
            sprites[i] = this.newBlock(i, j);
        }
        this.tables[j] = sprites;
    }
};

StartLayer.prototype.newBlock = function (i, j) {
    var block = cc.Sprite.create("res/whiteBlock.png");
    block.setPosition(cc.p(this.blockWidth / 2 + this.blockWidth * i, this.blockHeight / 2 + this.blockHeight * j));
    block.setScaleX(this.scaleX);
    block.setScaleY(this.scaleY);
    block.setZOrder(100);
    block.setAnchorPoint(cc.p(0.5, 0.5));

    var words = ["禅", "CocosEditor", "经典模式", "街机"];
    var wordNum = 0;
    if (j == 0 && i == 1) {
        wordNum = 1
    } else if (j == 1 && i == 0) {
        wordNum = 2
    } else if (j == 1 && i == 1) {
        wordNum = 3
    }

    var blockLabel = cc.LabelTTF.create(words[wordNum], "Arial", 50);
    block.addChild(blockLabel);
    blockLabel.setPosition(cc.p(this.blockWidth / 2 - 30, this.blockHeight / 2 - 60));	
    blockLabel.setAnchorPoint(cc.p(0.5, 0.5));
    // var colors = [cc.c3b(0, 0, 0) /*black*/, cc.c3b(255, 255, 255) /*white*/];
	// richard modify the color for anmuxi RGB(0, 92, 165)	
	var colors = [cc.c3b(0, 92, 165) /*dark blue*/, cc.c3b(255, 255, 255) /*white*/];	
	var theBlockColor = "black";
    if (i == j) {
        block.setColor(colors[0]);
        blockLabel.setColor(colors[1]);
    } else {
		theBlockColor = "white";
        block.setColor(colors[1]);
        blockLabel.setColor(colors[0]);
    }
	console.log("Block [i, j]: [" + i + ", " + j + "] " + words[wordNum] + " with color [" + theBlockColor + "]");
	console.log("Block Position [width, height]: [" + (this.blockWidth / 2 + this.blockWidth * i) + ", " + (this.blockHeight / 2 + this.blockHeight * j) + "]");
	console.log("Label Position [width, height]: [" + (this.blockWidth / 2 - 30) + ", " + (this.blockHeight / 2 - 60) + "]");
	
    block.label = blockLabel;

    this.startNode.addChild(block);
    return block;
};


StartLayer.prototype.onTouchesBegan = function (touches, event) {
    this.pBegan = touches[0].getLocation();  // to get touch position
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 2; i++) {
            var block = this.tables[j][i];
            if (block) {
                var blockRect = cc.rectCreate(block.getPosition(), [this.blockWidth / 2, this.blockHeight / 2]);
				console.log("Block [i, j]: [" + i + ", " + j + "] --- " 
					+ "Block Rect ([width, heigth], (width, height)]: ("
					+ "[" + (block.getPosition().x) + ", " + (block.getPosition().y) + "]"
					+ "[" + (this.blockWidth / 2) + ", " + (this.blockHeight / 2) + "]"
					+ ")");
                if (cc.rectContainsPoint(blockRect, this.pBegan)) {
                    cc.AudioEngine.getInstance().playEffect(PIANO_SIMPLE[1 + getRandom(6)], false);
                    if (j == 0 && i == 0) {
                        GAME_MODE = MODE_ZEN;
                    } else if (j == 0 && i == 1) {
                        GAME_MODE = MODE_NOT;
                    } else if (j == 1 && i == 0) {
                        GAME_MODE = MODE_CLASSIC;
                    } else if (j == 1 && i == 1) {
                        GAME_MODE = MODE_ARCADE;
                    }
                    if (GAME_MODE != MODE_NOT) {
                        //   if (GAME_MODE == MODE_CLASSIC) {
                        cc.BuilderReader.runScene("", "MainLayer");
                        //    }
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
/* end 四模式 */

