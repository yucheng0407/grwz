package net.test.controller.htgl.userList;

import data.AjaxReturn;
import net.test.daomain.main.User;
import net.test.service.htgl.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import resolver.Model;

import java.util.Map;


/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @ResponseBody
    @RequestMapping("/getUserList")
    public AjaxReturn getUserList(@Model Object map) {
        return new AjaxReturn().setSuccess(true).setData(userService.getUserList((Map)map));
    }
    @ResponseBody
    @RequestMapping("/saveUser")
    public AjaxReturn saveUser(@Model User user) {
        userService.saveUser(user);
        return new AjaxReturn().setSuccess(true);
    }



}
