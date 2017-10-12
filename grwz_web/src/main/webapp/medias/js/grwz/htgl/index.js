/**
 * Created by rxnew on 2017/9/11.
 */
var MenuBackBone = BaseView.extend(
    {
        tagName: 'li',
        modelName: 'menu',//渲染入口（必须）
        url: YC.handleUrl("/htgl/getGlMenu"),//后台地址（必须）
        append: function (model, i) {
            var html = '';
            this.el.id = model.cid;
            this.el.className = 'select';
            if (model.get("TS")) {
                html = '<span  class="badge" style="float:right">' + model.get("TS") + '</span>';
            }//未激活角色
            html = ['<a href="', YC.handleUrl("/user/userList"), '" target="menu">' + model.get("MC") + html + '</a>'].join('');
            this.el.innerHTML = html;
            return this;
        },
        render: function (models) {
            var html = '';
            var self = this;
            $.each(models, function (i, data) {
                html += self.append(data, i).el.outerHTML;
            });
            html = '<ul class="nav nav-sidebar">' + html + '</ul>'
            // html=['<ul class="nav nav-sidebar">',
            //      '<li class="active"><a href="javascript:void(0)">',
            //      'Overview <span class="sr-only">(current)</span></a></li>',
            //      '<li><a href="#">Reports</a></li>',
            //      '<li><a href="#">Analytics</a></li>',
            //     '<li><a href="#">Export</a></li>',
            //      '</ul>'].join('')
            return html;
        }
    }
);
var menuBackBone = new MenuBackBone();
menuBackBone.reDraw();
var update = function (model,type) {
    $.ajax({
        type: "post",
        url: YC.handleUrl("/htgl/getMenu"),
        data: {menuType:menuBackBone.getSelect()[0].ID},
        success: function (data) {
        }
    });
}
