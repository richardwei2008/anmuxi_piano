if (sys.platform == 'browser') {
    var require = function (file) {
        var d = document;
        var s = d.createElement('script');
        s.src = file;
        d.body.appendChild(s);
    }
} else {
    require("jsb.js");
}


var ccb_resources = [
    {src: "res/fonts/score_font.fnt"},
    {src: "res/fonts/score_font.png"},
    {src: "res/whiteBlock.png"},
	{src: "res/tile.png"}
];

MODE_CLASSIC = 0; //经典
MODE_ARCADE = 1;  //街机
MODE_ZEN = 2;    //禅
MODE_NOT = 3;

GAME_MODE = 0;

require("js/jquery.min.js");
require("js/WechatShare.js");
require("PlayAudio.js");
require("StartLayer.js");
require("MainLayer.js");
require("CocosEditor.js");
require("PianoMusics.js");


if (sys.platform == 'browser') {

    var Cocos2dXApplication = cc.Application.extend({
        config: document['ccConfig'],
        ctor: function () {
            this._super();
            cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
            cc.initDebugSetting();
            cc.setup(this.config['tag']);
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        },
        applicationDidFinishLaunching: function () {
            var director = cc.Director.getInstance();
            // director->enableRetinaDisplay(true);
            // director.setDisplayStats(this.config['showFPS']);
            // set FPS. the default value is 1.0/60 if you don't call this
            director.setAnimationInterval(1.0 / this.config['frameRate']);
            var glView = director.getOpenGLView();
			var height = cc.Director.getInstance().getWinSize().height;
			var width = cc.Director.getInstance().getWinSize().width;
			var resolutionSizeWidth = window.resolution.width; // 640; // default
			var resolutionSizeHeight = window.resolution.height; // 1014; // default 1014
			// if (height <= resolutionSizeHeight && width <= resolutionSizeWidth) {
			// 	resolutionSizeWidth = width;
			// 	resolutionSizeHeight = height;
			// }
			// cc.RESOLUTION_POLICY.SHOW_ALL, cc.RESOLUTION_POLICY.NO_BORDER
			// cc.EGLView.getInstance().resizeWithBrowserSize(true);
            glView.setDesignResolutionSize(resolutionSizeWidth, resolutionSizeHeight, cc.RESOLUTION_POLICY.SHOW_ALL);
            cc.Loader.preload(ccb_resources, function () {
                cc.BuilderReader.runScene("", "MainLayer");
            }, this);
            return true;
        }
    });
    var myApp = new Cocos2dXApplication();
} else {
    cc.BuilderReader.runScene("", "MainLayer");
}