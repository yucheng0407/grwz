/**
 * Created by yucheng on 2017/9/10.
 */
var column = [
    {name: 'ID', type: 'ID', width: 10, renderer: "String"},
    {name: '名称', type: 'MC', width: 15, renderer: "String"},
    {name: '时间', type: 'CJSJ', width:'', renderer: "date"}
    ]
    , MenuModel = BaseTable.extend({
    modelName: "table",
    column: column,
    pageSize: 10,
    url: YC.handleUrl("/menu/getMenuList"),
    backModel: top.update
});
var menuModel = new MenuModel();
menuModel.addDoublTable(open);
menuModel.reDraw();
function reloadTable(Data) {
    menuModel.compareModel(Data);
    menuModel.reDraw();
}
function deletes() {
    var ids = '';
    $.each(menuModel.getSelect(), function (i, e) {
        ids += e.get("ID") + ',';
    });
    $.ajax({
        type: "post",
        url: YC.handleUrl("/user/deleteUser"),
        data: {ids: ids.substring(0, ids.length - 1)},
        success: function (data) {
            menuModel.deleteRow();
        }
    });
}
function open(model) {
    openStack(window, "添加角色", "big", "/tree/openTree",{a:2},{success:function (win) {

    }});
}
function edit() {
    alert(menuModel.getSelect()[0].get('ID'));
}
function add() {//add
    openStack(window, "添加角色", "big", "/menu/menuEdit");
}

