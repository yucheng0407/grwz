/**
 * Created by rxnew on 2017/8/17.
 */
var dl = {
    user: {rule: "not null"},
    pass: {rule: "not null"}
}, yhdl = {
    url: "/test/main/getUser",
}

var Model = BaseModel.extend({
    className: "dl",
    initJson: dl
});
var model = new Model();
function login(option) {
    if (model.validate()) {
        $.ajax({
            type:"post",
            url: "/test/main/getUser",
            data: model.getJson(),
        success:function(data){
    $("[type='button']").button('reset');
    if(data.success){
      if(option=='login') window.location.href="/test/main/index"
        else window.location.reload();
    }
    else alert("账号密码错误");
}
        })
    }
}