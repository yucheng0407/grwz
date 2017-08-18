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
function login() {
    if (model.validate()) {
        $.ajax({
            url: "/test/main/getUser",
            data: model.getJson()
        })
    }
}