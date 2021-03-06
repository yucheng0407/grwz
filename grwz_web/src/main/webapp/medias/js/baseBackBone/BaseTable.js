/*****************************************************************
 *  （View）表格渲染
 *****************************************************************/
var BaseTable = BaseView.extend({
    tagName: 'tr',//（必须行）
    column: null,//table渲染,other其他{表头}
    pageSize: 10,//分页(必须页面)
    pageCount: 5,//(翻页数)
    pageIndex: 1,//(翻页)
    /*****************************************************************
     *  方法渲染行（View字段）
     *****************************************************************/
    append: function (i, model) {
        this.el.id = model.cid;
        this.el.className = "select-table";
        var html = '<td style="text-align:center;" >' + ((this.pageSize * (this.index - 1) + 1) + i) + '</td>';//序号
        $.each(this.column, function (i, data) {
            var _data;
            var title='';
            switch (data.renderer) {
                case "date": {
                    var date = new Date(model.get(data.type));
                    _data = date.Format("yyyy-MM-dd HH:mm:ss");
                        title=_data;
                    break;
                }
                case "String": {
                    _data = model.get(data.type);
                    title=_data;
                    break;
                }
                default: {
                    _data = data.renderer(model.get(data.type));
                    break;
                }
            }

            html += '<td title="'+title+'" style="text-align:center">' + _data + '</td>';//值
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
        //表头名
        $.each(this.column, function (i, data) {
            if (data.width) {
                width += '<col width="' + data.width + '%"/>';
            }
            else {
                width += '<col/>';
            }
            html += '<th style="text-align:center;">' + data.name + '</th>';
        });
        //数据行
        $.each(models, function (i, model) {
            _html += self.append(i, model).el.outerHTML;
        });
        if (!models[0]) {
            _html = '<tr><td>无数据</td></tr>';
        }
        else {
            width = '<col style="width:5%">' + width
        }//序号宽度
        //拼接
        // contenteditable="true"
        html = ['<table class="table table-striped table-hover " ><colgroup>', width, '</colgroup><thead><tr>'
            , html, '</tr></thead><tbody>', _html, '</tbody></table>', this.page()].join('');
        return html;
    },
    /********************************************
     * 翻页
     ********************************************/
    page: function () {
        var html = '';
        if (!((this.pageIndex < this.index))) {
            if (this.index != 1) this.pageIndex--;//不是第一页
        } else if (!(this.index < (this.pageIndex + this.pageCount) - 1)) {
            if (this.index != (Math.ceil(this.total / this.pageSize))) this.pageIndex++;//最后一页
        }
        for (var i = 0; i < this.pageCount; i++) {//更新翻页（根据pageIndex）
            var ind = Math.ceil(this.total/ this.pageSize);//总页码数
            var index = this.pageIndex + i;
            if (index<=ind) {
                var str = '';
                if (index == this.index) {
                    str = ' active';//当前页
                }
                html = html + '<li class="page' + str + '"><a href="javascript:void(0)">' + (index) + '</a></li>';
            } else break;
        }
        if (0 == this.total) {
            str = ' active';//当前页
            html = html + '<li class="' + str + '"><a href="javascript:void(0)">1</a></li>';
        }
        html = ['<ul class="pagination pagination-right" style="margin:0px;float: right"><li>',
            '<a href="javascript:void(0)" class="previous">&laquo;</a></li>',
            html,
            '<li><a href="javascript:void(0)" class="next">&raquo;</a>',
            '</li></ul>'].join('');
        return html;
    }
});
