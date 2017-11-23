package net.test.dao.htgl.tree;

import net.test.dao.BaseDao;
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
public class TreeDao extends BaseDao<User> {

    public List getMenu(Integer id) {
        List a=new ArrayList();
        if(id==null){id=new Integer(0);}
        a.add(id);
        StringBuffer sql=new StringBuffer("SELECT  U.ID \"id\",U.MC \"name\",U.SJMENU \"pid\" ," +
                "DECODE((SELECT COUNT(1) FROM GRWZ_MENU WHERE SJMENU=U.ID AND TYPE<>3 ),0,'FALSE','TRUE') \"isParent\" FROM GRWZ_MENU U WHERE SJMENU=? AND TYPE<>3 ");
        return getJdbcTemplate().queryForList(sql.toString(),a.toArray());
    }
}
