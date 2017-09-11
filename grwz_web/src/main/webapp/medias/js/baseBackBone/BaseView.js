/******************************************************************
 初始化列表数据
 ******************************************************************/
var BaseView = Backbone.View.extend({
    modelName:null,//渲染入口（必须）
    pageSize:null,//分页（必须）
    url:null,//后台地址（必须）
    data:null,//数据
    /*****************************************************************
     *  取得table选中值
     *****************************************************************/
    getSelect:function () {
        var data=this.data;
        var array=new Array();
        $("[select]").each(function () {
            array.push(data.get($(this).attr("id")).attributes)
        });
        return array;
    },
    /*****************************************************************
     *  删除选中Model
     **********************************/
    deleteRow: function () {
        var data=this.data;
        // var cid = e.currentTarget.parentElement.parentElement.id;
        // this.collection.get(cid).destroy();
        $("[select]").each(function () {
            data.remove($(this).attr("id"));
        });
    },
    /******************************************************************
     初始化列表数据
     ******************************************************************/
    initialize:function () {
        /**
         查询列表数据
         **/
        var Xw = BaseCollection.extend({
            url:this.url
        });
        this.data = new Xw();
        var GistRows = BaseListenView.extend({
            modelName:this.modelName,
            collection:this.data,
            view:this,
            pageSize:this.pageSize
        });
        //开始监听
        new GistRows();
        this.data.fetch({reset: true,data:{PageNo: 1}});
    }
});/**
 * Created by rxnew on 2017/9/11.
 */
