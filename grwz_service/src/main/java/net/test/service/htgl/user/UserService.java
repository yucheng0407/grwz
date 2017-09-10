package net.test.service.htgl.user;

import net.test.dao.htgl.user.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yucheng on 2017/9/10.
 */
@Service
public class UserService {
    @Autowired
    UserDao userDao;
    public List getUserList() {
        return userDao.getUserList();
    }
}
