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
//新版窗口管理打开弹出层
// window.openStack = function (win, title, areaType, url, param, callBacks) {
//     var area;
//     var iframeWinName = "";
//     if (areaType == "small") {
//         area = ['450px', '350px'];
//     } else if (areaType == "medium") {
//         area = ['700px', '500px'];
//     } else if (areaType == "big") {
//         area = ['900px', '600px'];
//     } else if (areaType == "tree") {
//         area = ['400px', '600px'];
//     } else {
//         area = areaType;
//     }
//     top.layer.open({
//         //zIndex:1,
//         type: 2,
//         title: title,
//         area: area,
//         maxmin: true,
//         parentWin: win,
//         param: param
//         // content: YC.handleUrl(url),
//         // success: function (layero, index) {
//         //     iframeWin = window[layero.find('iframe')[0]['name']];
//         //     iframeWinName = iframeWin && iframeWin.name;
//         //     _top.pushStackWin(iframeWin, win);
//         //     if (win.successCallback) {
//         //         win.successCallback();
//         //     }
//         //     if (callBacks && typeof(callBacks.success) == "function") {
//         //         callBacks.success(layero, index);
//         //     }
//         // },
//         // end: function () {
//         //     if (_top.ZENG)
//         //         _top.ZENG.msgbox.hide();
//         //     _top.closeLayerWin(iframeWinName);
//         //     if (callBacks && typeof(callBacks.end) == "function") {
//         //         callBacks.end();
//         //     }
//         // },
//         // cancel: function () {
//         //     var cwin = _top.getUpperestWin();
//         //     if (cwin != null) {
//         //         if (cwin.cancelCheck) {
//         //             return cwin.cancelCheck();
//         //         }
//         //     }
//         //     if (callBacks && typeof(callBacks.cancel) == "function") {
//         //         callBacks.cancel();
//         //     }
//         //     return true;
//         // }
//     })
// };