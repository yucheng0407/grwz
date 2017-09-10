package net.test.controller.htgl;

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

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/htgl")
public class IndexController {

}
