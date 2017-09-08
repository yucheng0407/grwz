package net.test.controller.htgl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/htgl")
public class indexMapping {
    @RequestMapping("/index")
    public String index() {
        return "/htgl/index";
    }
}
