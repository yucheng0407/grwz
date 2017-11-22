package net.test.controller.htgl.tree;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/tree")
public class TreeMapping {
    @RequestMapping("/openTree")
    public String openTree() {
        return "/htgl/tree/tree";
    }
}
