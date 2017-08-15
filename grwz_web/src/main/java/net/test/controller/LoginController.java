package net.test.controller;

import data.AjaxReturn;
import net.test.intercepter.AuthInterceptor;
import net.test.service.mian.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import session.SessionUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/main")
public class LoginController {
    @Autowired
    private LoginService loginService;
    @RequestMapping("/getUser")
    public void getUser(String user, String pass, HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (loginService.getUser(user, pass) == 1) {
            SessionUtils.initSession();
            request.getSession().setAttribute(AuthInterceptor.USER_SESSION_KEY, user);
            response.sendRedirect(request.getContextPath() + "/main/index");
        } else  response.sendRedirect(request.getContextPath() + "/main/login");

    }
    @ResponseBody
    @RequestMapping("/backbone")
    public String backbone(String website)  {
        return "sdas";
    }
}
