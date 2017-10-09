/**
 * Created by yucheng on 2017/8/20.
 */
/**、
 * View层（配置监听器）
 */
var BaseListenView = Backbone.View.extend({
    el: null,//监听区域（data-model内）
    pageNo: 1,//数据库下标
    pageSize: null,//分页数（必须）
    modelName: '',//（必须）
    collection: '',//(models数据)
    view: '',//视图自身
    pageDate: null,//(后台传分页值)
    //事件监听
    events: {
        'click .select': 'select',//(单选)
        //table行
        'click .select-table': 'selectTable',//(多选)
        //翻页
        'click a.next': 'next',
        'click li.page': 'page',//页号
        'click a.previous': 'previous'
        // 'click a.js-remove': 'deleteRow',
        // 'click a.js-edit': 'editRow',
        // 'blur td[contenteditable]': 'saveRow',

    },
    /*****************************************************************
     *  选中(多选)
     *****************************************************************/
    selectTable: function (e) {
        var dom = $(e.currentTarget);//触发事件的当前块
        if (dom.attr("style")) {//已选中
            dom.removeAttr("style select");
        }
        else {
            dom.css({"background-color": "#428bca"}).attr("select", true);//未被选中

        }
    },
    /*****************************************************************
     *  选中(单选)
     *****************************************************************/
    select: function (e) {
        var dom = $(e.currentTarget);//当前块
        this.$(".active")
            .removeClass("active").removeAttr("select");//移除当前data-model下的所有被选块
        dom.addClass("active").attr("select", true);//被选中
    },
    //翻页
    /*****************************************************************
     *  方法分页(上一页)
     *****************************************************************/
    previous: function () {
        var view = this.view;
        if (view.index > 1) {
            view.index--;
            this.update();
        } else alert("没有上一页")
    },
    /*****************************************************************
     *  方法分页(下一页页数)
     *****************************************************************/
    next: function () {
        var view = this.view;
        if (view.total > view.index * this.pageSize) {
            view.index++;
            this.update();
        } else alert("没有下一页")
    }
    , /*****************************************************************
     *  翻页(页数)
     *****************************************************************/
    page: function (e) {
        var view = this.view;
        var tag = e.currentTarget;
        view.index = $(tag).text();
        this.update();
    }
    ,
    /*****************************************************************
     *  删除model
     *****************************************************************/
    deleteModel: function () {
        var view = this.view;
        //当前页减少数
        var i = parseInt((view.index * this.pageSize - view.total) / this.pageSize);//保留整数
        if (i >= 1) {
            view.index = view.index - i;//当前页减少数
            view.pageIndex = view.pageIndex - i;//翻页页减少数
        }
        if (view.index < 1) view.index = 1;
        if (view.pageIndex < 1) view.pageIndex = 1;
        this.update();
    }
    ,
    /*****************************************************************
     *  更新(一直到大于等于下一页数缓存)
     *****************************************************************/
    update: function () {
        //(下一页大于页数)
        var baseListenView = this;
        var view = this.view;
        if (!view.total) view.total = this.collection.models.length;
        if ((this.collection.models.length >=view.index * this.pageSize)|| this.collection.models.length == view.total
        ) {
            this.render();
        } else {
            ++this.pageNo;
            this.pageDate.pageNo = this.pageNo;
            this.collection.fetch({//后台添加
                remove: false,//(add:true（无效）用remove: false替代)
                silent: true,//不触发add监听器防止重复调用
                data: {map: JSON.stringify(this.pageDate)},
                success: function () {
                    baseListenView.update();//触发add监听器(全部添加完)
                }
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
     *  Model监听器
     *****************************************************************/
    initialize: function () {
        var self = this;
        _.forEach(['reset', 'add'], function (e) {
            self.listenTo(self.collection, e, self.update);
        });
        self.listenTo(self.collection, 'remove', self.deleteModel);
    },
    /*****************************************************************
     *  方法动态渲染(分页)
     *****************************************************************/
    render: function () {
        var html = '';
        var view = this.view;
        var models;
        if (this.pageSize) {
            models = this.collection.models.slice(this.pageSize * (view.index - 1), view.index * this.pageSize);
        }
        else {
            models = this.collection.models;
        }
        html = view.render(models);
        // _.forEach(models, function (model) {
        //     html += view.render(model).el.outerHTML;
        // });
        this.el.innerHTML = html;
        return this;
    }
});

// this.el.innerHTML = '<td>' + model.get('description') + '</td><td>'+ model.get('url') + '</td><td>'
//     + model.get('created_at') + '</td><td><a href="javascript:void(0)" class="js-remove">X</a> ' +
//     '<a href="javascript:void(0)" class="js-edit">E</a>&nbsp;</td>