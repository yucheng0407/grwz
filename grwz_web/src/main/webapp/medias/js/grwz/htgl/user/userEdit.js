/**
 * Created by rxnew on 2017/9/18.
 */
var dl = {
    yhzh: {rule: "not null"},
    yhmc: {rule: "not null"},
    mm: {rule: "not null"},
    type: {//情报来源
        rule: "not null",
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
var model = new Model();

function sure() {
    // var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    // top.layer.close(index); //再执行关闭
    if (model.validate()) {
        $.ajax({
            type: "post",
            url: YC.handleUrl("/user/saveUser"),
            data: {user: JSON.stringify(model.getJson())},
            success: function (data) {
                closeWin();
                top.frames[0].location.reload();
            }
        })
    }
}