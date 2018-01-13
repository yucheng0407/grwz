package net.test.controller.htgl.icon;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/icon")
public class IconMapping {
    @RequestMapping("/iconList")
    public String userList() {
        return "/main/icon/iconList";
    }

}
