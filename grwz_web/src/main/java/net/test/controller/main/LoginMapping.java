package net.test.controller.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/main")
public class LoginMapping {

 @RequestMapping("/login")
    public String login() {
        return "main/login";
    }
    @RequestMapping("/header")
    public String header() {
        return "main/header";
    }
    @RequestMapping("/index")
    public String index() {
        return "main/index";
    }
}
