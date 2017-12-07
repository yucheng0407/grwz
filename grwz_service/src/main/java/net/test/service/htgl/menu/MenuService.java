package net.test.service.htgl.menu;

import net.test.dao.htgl.menu.MenuDao;
import net.test.dao.htgl.user.UserDao;
import net.test.daomain.main.Menu;
import net.test.daomain.main.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import paginate.FastPagination;

import java.util.Map;

/**
 * Created by yucheng on 2017/9/10.
 */
@Service
public class MenuService {
    @Autowired
    private MenuDao menuDao;

    public FastPagination getMenuList(Map map) {
        return menuDao.getMenuList(map);
    }

    @Transactional
    public void saveUser(User user) {

    }
    @Transactional
    public void deleteUser(String ids) {
        menuDao.deleteUser(ids);
    }

    public Menu getMenu(Integer id) {
      return menuDao.get(id);
    }
}
