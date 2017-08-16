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
//渲染登录用户
var SubMenuView = Backbone.View.extend({
    el:'.dropdown-menu',//选择器
    render: function (data) {
        var html='';
        _.forEach(data,function(t){
            html=[html,'<li><a href="',t.url,'">',t.mc,'</a></li>'].join('');
        });
        $(this.el).append(html);
    }
});
//view
var MenuView = Backbone.View.extend({
    el:'.navbar-nav',//选择器
    render: function (model) {
        var html;
        if(model.get('type')==1){//下拉
            debugger
             html=['<li class="dropdown" style="float: right" ><a href="#" ',
             'class="dropdown-toggle" data-toggle="dropdown" ',
             'role="button" aria-haspopup="true" aria-expanded="false">',model.get("mc"),
                 ' <span class="caret"></span></a><ul id="f" class="dropdown-menu">',
             '</ul></li>'].join('');
            $(this.el).append(html);
            var subMenuView=new SubMenuView();
            subMenuView.render(model.get("menu"))
        }else{//按钮
             html=['<li><a href="',model.get("url"),'">',model.get("mc"),'</a></li>'].join('');
            $(this.el).append(html);
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
            '<ul class="nav navbar-nav"style="width: 100%">',
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
