/**
 * Created by yucheng on 2017/8/17.
 */

/**
 *Model层
 */
var BaseModel = Backbone.Model.extend({
    modelName: "",
    initJson: "",
    initialize: function () {
        if(this.initJson)this.initPropertys();
    },
    /*****************************************************************
     *  方法：内部方法，验证参数
     *****************************************************************/
    validate: function () {
        var boolean = true;
        var model = this;
        var attrs = this.getJson();
        var json = this.initJson;
        $(".popover").hide();
        $.each(json, function (key, value) {
            if (value.rule == 'not null' && $.trim(attrs[key]) === '') {//为空
                model.tsk(key, "为空");
                boolean = false;
                return boolean;
            }
        });
        return boolean;
    },
    /*****************************************************************
     *  方法：内部方法，依据配置初始化属性参数(defaults)
     *****************************************************************/
    initPropertys: function () {
        var model = this;
        var json = this.initJson;
        //传入参数为基础配置json
        $.each(json, function (key, value) {
            if (!model.get(key)) {
                model.set(key, "")
            }

            // Tooltip.prototype.fixTitle = function () {
            //     var $e = this.$element
            //     if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
            //         $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
            //     }
            // }
        });
        this.reDraw()
    },
    /******************************************************************
     方法：渲染文本框的值
     ******************************************************************/
    reDraw: function () {
        var model = this;
        $("*[data-model=" + this.modelName + "][data-property]").each(function (i, t) {
            $(t).val(model.get($(t).attr("data-property")));
        });
    },
    /*****************************************************************
     *  方法：内部方法，大写转换(defaults)
     *****************************************************************/
    getUpJson: function () {
        var attrs = this.getJson();
        var upAttrs = {};
        $.each(attrs, function (key, value) {
            var str = key.toUpperCase();
            upAttrs[str] = value;
        });
        return upAttrs;
    },
    /*****************************************************************
     *  方法：获得文本框的值
     *****************************************************************/
    getJson: function () {
        var model = this;
        $("*[data-model=" + this.modelName + "][data-property]").each(function (i, t) {
            model.set($(t).attr("data-property"), $(t).val());
        });
        return model.attributes;
    },
    /*****************************************************************
     *  方法：文本框提示框
     *****************************************************************/
    tsk: function (key, str) {
        var model = this.modelName;
        $("[data-model=" + model + "][data-property=" + key + "]")
            .attr("data-content", "该项不能" + str)
            .attr("data-placement", "bottom")
            .attr("data-title", "")
            .attr("data-trigger", "manual")
            .focus().popover("show")
            .unbind('blur').blur(function () {
            $(".popover").hide();
        });
        $("[type='button']").button('reset');
        $(".popover").css("color", "#080808");
    }

}), BaseCollection = Backbone.Collection.extend({
    model: BaseModel,
    parse: function (response) {
        if (response.success)return response.data;
    }
});
