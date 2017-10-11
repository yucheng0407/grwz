package net.test.service.htgl;

import net.test.dao.htgl.MenuDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by rxnew on 2017/9/14.
 */
@Service
public class MenuService {
    @Autowired
    MenuDao menuDao;

    public List getGlMenu() {
        return menuDao.getGlMenu();
    }

    public Integer getMenu(String menuType) {
        switch (menuType) {
            case "阿达的": {
                return menuDao.getMenu("0");
            }
            default:
                return null;
        }
    }
}
