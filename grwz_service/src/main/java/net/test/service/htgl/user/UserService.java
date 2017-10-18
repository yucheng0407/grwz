package net.test.service.htgl.user;

import net.test.dao.htgl.user.UserDao;
import net.test.daomain.main.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/9/10.
 */
@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public FastPagination getUserList(Map map) {
        return userDao.getUserList(map);
    }

    @Transactional
    public void saveUser(User user) {
        userDao.saveOrUpdate(user);
    }
    @Transactional
    public void deleteUser(String ids) {
        userDao.deleteUser(ids);
    }
}
