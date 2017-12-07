/**
 * Created by rxnew on 2017/12/6.
 */

function initTree(_setting) {//初始化
    //初始化
    var setting = {
        async: {
            enable: true,
            url: YC.handleUrl("/tree/getMenuTree"),
            autoParam: ["id"],
            otherParam: null
        },
        edit: {
            enable: true,
            editNameSelectAll: true,
            removeTitle: "删除节点",
            renameTitle: "编辑节点名称",
            showRemoveBtn: true,
            showRenameBtn: true
        },
        check: {
            enable: _setting.check||false,
            chkboxType: {"Y": "ps", "N": "ps"}
        },
        view: {
            showLine: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onCheck: onCheck,
            onClick: _setting.onClick||null
        }
    };
    $.ajax({
        type: "post",
        url: YC.handleUrl("/tree/getMenuTree"),
        data: null,
        success: function (data) {
            var zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, data);
            var node = zTreeObj.getNodeByParam("id", 1);
            expandNodes('treeDemo', node);

        }
    });

};
/**
 * 勾选之后
 * @param event
 * @param treeId  树对象
 * @param treeNode 树节点
 */
function onCheck(event, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    if (treeNode.checked) {
        expandNodes(treeId, treeNode, true);//展开
    }
    else treeObj.expandNode(treeNode, false, true, true);//折叠
}
/**
 * 单击之后
 * @param event
 * @param treeId  树对象
 * @param treeNode 树节点
 */
// function onClick(event, treeId, treeNode) {
// debugger
// window.frames[0].location.href=YC.handleUrl("/menu/menuEdit?id="+treeNode.id)
// }

/**
 * 展示
 * @param event
 * @param treeId  树对象
 * @param treeNode 树节点
 */
function showRemoveBtn(treeId, treeNode) {
    return !treeNode.isFirstNode;
}

function showRenameBtn(treeId, treeNode) {
    return !treeNode.isFirstNode;
}
/**
 * 全部展示和局部展示
 * @param event
 * @param treeId  树对象
 * @param treeNode 树节点
 */
function expandNodes(treeId, node, all) {
    if (!node) return;
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    if (node.isParent && node.checked) {
        if (!node.zAsync) {
            treeObj.reAsyncChildNodes(node, "refresh", false, function () {//异步
                if (all) treeObj.checkNode(node, true, true);
                for (var i = 0, l = node.children.length; i < l; i++) {
                    expandNodes(treeId, node.children[i], all);
                }
            });
        } else {
            treeObj.expandNode(node, true, false, true)//展开一级
            for (var i = 0, l = node.children.length; i < l; i++) {
                expandNodes(treeId, node.children[i], all);
            }
        }
    }
}
