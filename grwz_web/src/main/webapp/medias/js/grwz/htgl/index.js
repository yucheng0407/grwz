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
            if (i == 0) {
                this.el.className = 'select active'
            }
            else {
                this.el.className = 'select'
            }
            if (model.get("TS")) {
                html = '<span menu="'+model.get("MC")+'" class="badge" style="float:right">' + model.get("TS") + '</span>';
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
var update = function () {
    function Animal(name){
        this.name = name;
        this.showName = function(){
            alert(this.name);
        }
        alert(131)
    }

    function Cat(name){
        alert(111111111)
        Animal.call(this,name);
        debugger
    }

   var a=new Cat("Black Cat");
    a.showName()



   //  var dom = $("*[data-model=" + menuBackBone.modelName + "]");
   // alert( dom.find(".active").find("span").attr("menu"))
   //  debugger
   //  $.ajax({
   //      type: "post",
   //      url: YC.handleUrl("/htgl/getMenu"),
   //      data:{menuType:'阿达的'},
   //      success: function (data) {
   //
   //      }
   //  });
}
