package net.test.controller.htgl.tree;


import net.test.service.htgl.tree.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/tree")
public class TreeController {
    @Autowired
    TreeService treeService;
    @ResponseBody
    @RequestMapping("/getMenuTree")
    public List getMenuTree(Integer id,Integer jsId)  {
        return treeService.getMenuTree(id,jsId);
    }
}
