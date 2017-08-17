/**
 * Created by rxnew on 2017/8/17.
 */
var yhdlJson={
    user:{},
    pass:{}
},yhdl={
    url:"/test/main/getUser",
    data:yhdlJson
}
var modal=new Modal(yhdl);
modal.render();