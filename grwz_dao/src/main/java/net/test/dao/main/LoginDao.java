package net.test.dao.main;

import net.test.dao.BaseDao;
import net.test.daomain.main.Menu;
import net.test.daomain.main.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/8/12.
 */
@Repository
public class LoginDao extends BaseDao {
    public User getUser(String user, String pass) {
        StringBuffer hql = new StringBuffer("from User where yhzh=? and mm=?");
        return (User)findByHql(hql,user,pass);
    }

    public  List<Menu> getMenus(Integer userId) {
        StringBuffer hql = new StringBuffer("from Menu where zt=1 and type<>3 and sjMenu=1 and id in" +
                "(select l.menuId from User r,YhCdgl l where r.id=l.userId and r.id=?) order by pl");
        return  super.findListByHql(hql,userId);
    }
}
