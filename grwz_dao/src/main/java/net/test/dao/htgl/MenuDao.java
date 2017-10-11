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
        StringBuffer sql=new StringBuffer("select t.*,decode(t.mc,'角色管理',(select count(1) from GRWZ_USER where type=0))" +
                " TS from grwz_menu t where type=3");
        return super.getJdbcTemplate().queryForList(sql.toString());
    }

    public Integer getMenu(String type) {
        StringBuffer sql=new StringBuffer("select count(1) from GRWZ_USER where type=?");
        return super.getJdbcTemplate().queryForObject(sql.toString(),Integer.class,type);
    }
}
