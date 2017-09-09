var BaseTable = Backbone.View.extend({
    tagName:'tr',
    url:null,
    column :null,//table渲染,other其他
    /*****************************************************************
     *  方法渲染行
     *****************************************************************/
    render: function (model) {
        this.el.id = model.cid;



        //
        // this.el.innerHTML = [
        // ].join("");
        // return this;
    },
    /*****************************************************************
     *  方法初始化表头
     *****************************************************************/
    initialize:function () {
        var html='';
        $.each(this.column, function (i, data) {
         html+='<th>'+data.name+'</th>';
        });
       html=['<table class="table table-striped"><thead><tr>'
            ,html,'</tr></thead><tbody></tbody></table>'].join('');
       $(".table-responsive").append(html);
       debugger
        var Xw = BaseCollection.extend({
            url:this.url
        });
        var xw = new Xw();
        var GistRows = BaseView.extend({
            className: "xw",
            collection: xw,
            view:this,
            pageSize:10
        });
        new GistRows();
        // xw.fetch({reset: true,data:{PageNo: 1}});
    }
});/**
 * Created by yucheng on 2017/9/10.
 */
