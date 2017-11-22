package net.test.service.htgl;

import net.test.dao.htgl.IndexDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by rxnew on 2017/9/14.
 */
@Service
public class IndexService {
    @Autowired
    IndexDao indexDao;

    public List getGlMenu() {
        return indexDao.getGlMenu();
    }

    public Integer getMenu(Integer menuType) {
        switch (menuType) {
            case 1: {
                return indexDao.getMenu("0");
            }
            default:
                return null;
        }
    }
}
