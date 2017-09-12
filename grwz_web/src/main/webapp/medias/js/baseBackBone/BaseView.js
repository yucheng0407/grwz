/******************************************************************
 * Created by yucheng on 2017/9/11.
 初始化，操作列表数
 ******************************************************************/
var BaseView = Backbone.View.extend({
    modelName: null,//渲染入口（必须）
    pageSize: null,//分页数（必须）
    url: null,//后台地址（必须）
    data: null,//数据
    total:null,
    /*****************************************************************
     *  取得table选中值
     *****************************************************************/
    getSelect: function () {
        var data = this.data;
        var array = new Array();
        $("[select]").each(function () {
            array.push(data.get($(this).attr("id")).attributes)
        });
        return array;
    },
    /*****************************************************************
     *  删除选中Model
     **********************************/
    deleteRow: function () {
        var data = this.data;
        // var cid = e.currentTarget.parentElement.parentElement.id;
        // this.collection.get(cid).destroy();
        $("[select]").each(function () {
            data.remove($(this).attr("id"));
        });
    },
    /******************************************************************
     初始化列表数据
     ******************************************************************/
    initialize: function () {
        /**
         查询列表数据
         **/
        var model=this;
        var Xw = BaseCollection.extend({
            url: this.url,
            parse: function (response) {
                if (response.success) {
                    model.total=response.data.total;
                    return response.data.rows;
                }
            }
        });
        this.data = new Xw();
        //分页数据
        var pageDate = {
            pageNo: 1,
            pageSize: 20
        };
        var GistRows = BaseListenView.extend({
            modelName: this.modelName,
            collection: this.data,
            view: this,
            pageSize: this.pageSize,
            pageDate: pageDate,
            total:this.total
        });
        //开始监听
        new GistRows();
        this.data.fetch({reset: true, data: {map: JSON.stringify(pageDate)}});
    }
});

