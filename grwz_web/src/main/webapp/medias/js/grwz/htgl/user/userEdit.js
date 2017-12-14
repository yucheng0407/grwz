/**
 * Created by rxnew on 2017/9/18.
 */
var id=GetQueryString('id');
var user;
var dl = {
    yhzh: {rule: {checkNull:true}},
    yhmc: {rule: {checkNull:true}},
    mm: {rule: {checkNull:true}},
    type: {//情报来源
        rule: {checkNull:true},
        type: "dict",
        dictConfig: {
            dictCode: "QBLY"
        },
        changeFunc: "changeQbly"
    }
}, Model = BaseModel.extend({
    modelName: "dl",
    initJson: dl
});
// $("#xmm").val(21321321)
$.ajax({
    type: "post",
    async: false,
    url: YC.handleUrl("/user/getUser"),
    data: {id:id},
    success: function (data) {
        user=data.data;
    }
});
var model = new Model(user);
function sure() {
    // var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    // top.layer.close(index); //再执行关闭
    if (model.validate()) {
        $.ajax({
            type: "post",
            async: false,
            url: YC.handleUrl("/user/saveUser"),
            data: {user: JSON.stringify(model.getJson())},
            success: function (data) {
                closeWin();
               var parentWin=top.frames["menu"];
                 parentWin.reloadTable(model.getUpJson());
            }
        })
    }
}