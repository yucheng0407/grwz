package util;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.apache.poi.ss.formula.functions.T;

import java.beans.PropertyDescriptor;

/**
 * Created by rxnew on 2017/11/13.
 */
public class Common {
    public void entity(Class<T> object, Object Object_1){
//        PropertyUtilsBean propertyUtilsBean = new PropertyUtilsBean();//遍历
//        PropertyDescriptor[] descriptors = propertyUtilsBean.getPropertyDescriptors(object);
//        for (int i = 0, len = descriptors.length; i < len; i++) {
//            String name = descriptors[i].getName();
//            if (!"class".equals(name)) {
//                Object object = propertyUtilsBean.getNestedProperty(object, name);
//                 propertyUtilsBean.setProperty(xqyh, name, object);
//            }
//        }
    }

    /**
     * 实体复制
     */
    private void copyEntity(Object entity, Object entity1) {
        try {
            PropertyUtilsBean propertyUtilsBean = new PropertyUtilsBean();//遍历实体
            PropertyDescriptor[] descriptors = propertyUtilsBean.getPropertyDescriptors(entity);
            for (int i = 0, len = descriptors.length; i < len; i++) {
                String name = descriptors[i].getName();
                if (!"class".equals(name)) {
                    Object object = propertyUtilsBean.getNestedProperty(entity, name);
                    if (object==null) continue;
                    BeanUtils.setProperty(entity1, name, object);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
