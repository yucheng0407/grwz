/**
 * Created by rxnew on 2017/9/15.
 */
/**、
 * 弹出层（配置监听器）
 */
// var tempTop =false;
// try{
//     parentWin = window.parent;
//     // //平台开发的系统
//     // if(window.parent.RX){
//     //     if(window.parent.RX.config.defaultPath != window.RX.config.defaultPath){
//     //         tempTop = true;
//     //     }
//     // }else{
//     //     //外部系统
//     //     tempTop = true;
//     // }
//     if(window == window.parent){
//         tempTop = true;
//     }
// }catch(e){
//     crossOrigin = true;
//     tempTop = true;
// }
// var _top = function(){
//     debugger
//     if(tempTop){
//         return window;
//     }else {
//         var twin = window.parent;
//         var i = 0;
//         while (!twin.tempTop) {
//             twin = twin.parent;
//             i++;
//             if(i > 10){
//                 twin = window;
//                 tempTop = true;
//             }
//         }
//         return twin;
//     }
// }();
