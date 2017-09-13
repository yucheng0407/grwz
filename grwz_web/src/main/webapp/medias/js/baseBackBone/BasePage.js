/*****************************************************************
 *  （View）渲染
 *****************************************************************/
var BasePage = Backbone.View.extend({
    tagName: 'li',//（必须）
    column: null,//table渲染,other其他{表头}
    pageSize: 5,//分页(页面)
    index: 1,//下标((当前页面)
    /*****************************************************************
     *  方法渲染行（View）
     *****************************************************************/
    append: function (model) {
        this.el.id = model.cid;
        this.el.className = "table";
        var html = '<td style="text-align:center;" >' + this.i + '</td>';//序号
        $.each(this.column, function (i, data) {
            var _data;
            if (data.data == "date") {//时间搓转时间
                var date = new Date(model.get(data.type));
                _data = date.Format("yyyy-MM-dd HH:mm:ss");
            } else {
                _data = model.get(data.type);
            }
            html += '<td style="text-align:center;">' + _data + '</td>';//值
        });
        this.el.innerHTML = html;
        this.i++;
        return this;
    },
    /*****************************************************************
     *  方法表头和行（View）
     *****************************************************************/
    render: function (models) {
        //表头
        var html = '<th style="text-align:center;">序号</th>';
        //宽度
        var width = '';
        var _html = '';
        var self = this;
        $.each(this.column, function (i, data) {
            if (data.width) {
                width += '<col style="width:' + data.width + '%">';
            }
            else {
                width += '<col style="width:' + 50 + '%">';
            }
            html += '<th style="text-align:center;">' + data.name + '</th>';
        });
        //行
        this.i = 1;
        _.forEach(models, function (model) {
            _html += self.append(model).el.outerHTML;
        });
        if (!models[0]) {
            _html = '<tr><td>无数据</td></tr>';
        }
        else {
            width = '<col style="width:5%">' + width
        }//序号宽度
        //拼接
        // contenteditable="true"
        html = ['<table class="table table-striped " ><colgroup>', width, '</colgroup><thead><tr>'
            , html, '</tr></thead><tbody>', _html, '</tbody></table>', this.page()].join('');
        return html;
    }
});
/**
 * Created by yucheng on 2017/9/13.
 */
