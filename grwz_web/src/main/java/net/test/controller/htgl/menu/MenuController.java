package net.test.controller.htgl.menu;

import data.AjaxReturn;
import net.test.daomain.main.User;
import net.test.service.htgl.menu.MenuService;
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
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    /**
     * 用户列表
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getMenuList")
    public AjaxReturn getMenuList(@Model Object map) {
        return new AjaxReturn().setSuccess(true).setData(menuService.getMenuList((Map) map));
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
        menuService.saveUser(user);
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
        menuService.deleteUser(ids);
        return new AjaxReturn().setSuccess(true);
    }

    /**
     * 获取菜单实体
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/getMenu")
    public AjaxReturn getMenu(Integer id) {
        return new AjaxReturn().setSuccess(true).setData(menuService.getMenu(id));
    }
}
