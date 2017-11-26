package net.test.service.htgl.tree;

import net.test.dao.htgl.tree.TreeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import resolver.Model;

import java.util.List;
import java.util.Map;


/**
 * Created by rxnew on 2017/9/14.
 */
@Service
public class TreeService {
    @Autowired
    TreeDao treeDao;


    public List getMenu(Integer id,Integer jsId) {
        return treeDao.getMenu(id,jsId);
    }
}
