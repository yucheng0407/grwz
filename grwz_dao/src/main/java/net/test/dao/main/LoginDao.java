package net.test.dao.main;

import net.test.dao.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by yucheng on 2017/8/12.
 */
@Repository
public class LoginDao extends BaseDao {
    public Integer getUser(String user, String pass) {
        StringBuffer sql = new StringBuffer("select count(1) \"sum\" from grwz_user where yhzh=? and mm=?");
        return Integer.valueOf(super.getJdbcTemplate().queryForMap(sql.toString(),user,pass).get("sum").toString());
    }
}
