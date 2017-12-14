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
    beforeDrop: function (treeId, treeNodes, targetNode,moveType) {
        if (targetNode &&
            (moveType==='inner'||(moveType!=='inner'&&targetNode.getParentNode()))) {
            return true
        } else {
            top.layer.msg("无法移动", {
                time: 1000 //0.6秒关闭（如果不配置，默认是3秒）
            })
            return false
        }
    },
    onDrop: function (event, treeId, treeNodes, targetNode, moveType) {
        var ids = "";
        var nodes;
        var tarId;
        if (moveType === 'inner') {//成为子节点
            tarId = targetNode.id;
            nodes = targetNode.children;
        } else {//成为同级节点
            tarId = targetNode.getParentNode().id;
            nodes = targetNode.getParentNode().children;
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
            ids += nodes[i].id + ","
        }
        $.ajax({
            type: "post",
            async: false,
            url: YC.handleUrl("/menu/dropMenu"),
            data: {tarId: tarId, ids: ids.substring(0, ids.length - 1)},
            success: function (data) {
                top.layer.msg("移动成功", {
                    time: 1000 //0.6秒关闭（如果不配置，默认是3秒）
                })
            }
        })
    }
})
;
