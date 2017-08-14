package net.test.service.mian;

import net.test.dao.main.LoginDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

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
}
