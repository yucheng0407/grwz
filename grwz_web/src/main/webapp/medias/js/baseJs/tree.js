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
            drag: {
                isCopy: false,
                isMove: true
            },
            enable: true,
            editNameSelectAll: true,
            removeTitle: "删除",
            renameTitle: "编辑",
            showRemoveBtn: true,
            showRenameBtn: false
        },
        check: {
            enable: _setting.check || false,
            chkboxType: {"Y": "ps", "N": "ps"}
        },
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            showLine: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onCheck: onCheck,
            onClick: _setting.onClick,
            beforeRemove: _setting.beforeRemove,
            onDrop: _setting.onDrop,
            beforeDrop:_setting.beforeDrop
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
     * 新建节点
     * @param event
     * @param treeId  树对象
     * @param treeNode 树节点
     */
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='新增' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_" + treeNode.tId);
        if (btn) btn.bind("click", function () {
            var zTree = $.fn.zTree.getZTreeObj(treeId);
            zTree.addNodes(treeNode, {id: '', pId: treeNode.id, name: "new"});
            return false;
        });
    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_" + treeNode.tId).unbind().remove();
    };
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

};

