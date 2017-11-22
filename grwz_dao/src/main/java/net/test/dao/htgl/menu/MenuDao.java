package net.test.dao.htgl.menu;

import net.test.dao.BaseDao;
import net.test.daomain.main.User;
import org.springframework.stereotype.Repository;
import paginate.FastPagination;

import java.util.Map;

/**
 * Created by yucheng on 2017/9/10.
 */
@Repository
public class MenuDao extends BaseDao<User> {
    public FastPagination getMenuList(Map map) {
        StringBuffer sql = new StringBuffer("SELECT * FROM GRWZ_XTJS T WHERE ZT=1 ORDER BY CJSJ DESC");
        return super.cacheNextTotalPaginationSql(sql,map);
    }

    public void deleteUser(String ids) {
        StringBuffer sql = new StringBuffer("update  GRWZ_USER T set t.zt=0 WHERE t.id in ("+ids+")");
         super.executeSqlUpdate(sql);
    }
}
