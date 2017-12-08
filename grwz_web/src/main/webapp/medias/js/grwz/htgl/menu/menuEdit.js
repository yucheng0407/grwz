/**
 * Created by rxnew on 2017/9/18.
 */
var id=GetQueryString('id');
var menu;
var dl = {
    mc: {rule: "not null"},
    sjMenuMc: {rule: "not null"},
    url: {rule: "not null"}
}, Model = BaseModel.extend({
    modelName: "dl",
    initJson: dl
});

$.ajax({
    type: "post",
    async: false,
    url: YC.handleUrl("/menu/getMenu"),
    data: {id:id},
    success: function (data) {
        menu=data.data;
    }
});
var model = new Model(menu);

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