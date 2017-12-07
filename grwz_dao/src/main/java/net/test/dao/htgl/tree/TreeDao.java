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

    public List getMenuTree(Integer id, Integer jsId) {
        List a = new ArrayList();
        StringBuffer sql;
        if (id == null) {//最顶级
            id = new Integer(0);
        }
        sql = new StringBuffer("SELECT  DECODE((SELECT COUNT(1) FROM GRWZ_USER_MENU_GL L WHERE L.USERID=? AND L.MENUID=U.ID ),0,'FALSE','TRUE') \"checked\",U.ID \"id\",U.MC \"name\",U.SJMENU \"pid\" ," +
                "DECODE((SELECT COUNT(1) FROM GRWZ_MENU WHERE SJMENU=U.ID AND TYPE<>3 ),0,'FALSE','TRUE') \"isParent\" FROM GRWZ_MENU U WHERE SJMENU=? AND TYPE<>3 ");
        a.add(jsId);
        a.add(id);
        return getJdbcTemplate().queryForList(sql.toString(), a.toArray());
    }
}
