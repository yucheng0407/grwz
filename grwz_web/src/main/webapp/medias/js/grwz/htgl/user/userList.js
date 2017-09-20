/**
 * Created by yucheng on 2017/9/10.
 */
var column =[{name:'ID',type:'ID',width:10},{name:'账号',type:'YHZH',width:20},{name:'密码',type:'MM',width:20},{name:'时间',type:'CJSJ',width:20,data:"date"}]
    ,UserModel=BaseTable.extend({
    modelName:"table",
    column:column,
    pageSize: 10,
    url:YC.handleUrl("/user/getUserList")

}),userModel=new UserModel();

function deletes() {
    userModel.deleteRow();
}
function edit() {
   alert(userModel.getSelect()[0].ID);
}
function add() {//add
    openStack(window,"添加用户","big","/user/userEdit");
}