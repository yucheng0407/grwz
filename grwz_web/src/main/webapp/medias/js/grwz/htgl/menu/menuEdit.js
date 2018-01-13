/**
 * Created by rxnew on 2017/9/18.
 */
var id = GetQueryString('id');
var menu;
var dl = {
    mc: {rule: {checkNull:true}},
    sjMenuMc: {rule: {checkNull: true}},
    url: {rule: {checkNull: true}}
}, Model = BaseModel.extend({
    modelName: "dl",
    initJson: dl,
    disabled:['sjMenuMc']
});
$('[data-property="icon"]').on("click",function () {
   openStack(window, "213", "medium","/icon/iconList");
});
$.ajax({
    type: "post",
    async: false,
    url: YC.handleUrl("/menu/getMenu"),
    data: {id: id},
    success: function (data) {
        menu = data.data;
    }
});
var model = new Model(menu);
function save() {
    debugger
    model.getJson();
}
//     function sure() {
//     // var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
//     // top.layer.close(index); //再执行关闭
//     if (model.validate()) {
//         $.ajax({
//             type: "post",
//             url: YC.handleUrl("/user/saveUser"),
//             data: {user: JSON.stringify(model.getJson())},
//             success: function (data) {
//                 closeWin();
//                var parentWin=top.frames["menu"];
//                  parentWin.reloadTable(model.getUpJson());
//             }
//         })
//     }
// }