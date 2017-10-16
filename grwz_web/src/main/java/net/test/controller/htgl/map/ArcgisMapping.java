package net.test.controller.htgl.map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by yucheng on 2017/8/12.
 */
@Controller
@RequestMapping("/map")
public class ArcgisMapping {
    @RequestMapping("/arcgis")
    public String arcgis() {
        return "/htgl/map/arcgis";
    }
}
