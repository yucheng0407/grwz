/**
 * Created by yucheng on 2017/8/20.
 */
var GistRow = Backbone.View.extend({
    tagName: 'div class="col-lg-4"',
    render: function (model) {
        this.el.id = model.cid;
        this.el.innerHTML = [
            '<img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="',
            'alt="Generic placeholder image" width="140" height="140">',
            '<h2>',model.get("id"),'</h2><p>Donec sed odio dui. Etir ac, vestient commodo cursus magna.</p>',
            '<p><a class="btn btn-default" href="#" role="button">View details»</a></p>',
        ].join("");
        return this;
    }
});
var Xw = BaseCollection.extend({
    url: "/test/main/backbone"
});
var xw = new Xw();

var GistRows = BaseView.extend({
    className: "xw",
    collection: xw,
    view: new GistRow(),
    pageSize:3,
    pageCount:null
});
new GistRows();
xw.fetch({reset: true,data:{PageNo: 1}});
