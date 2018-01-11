/**
 * Created by rxnew on 2017/8/17.
 */
var dl = {
    user: {rule: {checkNull:true}},
    pass: {rule: {checkNull:true}}
},Model = BaseModel.extend({
    modelName: "dl",
    initJson: dl
});
var model = new Model();
function login(option) {
    if (model.validate()) {
        $.ajax({
            type:"post",
            url: YC.handleUrl("/main/getUser"),
            data: model.getJson(),
        success:function(data){
    $("[type='button']").button('reset');
    if(data.success){
      if(option=='login') window.location.href=YC.handleUrl("/main/index")
        else window.location.reload();
    }
    else alert("账号密码错误");
}
        })
    }
}