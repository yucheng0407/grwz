package net.test.service.main;

import net.test.dao.main.LoginDao;
import net.test.daomain.main.Menu;
import net.test.daomain.main.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/8/12.
 */
@Service
public class LoginService {
    @Autowired
    private LoginDao loginDao;

    public Integer getUser(String user, String pass) {
        return loginDao.getUser(user, pass);
    }

    public  List<Menu> getMenu() {
        return loginDao.getMenu();
    }
}
