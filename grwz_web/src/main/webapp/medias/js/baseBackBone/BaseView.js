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
    backModel:null,//返回模型
    baseListenView:null,//(监听器)
    pageDate:null,
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
                collection.remove($(this).attr("id"));
        });
        this.baseListenView.deleteModel();
    },
    /*****************************************************************
     *  添加model
     **********************************/
    addModel: function (model) {
        var collection = this.collection;
        // var cid = e.currentTarget.parentElement.parentElement.id;
        // this.collection.get(cid).destroy();
       collection.add(model)
    },
    /******************************************************************
     初始化collection(监听器)
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
        this.pageDate = {
            pageNo: 1,
            pageSize:20//后台缓存
        };
        var GistRows = BaseListenView.extend({
            el:"[data-model="+this.modelName+"]",
            modelName: this.modelName,
            collection: this.collection,
            view: this,
            pageSize: this.pageSize,
            pageDate: this.pageDate,
            backModel:this.backModel
        });
        //开始监听
        this.baseListenView=new GistRows();
        //初始化模型数据
    },
    /******************************************************************
     初始化collection(数据)
     ******************************************************************/
    reDraw:function () {
        this.collection.fetch({reset: true, data: {map: JSON.stringify(this.pageDate)}});
    }
});

