/*
 * Created by yucheng on 2017/8/13.
 */
var YC={};
var contentType = '/test'
var option = {//初始
    module: null,//自定义js
    success: function () {//返回函数
    },
    async: false//同步或异步导入JS(默认同步)
}, load = function (_option) {
    for (var data in _option) {
        option[data] = _option[data];
    }
    require(['BaseTable'], function () {
        //添加项目名
        for (var i in option.module) {
            if(option.module[i].indexOf("/")==0){option.module[i]=contentType+option.module[i]}
        }
        if (option.async == true) {
            require(option.module, function () {
                option.success();
            })
        } else {
            tbload();
        }
    });
};
require.config({//js
    baseUrl: contentType+"/medias/js/",
    urlArgs:'v='+(new Date()).getTime(),//清楚缓存
    paths: {
        "whichButtonJs": "utilJs/whichButtonJs",
        "BaseModel": "baseBackBone/BaseModel",
        "BaseView": "baseBackBone/BaseView",
        "BaseTable":"baseBackBone/BaseTable",
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
    },
    shim: {
        "whichButtonJs": {
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
        "backbone": {
            deps: ["underscore", "jQuery", "bootstrap", "whichButtonJs"],
            exports: "Backbone"
        },
        "BaseView": {
            deps: ["backbone","BaseModel"]
        },
        "BaseTable":{
            deps: ["backbone","BaseView"]
        },
        "BaseModel": {
            deps: ["backbone"]
        }
    }
});
var i = 0;
function tbload() {//同步加载
    if (option.module == null || option.module[i] == null) {
        option.success();
        return null;
    }
    require([option.module[i]], function () {
        i++;
        tbload();
    })
}
YC.handleUrl=function (url) {
   return contentType+url;
}

