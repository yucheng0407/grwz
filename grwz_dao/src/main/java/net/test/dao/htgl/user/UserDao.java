package net.test.dao.htgl.user;

import net.test.dao.BaseDao;
import org.springframework.stereotype.Repository;
import paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2017/9/10.
 */
@Repository
public class UserDao extends BaseDao {
    public FastPagination getUserList(Map map) {
        StringBuffer sql = new StringBuffer("SELECT * FROM GRWZ_USER T WHERE ID<100 ORDER BY ID");
        return super.cacheNextTotalPaginationSql(sql.toString(),map);
    }
}
