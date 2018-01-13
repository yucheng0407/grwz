/**
 * Created by yucheng on 2018/1/13.
 */
$(".icon").on("click",function (event) {
  console.log(event.target.outerHTML);
   var parentWin= window.parent.frames[0].frames[0];
    parentWin.model.reDraw(parentWin.$('[data-property="icon"]'),event.target.outerHTML);
    closeLayer(window);
});
