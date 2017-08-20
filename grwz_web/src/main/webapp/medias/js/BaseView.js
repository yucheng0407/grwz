/**
 * Created by yucheng on 2017/8/20.
 */
/**、
 * View层
 */
var BaseView = Backbone.View.extend({
    PageNo:1,
    pageSize:null,
    className:'',
    collection:'',
    view:'',
    events: {
        'click a.js-remove': 'deleteRow',
        'click a.js-edit': 'editRow',
        'blur td[contenteditable]': 'saveRow',
        'next  a.js-next':'nextRow'
    },
    deleteRow:function (e) {
            var cid = e.currentTarget.parentElement.parentElement.id;
        this.collection.get(cid).destroy();
        this.collection.remove(cid);
    },
    nextRow:function (e) {
      if(this.collection.models.length>this.PageNo*this.pageSize) {
          this.PageNo++;
          this.render()
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
        _.forEach(['reset', 'remove', 'range'], function (e) {
            self.listenTo(self.collection, e, self.render);
        });
    },
    /*****************************************************************
     *  方法动态渲染
     *****************************************************************/
    render: function () {
        var html = '';
        var view=this.view;
        var models =this.collection.models.slice(this.pageSize*(this.PageNo-1),this.PageNo*this.pageSize);
        _.forEach(models, function (model) {
            var tr = new view();
            html += tr.render(model).el.outerHTML;
        });
        $("*[data-model=" + this.className + "]").append(html);
        return this;
    }
});

// this.el.innerHTML = '<td>' + model.get('description') + '</td><td>'+ model.get('url') + '</td><td>'
//     + model.get('created_at') + '</td><td><a href="javascript:void(0)" class="js-remove">X</a> ' +
//     '<a href="javascript:void(0)" class="js-edit">E</a>&nbsp;</td>