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
        require(['BaseModel'], function () {
                if(option.async==true) {require(option.module, function () {
                        option.success();
                    })}else {
                    tbload();
                }
                });
    };
require.config({//js
    baseUrl: "/test/medias/js/",
    paths: {
        "BaseModel":"BaseModel",
        "TweenLite":"baseJs/TweenLite.min",
        "EasePack": "baseJs/EasePack.min",
        "demo-2": "baseJs/demo-2",
        "rAF": "baseJs/rAF",
        "jQuery":"baseJs/jquery-3.2.1.min",
        "underscore":"baseJs/underscore-min",
        "backbone":"baseJs/backbone-min",
        "backbone-relational":"baseJs/backbone-relational",
        "bootstrap":"baseJs/bootstrap.min",
        "formUtils":"baseJs/formUtils"
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
        },
        "BaseModel":{
            deps:["backbone"]
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


