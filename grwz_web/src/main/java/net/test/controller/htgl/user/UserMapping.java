package net.test.controller.htgl.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/user")
public class UserMapping {
    @RequestMapping("/userList")
    public String userList() {
        return "/htgl/user/userList";
    }
    @RequestMapping("/userEdit")
    public String userEdit() {
        return "/htgl/user/userEdit";
    }
}
