package net.test.controller.htgl.userList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/user")
public class UserMapping {
    @RequestMapping("/userList")
    public String index() {
        return "/htgl/user/userList";
    }
}
