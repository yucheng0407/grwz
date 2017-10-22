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
                html = model.get("TS");
            } else {
                model.set("TS", 0);
            }//未激活角色
            html = ['<a href="', YC.handleUrl(model.get("URL")), '" target="menu">', model.get("MC"), '<span  class="badge" style="float:right">' + html + '</span>', '</a>'].join('');
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
var array=[];
var map={};
debugger
var update = function (model, type) {
    var dom = menuBackBone.currentModel.find('[select]').find('span');//被选中
    switch (type) {
        case "add": {
            if (model.TYPE == 0) {
                var menuModel = menuBackBone.getSelect()[0];
                menuModel.set('TS', menuModel.get('TS') + 1);
                var i = menuModel.get('TS');
                dom.text(i);
            }
            break;
        }
        case "remove": {
            if (model.TYPE == 0) {
                var menuModel = menuBackBone.getSelect()[0];
                if (menuModel.get('TS') > 0) {
                    menuModel.set('TS', menuModel.get('TS') - 1);
                    var i = menuModel.get('TS');
                    if (i <= 0) {
                        dom.empty();
                    }else dom.text(i);
                }
            }
            break;
        }
    }
}
