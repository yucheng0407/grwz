/**
 * Created by yucheng on 2017/8/20.
 */
var GistRow = BaseView.extend({
    tagName: 'div',
    modelName:"xw",
    url:YC.handleUrl("/main/backbone"),
    pageSize:3,//分页
    append: function (model) {
        this.el.id = model.cid;
        this.el.className ="col-lg-4";
        this.el.innerHTML = [
            '<img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="',
            'alt="Generic placeholder image" width="140" height="140">',
            '<h2>',model.get("id"),'</h2><p>Donec sed odio dui. Etir ac, vestient commodo cursus magna.</p>',
            '<p><a class="btn btn-default" href="#" role="button">View details»</a></p>'
        ].join("");
        return this;
    },
    /*****************************************************************
     *  方法表拼接
     *****************************************************************/
    render:function (models) {
        var _html='';
        var self=this;
        //行
        _.forEach(models, function (model) {
            _html += self.append(model).el.outerHTML;
        });
        //拼接
        return _html;
    }
});
new GistRow();


