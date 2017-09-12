package net.test.service.htgl.user;

import net.test.dao.htgl.user.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/9/10.
 */
@Service
public class UserService {
    @Autowired
    UserDao userDao;
    public FastPagination getUserList(Map map) {
        return userDao.getUserList(map);
    }
}
