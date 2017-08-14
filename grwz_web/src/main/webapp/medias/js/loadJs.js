/*
 * Created by yucheng on 2017/8/13.
 */
var option={//初始
    module: null,//自定义js
    success: function () {//返回函数
    },
    async:false//同步或异步导入JS(默认同步)
},load=function (_option) {
        for (var data in _option){
         option[data]=_option[data];
        }
        require(['backbone'], function () {
                if(option.async==true) {require(option.module, function () {
                        option.success();
                    })}else {
                    tbload();
                }
                });
    };
require.config({//js
    baseUrl: "/test/medias/js/baseJs/",
    paths: {
        "TweenLite":"TweenLite.min",
        "EasePack": "EasePack.min",
        "demo-1": "demo-1",
        "rAF": "rAF",
        "jQuery":"jquery-3.2.1.min",
        "underscore":"underscore-min",
        "backbone":"backbone-min",
        "bootstrap":"bootstrap.min",
        "formUtils":"formUtils"
    },
    shim:{
        "bootstrap":{
            deps:["jQuery"]
        },
        "formUtils":{
            deps:["jQuery"]
        },
        "underscore":{
            exports:"_"
        },
        "backbone":{
            deps:["underscore","jQuery","bootstrap"],
            exports:"Backbone"
        }
    }
});
var i=0;
function tbload() {//同步加载
    if(option.module==null||option.module[i]==null) { option.success();
    return null;}
    require([option.module[i]], function () {
        i++;
        tbload();
    })
}


