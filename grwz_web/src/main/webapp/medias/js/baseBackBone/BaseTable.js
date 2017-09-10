var BaseTable = Backbone.View.extend({
    tagName:'tr',//（必须）
    modelName:null,//渲染入口（必须）
    pageSize:10,//分页（必须）
    url:null,//后台地址（必须）
    column :null,//table渲染,other其他
    i:1,
    /*****************************************************************
     *  方法渲染行
     *****************************************************************/
    render: function (model) {
        this.el.id = model.cid;
        this.el.className="table";
        var html='<th>'+this.i+'</th>';
        $.each(this.column, function (i, data) {
            html+='<th>'+model.get(data.type)+'</th>';
        });
        this.el.innerHTML=html;
        this.i++;
         return this;
    },
    /*****************************************************************
     *  方法表头和行
     *****************************************************************/
    append:function (models) {
        //表头
        var html='<th>序号</th>';
        var _html='';
        var self=this;
        $.each(this.column, function (i, data) {
            html+='<th>'+data.name+'</th>';
        });
        //行
        _.forEach(models, function (model) {
            _html += self.render(model).el.outerHTML;
        });
        if(!models){ _html='<tr><th>无数据</th></tr>';}
        //拼接
        html=['<table class="table table-striped"><thead><tr>'
            ,html,'</tr></thead><tbody>',_html,'</tbody></table>'].join('');
        debugger
     return html;
    },
    /*****************************************************************
     *  方法初始化数据
     *****************************************************************/
    initialize:function () {
       /**
       查询列表数据
        **/
        var Xw = BaseCollection.extend({
            url:this.url
        });
        var xw = new Xw();
        var GistRows = BaseView.extend({
            modelName:this.modelName,
            collection: xw,
            view:this,
            pageSize:this.pageSize
        });
        //开始监听
        new GistRows();
        xw.fetch({reset: true,data:{PageNo: 1}});
    }
});
