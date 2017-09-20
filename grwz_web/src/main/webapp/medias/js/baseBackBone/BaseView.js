/******************************************************************
 * Created by yucheng on 2017/9/11.
 初始化，操作collection
 ******************************************************************/
var BaseView = Backbone.View.extend({
    modelName: null,//渲染入口（必须）
    url: null,//后台地址（必须）
    collection: null,//数据(models数据)(collection必须)
    total: null,//数据总长度
    index: 1,//下标((当前页面)
    /*****************************************************************
     *  取得collection选中值
     *****************************************************************/
    getSelect: function () {
        var collection = this.collection;
        var array = new Array();
        var dom=$("*[data-model=" + this.modelName + "]");
        dom.find("[select]").each(function () {
            array.push(collection.get($(this).attr("id")).attributes)
        });
        return array;
    },
    /*****************************************************************
     *  删除collection选中值
     **********************************/
    deleteRow: function () {
        var collection = this.collection;
        // var cid = e.currentTarget.parentElement.parentElement.id;
        // this.collection.get(cid).destroy();
        var dom=$("*[data-model=" + this.modelName + "]");
        var len=dom.find("[select]").length;
        this.total=this.total-len;
        dom.find("[select]").each(function (i) {
            if (i==len - 1) {
                collection.remove($(this).attr("id"), {silent: false})
            }
            else collection.remove($(this).attr("id"), {silent: true});
        });
    },
    /******************************************************************
     初始化collection
     ******************************************************************/
    initialize: function () {
        /**
         查询collection数据
         **/
        var moder = this;
        var Xw = BaseCollection.extend({
            url: this.url,
            parse: function (response) {
                if (response.success) {
                    if (response.data.total) {
                        moder.total = response.data.total;
                    }
                    if(response.data.rows){//分页
                        return response.data.rows;
                    }else return response.data;//不分页
                }
            }
        });
        this.collection = new Xw();
        //分页数据
        var pageDate = {
            pageNo: 1,
            pageSize:20//后台缓存
        };
        var GistRows = BaseListenView.extend({
            el:"[data-model="+this.modelName+"]",
            modelName: this.modelName,
            collection: this.collection,
            view: this,
            pageSize: this.pageSize,
            pageDate: pageDate
        });
        //开始监听
        new GistRows();
        this.collection.fetch({reset: true, data: {map: JSON.stringify(pageDate)}});
    }
});

