package net.test.dao.main;

import net.test.dao.BaseDao;
import net.test.daomain.main.Menu;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/8/12.
 */
@Repository
public class LoginDao extends BaseDao {
    public Integer getUser(String user, String pass) {
        StringBuffer sql = new StringBuffer("select count(1) \"sum\" from grwz_user where yhzh=? and mm=?");
        return Integer.valueOf(super.getJdbcTemplate().queryForMap(sql.toString(),user,pass).get("sum").toString());
    }

    public  List<Menu> getMenu() {
        StringBuffer hql = new StringBuffer("from Menu where sjMenu=0 and id in(select l.menuId from User r,YhCdgl l where r.id=l.userId )");
        return  super.findListByHql(hql);
    }
}
