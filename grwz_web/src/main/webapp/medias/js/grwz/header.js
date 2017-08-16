/**
 * 菜单
 * Created by rxnew on 2017/8/16.
 */
//菜单model
var Menu=Backbone.Model.extend()
    ,Menus = Backbone.Collection.extend({
    models:Menu,
        url: '/test/main/getMenu',
        parse: function (response) {
            return response.data;
        }
    }),
    menus = new Menus();
//view
var SubMenuView = Backbone.View.extend({
    el:'.dropdown-menu',//选择器
    render: function (object) {
        var html;
        html=['<li><a href="#主页">个人中心</a></li>'].join('');
        $(this.el).append(html);
    }
});
//view
var MenuView = Backbone.View.extend({
    el:'.navbar-nav',//选择器
    render: function (model) {
        var html;
        if(model.get('type')!=null&&model.get('type')==1){//下拉
             html=['<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a><ul class="dropdown-menu">',
             '</ul> </li>'].join('');
            $(this.el).append(html);
            var subMenuView=new SubMenuView();
            subMenuView.render(model.get("xjcd"))
        }else{
             html=['<li><a href="#主页">主页</a></li>'].join('');
            $(this.el).append(html);
debugger
        }
    }
});

var MenusView = Backbone.View.extend({
    el:'.navbar-wrapper',//选择器
    collection:menus,
    initialize:function () {//数据更新
        this.listenTo(this.collection,'reset',this.render)
    },
    render: function () {//渲染
       var html=['<div class="container" style="width: 75%" >',
            '<nav class="navbar navbar-inverse navbar-static-top">',
            '<div class="container">',
            '<div id="navbar" class="navbar-collapse collapse " >',
            '<ul class="nav navbar-nav">',
            '</ul></div></div></nav></div>'].join('');
        $(this.el).append(html);
        _.forEach(this.collection.models,function (model) {
            var menuView=new MenuView();
            menuView.render(model);
        });
        return this;
    }
});
var menusView = new MenusView();
menus.fetch({reset:true});
