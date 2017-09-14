package net.test.dao.htgl;

import net.test.dao.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by rxnew on 2017/9/14.
 */
@Repository
public class MenuDao extends BaseDao {
    public List getGlMenu() {
        StringBuffer sql=new StringBuffer("select * from grwz_menu t where type=3");
        return super.getJdbcTemplate().queryForList(sql.toString());
    }
}
