/**
 * Created by yucheng on 2017/8/20.
 */
/**、
 * View层（配置监听器）
 */
var BaseListenView = Backbone.View.extend({
    el: 'body',//全局监听
    index: 1,//模型下标
    pageNo: 1,//页码号
    pageSize: null,//分页数（必须）
    total: null,//数据库总数
    modelName: '',//（必须）
    collection: '',//(models数据)
    view: '',//视图自身
    pageDate: null,//(后台传分页值)
    events: {
        'click tr.table': 'select',
        'click a.js-next': 'next'
        // 'click a.js-remove': 'deleteRow',
        // 'click a.js-edit': 'editRow',
        // 'blur td[contenteditable]': 'saveRow',

    },
    /*****************************************************************
     *  选中
     *****************************************************************/
    select: function (e) {
        var cid = e.currentTarget.id;
        if ($("#" + cid).attr("style")) {//已选中
            $("#" + cid).removeAttr("style select");
        }
        else {
            $("#" + cid).css({"background-color": "#428bca"}).attr("select", true);//被选中

        }
    },
    /*****************************************************************
     *  方法分页(下一页小于等于页数)
     *****************************************************************/
    next: function () {
        this.index++;
        this.update();
    }
    ,
    /*****************************************************************
     *  更新(下一页小于等于页数)
     *****************************************************************/
    update: function () {
        //(下一页大于页数)
        if ((this.collection.models.length - this.index * this.pageSize) > 0
        ) {
            this.render();
        } else {
            ++this.pageNo;
            this.pageDate.pageNo =this.pageNo;
            this.collection.fetch({//后台添加
                remove: false,//(add:true（无效）用remove: false替代)
                data: {map:JSON.stringify(this.pageDate)}
            });
        }
    },
    // editRow: function (e) {
    //     var tr = e.currentTarget.parentElement.parentElement,
    //         i = 0;
    //
    //     while (i < 3) {
    //         tr.children[i].setAttribute('contenteditable', true);
    //         i++;
    //     }
    // },
    // saveRow: function (e) {
    //     var tr = e.currentTarget.parentElement,
    //         model = gists.get(tr.id);
    //     model.set({
    //         'description' : tr.children[0].innerText,
    //         'url': tr.children[1].innerText,
    //         'created_at': tr.children[2].innerText
    //     });
    // },
    /*****************************************************************
     *  方法初始化监听器
     *****************************************************************/
    initialize: function () {
        var self = this;
        _.forEach(['reset', 'add', 'remove'], function (e) {
            self.listenTo(self.collection, e, self.update);
        });
    },
    /*****************************************************************
     *  方法动态渲染(分页)
     *****************************************************************/
    render: function () {
        var html = '';
        var view = this.view;
        var models = this.collection.models.slice(this.pageSize * (this.index - 1), this.index * this.pageSize);
        html = view.render(models);
        // _.forEach(models, function (model) {
        //     html += view.render(model).el.outerHTML;
        // });
        $("*[data-model=" + this.modelName + "]").html(html);
        return this;
    }
});

// this.el.innerHTML = '<td>' + model.get('description') + '</td><td>'+ model.get('url') + '</td><td>'
//     + model.get('created_at') + '</td><td><a href="javascript:void(0)" class="js-remove">X</a> ' +
//     '<a href="javascript:void(0)" class="js-edit">E</a>&nbsp;</td>