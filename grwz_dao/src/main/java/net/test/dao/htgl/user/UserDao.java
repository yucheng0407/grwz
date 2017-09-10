package net.test.dao.htgl.user;

import net.test.dao.BaseDao;
import net.test.daomain.main.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by yucheng on 2017/9/10.
 */
@Repository
public class UserDao  extends BaseDao {
    public List getUserList() {
        StringBuffer sql = new StringBuffer("SELECT * FROM GRWZ_USER T");
        return super.getJdbcTemplate().queryForList(sql.toString());
    }
}
