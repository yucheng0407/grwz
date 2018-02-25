/*
 * Created by yucheng on 2017/8/13.
 */
var YC = {};
var contentType = '/test';
var option = {//初始
    module: null,//自定义js
    success: function () {//返回函数
    },
    async: false//同步或异步导入JS(默认同步)
};
require.config({//js
    baseUrl: contentType + "/medias/js/",
    urlArgs: 'v=' + (new Date()).getTime(),//清楚缓存
    map: {
        '*': {
            "css": "baseJs/css.min"//导入css插
        }
    },
    paths: {
        //自定义
        "ztree.core": "ztree/jquery.ztree.all-3.5.min",
        "tree": "baseJs/tree",
        //
        "PerfectLoad": "perfectLoad/PerfectLoad",
        "whichButtonJs": "utilJs/whichButtonJs",
        "BaseModel": "baseBackBone/BaseModel",
        "BaseView": "baseBackBone/BaseView",
        "BaseLayer": "layer/BaseLayer",
        "Layer": "layer/layer",
        "BaseListenView": "baseBackBone/BaseListenView",
        "BaseTable": "baseBackBone/BaseTable",
        "TweenLite": "baseJs/TweenLite.min",
        "EasePack": "baseJs/EasePack.min",
        "demo-2": "baseJs/demo-2",
        "rAF": "baseJs/rAF",
        "jQuery": "baseJs/jquery-3.2.1.min",
        "underscore": "baseJs/underscore-min",
        "backbone": "baseJs/backbone-min",
        "backbone-relational": "baseJs/backbone-relational",
        "bootstrap": "baseJs/bootstrap.min",
        "formUtils": "baseJs/formUtils"
        //临时
    },
    shim: {//依赖关系
        //
        "PerfectLoad": {
            deps: ["jQuery"]
        },
        "bootstrap": {
            deps: ["jQuery"]
        },
        "formUtils": {
            deps: ["jQuery"]
        },
        "underscore": {
            exports: "_"
        },
        "Layer": {
            deps: ["jQuery", "css!" + contentType + "/medias/js/layer/skin/layer.css"]
        },
        //添加
        "backbone": {
            deps: ["underscore", "bootstrap", "formUtils", "Layer"],
            exports: "Backbone"
        },
        "BaseModel": {
            deps: ["backbone"]
        },

        "BaseListenView": {
            deps: ["BaseModel"]
        },
        "BaseView": {
            deps: ["BaseListenView"]
        },
        "BaseTable": {
            deps: ["BaseView"]
        },
        //自定义js
        "ztree.core": {
            deps: ["css!" + contentType + "/medias/css/metroStyle/metroStyle.css"]
        },
        "tree": {
            deps: ["ztree.core"]
        }
    }
});
var cssConfig = {
    mainCss: {
        "iconfont":"/medias/css/iconfont/iconfont.css",
        "bootstrap": "/medias/css/bootstrap.min.css"
    },
    css: {"component": "/medias/css/component.css",
        "main": "/medias/css/main/main.css"}
};
var i = 0;
function tbload() {//同步加载
    if (option.module == null || option.module[i] == null) {
        if (option.success) option.success();
        return null;
    }
    require([option.module[i]], function () {
        i++;
        tbload();
    })
}
YC.handleUrl = function (url) {
    return contentType + url;
};
var loadJs= function (_option) {
    for (var data in _option) {
        option[data] = _option[data];
    }
    require(['BaseModel'], function () {//异步加载
        console.log("初始化js");
        //添加项目名
        if (option.module) {
            for (var i in option.module) {
                if (option.module[i].indexOf("/") === 0) {
                    option.module[i] = contentType + option.module[i]
                }
            }
            if (option.async === true) {
                require(option.module, function () {
                    if (option.success) option.success();
                })
            } else {
                tbload();
            }
        }
    });
};
var loadCss = function (_option) {
    console.log("初始化css");
    for (var css in  cssConfig.mainCss) {//内部css
        var mainCss = contentType + cssConfig.mainCss[css];
        document.write('<link rel="stylesheet" href="' + mainCss + '"/>');
    }
    if (_option && _option.module) {//外部css
        for (var i in _option.module) {
            var _css;
            if (_option.module[i].indexOf("/") === 0) {
                _css = contentType + _option.module[i];
            } else {
                _css = contentType + cssConfig.css[_option.module[i]];
            }
            document.write('<link rel="stylesheet" href="' + _css + '"/>');
        }
    }
};
