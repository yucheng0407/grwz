/**
 * Created by rxnew on 2017/8/17.
 */
var BaseModel = Backbone.Model.extend({
    className: "",
    initJson: "",
    initialize: function () {
        this.initPropertys();
    },
    /*****************************************************************
     *  方法：内部方法，验证参数(defaults)
     *****************************************************************/
    validate: function () {
        var boolean = true;
        var attrs = this.getJson();
        var json = this.initJson;
        var model = this.className;
        $.each(attrs, function (key, value) {
            if (json[key].rule == 'not null' && value == '') {
                if (boolean) {
                    $("[data-model=" + model + "][data-property=" + key + "]")
                        .attr("data-content", "该项不能为空")
                        .attr("data-placement", "bottom")
                        .attr("data-trigger", "manual")
                        .popover('show');
                    $(".popover").css("color","#080808");
                }
                boolean = false;
            } else $("[data-model=" + model + "][data-property=" + key + "]").popover('destroy');
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
        });
    },
    /*****************************************************************
     *  方法：获得文本框的值
     *****************************************************************/
    getJson: function () {
        var model = this;
        $("*[data-model=" + this.className + "][data-property]").each(function (i, t) {
            model.set($(t).attr("data-property"), $(t).val());
        });
        return model.attributes;
    }
}), BaseCollection = Backbone.Collection.extend({
    model: BaseModel,
    parse: function (response) {
        return response.data;
    }
});

