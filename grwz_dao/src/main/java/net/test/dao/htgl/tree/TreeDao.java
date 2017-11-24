package net.test.dao.htgl.tree;

import net.test.dao.BaseDao;
import net.test.daomain.main.User;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by yucheng on 2017/9/10.
 */
@Repository
public class TreeDao extends BaseDao<User> {

    public List getMenu(Integer id) {
        List a = new ArrayList();
        StringBuffer sql;
        if (id == null) {//最顶级
            id = new Integer(0);
            sql = new StringBuffer("SELECT U.ID \"id\",U.MC \"name\",U.SJMENU \"pid\" ," +
                    "DECODE((SELECT COUNT(1) FROM GRWZ_MENU WHERE SJMENU=U.ID AND TYPE<>3 ),0,'FALSE','TRUE') \"isParent\" FROM GRWZ_MENU U WHERE ID=?");
        } else {
            sql = new StringBuffer("SELECT  U.ID \"id\",U.MC \"name\",U.SJMENU \"pid\" ," +
                    "DECODE((SELECT COUNT(1) FROM GRWZ_MENU WHERE SJMENU=U.ID AND TYPE<>3 ),0,'FALSE','TRUE') \"isParent\" FROM GRWZ_MENU U WHERE SJMENU=? AND TYPE<>3 ");
        }
        a.add(id);
        return getJdbcTemplate().queryForList(sql.toString(), a.toArray());
    }
}
