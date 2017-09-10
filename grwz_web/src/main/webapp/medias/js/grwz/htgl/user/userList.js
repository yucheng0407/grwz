/**
 * Created by yucheng on 2017/9/10.
 */
var column =[{name:'姓名',type:'YHMC'},{name:'姓名1',type:'YHZH'},{name:'姓名2',type:'MM'}]
    ,UserModel=BaseTable.extend({
    modelName:"table",
    column:column,
    url:YC.handleUrl("/user/getUserList")

});
new UserModel();