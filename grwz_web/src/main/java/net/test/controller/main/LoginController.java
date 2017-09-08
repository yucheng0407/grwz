package net.test.controller.main;

import data.AjaxReturn;
import net.test.daomain.main.User;
import net.test.intercepter.AuthInterceptor;
import net.test.service.main.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import session.SessionUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/main")
public class LoginController {
    @Autowired
    private LoginService loginService;
    @ResponseBody
    @RequestMapping("/getUser")
    public AjaxReturn getUser(String user, String pass, HttpServletRequest request, HttpServletResponse response) throws Exception {
        User user_1=loginService.getUser(user, pass);
        if (user_1!= null) {
            SessionUtils.initSession();
            request.getSession().setAttribute(AuthInterceptor.USER_SESSION_KEY, user_1);
           return new AjaxReturn().setSuccess(true).setData(user_1);
        } else return new AjaxReturn().setSuccess(false);

    }
    @ResponseBody
    @RequestMapping("/backbone")
    public AjaxReturn backbone(Integer PageNo)  {
        ArrayList list=new ArrayList();
        for (int i=0;i<50;i++) {
            HashMap map=new HashMap();
            map.put("id",i);
            list.add(map);
        }
        return  new AjaxReturn().setSuccess(true).setData(list.subList(8*(PageNo-1),PageNo*8));
    }
    @ResponseBody
    @RequestMapping("/getMenu")
    public AjaxReturn getMenu(HttpSession session)  {
       User user=(User)session.getAttribute(AuthInterceptor.USER_SESSION_KEY);
        return new AjaxReturn().setSuccess(true).setData(loginService.getMenu(user.getId()));
    }
}
