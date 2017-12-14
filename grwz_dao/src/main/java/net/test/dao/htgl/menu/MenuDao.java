package net.test.dao.htgl.menu;

import net.test.dao.BaseDao;
import net.test.daomain.main.Menu;
import net.test.daomain.main.User;
import org.springframework.stereotype.Repository;
import paginate.FastPagination;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/9/10.
 */
@Repository
public class MenuDao extends BaseDao<Menu> {
    public FastPagination getMenuList(Map map) {
        StringBuffer sql = new StringBuffer("SELECT * FROM GRWZ_XTJS T WHERE ZT=1 ORDER BY CJSJ DESC");
        return super.cacheNextTotalPaginationSql(sql,map);
    }

    public void deleteUser(String ids) {
        StringBuffer sql = new StringBuffer("update  GRWZ_USER T set t.zt=0 WHERE t.id in ("+ids+")");
         super.executeSqlUpdate(sql);
    }

    public void dropMenu(Integer tarId, String ids) {
        List list=new ArrayList();
        list.add(tarId);
        list.add(ids);
        StringBuffer sql = new StringBuffer("UPDATE GRWZ_MENU T SET T.SJMENU=?,T.PL=\n" +
                "(SELECT NUM FROM (SELECT ROWNUM NUM,COLUMN_VALUE FROM TABLE(SPLITSTR(?,','))) WHERE T.ID=COLUMN_VALUE) \n" +
                " WHERE  T.ID IN("+ids+")");
        super.executeSqlUpdate(sql,list.toArray());
    }
}
