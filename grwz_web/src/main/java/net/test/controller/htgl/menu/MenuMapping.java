package net.test.controller.htgl.menu;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/menu")
public class MenuMapping {
    @RequestMapping("/menuList")
    public String userList() {
        return "/htgl/menu/menuList";
    }
    @RequestMapping("/menuEdit")
    public String userEdit() {
        return "/htgl/menu/menuEdit";
    }
}
