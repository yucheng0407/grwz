/**
 * Created by yucheng on 2017/9/10.
 */
initTree({
    onClick: function (event, treeId, treeNode) {
        //加载和绑定子窗口保存按钮
        $("[name='menu']").unbind().attr("src", YC.handleUrl("/menu/menuEdit?id=" + treeNode.id)).on('load', function () {
            $(window.frames[0].document).find("#save").click(function () {
                treeNode.name = window.frames[0].model.getJson().mc;
                $.fn.zTree.getZTreeObj(treeId).updateNode(treeNode);
            });
        });
    },
    beforeRemove: function (treeId, treeNode) {
        top.layer.confirm('是否删除?', {icon: 2, title: '提示'}, function (index) {
            $.fn.zTree.getZTreeObj(treeId).removeNode(treeNode);
            top.layer.close(index);
        });
        return false
    },
    beforeDrop: function (treeId, treeNodes, targetNode) {
        // top.layer.confirm('是否移动?', {icon: 2, title: '提示'}, function (index) {
        //     for (var i=0,len=treeNodes.length;i<len;i++) {
        //         $.fn.zTree.getZTreeObj(treeId).moveNode(targetNode, treeNode[i], "inner");
        //         top.layer.close(index);
        //     }
        // });
        return true
    }
})
;
