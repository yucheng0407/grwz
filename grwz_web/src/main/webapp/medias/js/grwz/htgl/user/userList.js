/**
 * Created by yucheng on 2017/9/10.
 */
var column = [
    {name: 'ID', type: 'ID', width: 10, renderer: "String"},
    {name: '账号', type: 'YHZH', width: 15, renderer: "String"},
    {name: '密码', type: 'MM', width: 15, renderer: "String"},
    {
        name: '状态', type: 'TYPE', width: 10, renderer: function (v) {
        var zt;
        switch (v) {
            case '0': {
                zt = "<span style='color: #cc0000'>未激活</span>";
                break;
            }
            case '1': {
                zt = "临时用户";
                break;
            }
            case '2': {
                zt = "普通用户";
                break;
            }
            case '3': {
                zt = "超级用户";
                break;
            }
            default: {
                zt = "异常数据";
                break;
            }
        }
        return zt;
    }
    },
    {name: '时间', type: 'CJSJ', width: 20, renderer: "date"},
    {
        name: '地图', type: 'MAP', width: 10, renderer: function () {
        return '<a href="javascript:void(0)" onclick="openMap()">打开地图</a>';
    }
    },]
    , UserModel = BaseTable.extend({
    modelName: "table",
    column: column,
    pageSize: 10,
    url: YC.handleUrl("/user/getUserList"),
    backModel: top.update
});
var userModel = new UserModel();
userModel.reDraw();
function reloadTable(Data) {
    userModel.compareModel(Data);
    userModel.reDraw();
}
function deletes() {
    var ids = '';
    $.each(userModel.getSelect(), function (i, e) {
        ids += e.get("ID") + ',';
    });
    $.ajax({
        type: "post",
        url: YC.handleUrl("/user/deleteUser"),
        data: {ids: ids.substring(0, ids.length - 1)},
        success: function (data) {
            userModel.deleteRow();
        }
    });
}
function edit() {
    alert(userModel.getSelect()[0].get('ID'));
}
function add() {//add
    openStack(window, "添加用户", "small", "/user/userEdit");
}
function openMap() {
    var opt = {
        mapData: {xm:'余程',dz:'问问企鹅额'},
        enableDrawingTool:true,
        callBack:f
    };
    openBaiduMap(opt)
}
function f(e) {
    debugger
}