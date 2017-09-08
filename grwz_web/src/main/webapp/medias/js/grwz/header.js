/**
 * 菜单
 * Created by rxnew on 2017/8/16.
 */
//菜单model
var Menus = BaseCollection.extend({
        url: '/test/main/getMenu'
    }),
    menus = new Menus();
//渲染登录用户菜单
function SubMenuView(data) {
    var html = '';
    if (data.length == 0)return html;
    _.forEach(data, function (t) {
        html = [html, '<li><a href="', YC.handleUrl(t.url), '">', t.mc, '</a></li>'].join('');
    });
    debugger
    return ['<ul class="dropdown-menu">', html, '</ul>'].join('');
}
//view
/**
 * 菜单渲染
 * 0普通菜单1下拉2登录
 * @param collection
 * @returns {string}
 */
function loadMenu(collection) {
    var html = '';
    _.forEach(collection.models, function (model) {
        switch (model.get('type')) {//下拉
            case '1':
                html = [html, '<li class="dropdown " style="float: right" ><a href="#" ',
                    'class="dropdown-toggle " data-toggle="dropdown" ',
                    'role="button" aria-haspopup="true" aria-expanded="false">',
                    '<span class="btn btn-primary" style="display: inline"><span class="glyphicon glyphicon-user"></span>',
                    '<span class="caret"></span></span></a>', SubMenuView(model.get("menu")), '</li>'].join('');
                break;
            case '0':
                html = [html, '<li><a href="', YC.handleUrl(model.get("url")), '">', model.get("mc"), '</a></li>'].join('');
                break;
            case '2':
                html = [html, '<li style="float: right"><a href="#myModal" ',
                'data-toggle="modal" onfocus="this.blur()"><span class="btn ',
                'btn-primary" style="display: inline">'
                    , model.get("mc"), '</span></a></li>'].join('');
                break;
        }
    });
    return html
}
var MenusView = Backbone.View.extend({
    el:'.navbar-wrapper',//选择器
    collection: menus,
    initialize: function () {//数据更新
        this.listenTo(this.collection, 'reset', this.render)
    },
    render: function () {//渲染
        var html = ['<div class="container" style="width: 75%" >',
            '<nav class="navbar navbar-inverse navbar-static-top">',
            '<div class="container">',
            '<div id="navbar" class="navbar-collapse collapse " >',
            '<ul class="nav navbar-nav"style="width: 100%">',
            loadMenu(this.collection), '</ul></div></div></nav></div>'].join('');
        $(this.el).append(html);
        return this;
    }
});
var menusView = new MenusView();
menus.fetch({reset: true});
function logout() {
    $.ajax({
        type:"post",
        url: "/test/main/getUser",
        data: {user:"访客",pass:123456},
        success:function(){
            window.location.reload();
        }

    })
}