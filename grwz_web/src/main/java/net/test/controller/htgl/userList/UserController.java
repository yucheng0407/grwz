package net.test.controller.htgl.userList;

import data.AjaxReturn;
import net.test.daomain.main.User;
import net.test.service.htgl.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import resolver.Model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 用户列表
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getUserList")
    public AjaxReturn getUserList(@Model Object map) {
        return new AjaxReturn().setSuccess(true).setData(userService.getUserList((Map) map));
    }

    /**
     * 保存用户
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("/saveUser")
    public AjaxReturn saveUser(@Model User user) {
        userService.saveUser(user);
        return new AjaxReturn().setSuccess(true);
    }

    /**
     * 删除用户
     *
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping("/deleteUser")
    public AjaxReturn deleteUser(String ids) {
        userService.deleteUser(ids);
        return new AjaxReturn().setSuccess(true);
    }


}
