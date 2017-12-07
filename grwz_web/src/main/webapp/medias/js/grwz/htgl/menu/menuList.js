/**
 * Created by yucheng on 2017/9/10.
 */
initTree({onClick:function (event, treeId, treeNode) {
    window.frames[0].location.href=YC.handleUrl("/menu/menuEdit?id="+treeNode.id)
}});