package net.test.controller.htgl;

import data.AjaxReturn;
import net.test.service.htgl.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/htgl")
public class IndexController {
    @Autowired
    IndexService indexService;
    @ResponseBody
    @RequestMapping("/getGlMenu")
    public AjaxReturn getGlMenu()  {
        return new AjaxReturn().setSuccess(true).setData(indexService.getGlMenu());
    }
    @ResponseBody
    @RequestMapping("/getMenu")
    public AjaxReturn getMenu(Integer menuType)  {
        return new AjaxReturn().setSuccess(true).setData(indexService.getMenu(menuType));
    }
}
