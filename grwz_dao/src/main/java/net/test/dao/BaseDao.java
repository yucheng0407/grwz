package net.test.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import oracle.jdbc.OracleTypes;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.jdbc.ReturningWork;
import org.hibernate.jdbc.Work;
import org.hibernate.transform.Transformers;
import org.springframework.beans.BeansException;
import org.springframework.beans.FatalBeanException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.sql.*;
import java.util.*;

/**
 * 基础DAO实现
 */
@SuppressWarnings({"unchecked", "WeakerAccess", "SqlDialectInspection", "SqlNoDataSourceInspection"})
@Component
public class BaseDao<T>  {

    private Class<T> entityClazz;

    private final Class<T> sourceClazz;

    @Resource
    protected SessionFactory sessionFactory;

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Resource
    private NamedParameterJdbcTemplate npJdbcTemplate;

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    @SuppressWarnings("unused")
    public NamedParameterJdbcTemplate getNpJdbcTemplate() {
        return npJdbcTemplate;
    }

    public Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    private Query setParameter(Query query, Map<String, ?> parameterMap) {
        for (Map.Entry<String, ?> entry : parameterMap.entrySet()) {
            Object o = entry.getValue();
            try {
                if (Number.class.isAssignableFrom(entry.getValue().getClass())) {
                    Class vc = entry.getValue().getClass();
                    Class key = entityClazz.getDeclaredField(entry.getKey()).getType();
                    if (vc != key) {
                        Method m = key.getMethod("valueOf", String.class);
                        o = m.invoke(null, entry.getValue().toString());
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            query.setParameter(entry.getKey(), o);
        }
        return query;
    }

    public BaseDao() {
        Type type = getClass().getGenericSuperclass();
        if (type instanceof ParameterizedType) {
            this.entityClazz = (Class<T>) ((ParameterizedType) type).getActualTypeArguments()[0];
            sourceClazz = entityClazz;
        } else {
            this.entityClazz = null;
            sourceClazz = null;
        }
    }

    //------------------------------------------------------------------------------------------接口实现

   
    public void saveOrUpdate(T entity) throws BeansException {
        Class<T> tClass = this.entityClazz;
        getSession().saveOrUpdate(entity);
    }



   
    public T get(Serializable id) {
        if (id == null || entityClazz == null)
            return null;
        return (T) getSession().get(entityClazz, id);
    }

   
    @Deprecated
    public T getBySql(CharSequence sql, Object... params) {
        SQLQuery sqlQuery = getSession().createSQLQuery(sql.toString());
        for (int i = 0; i < params.length; ++i) {
            sqlQuery.setParameter(i, params[i]);
        }
        List list = sqlQuery.setResultTransformer(Transformers.aliasToBean(entityClazz)).list();
//        List list = sqlQuery.addEntity(entityClazz).list();
        if (list.isEmpty())
            return null;
        return (T) list.get(0);
    }

   
    @Deprecated
    public T getBySql(CharSequence sql, Map<String, ?> params) {
        SQLQuery sqlQuery = getSession().createSQLQuery(sql.toString());
        setParameter(sqlQuery, params);
        List list = sqlQuery.setResultTransformer(Transformers.aliasToBean(entityClazz)).list();
//        List list = sqlQuery.addEntity(entityClazz).list();
        if (list.isEmpty())
            return null;
        return (T) list.get(0);
    }

    public List<T> findListByHql(CharSequence queryString, Object... params) {
        Query query = getSession().createQuery(queryString.toString());
        for (int i = 0; i < params.length; ++i) {
            query.setParameter(i, params[i]);
        }
        return query.list();
    }

   
    public List<T> findListByHql(CharSequence queryString, Map<String, ?> params) {
//        if(params.get("HqlName")!=null){
//            params.remove("HqlName");
//        }
        Query query = getSession().createQuery(queryString.toString());
        setParameter(query, params);
        return query.list();
    }


    public List<T> findByProperty(String name, Object value) {
        String hql = "from " + entityClazz.getSimpleName() + " where " + name + " = ? ";
        return findListByHql(hql, value);
    }

   
    public List<T> findByProperty(Map<String, ?> conditionMap) {
        StringBuilder hql = new StringBuilder();
        hql.append("from  ").append(entityClazz.getSimpleName());
        if (!conditionMap.isEmpty()) {
            Iterator<String> it = conditionMap.keySet().iterator();
            String key = it.next();
            hql.append(" where  ").append(key).append("=:").append(key);
            while (it.hasNext()) {
                key = it.next();
                hql.append(" and  ").append(key).append("=:").append(key);
            }
        }
        return findListByHql(hql.toString(), conditionMap);
    }

   
    public int executeSqlUpdate(CharSequence sql, Object... args) {
        SQLQuery queryObject = this.getSession().createSQLQuery(sql.toString());
        for (int i = 0; i < args.length; ++i) {
            queryObject.setParameter(i, args[i]);
        }
        return queryObject.executeUpdate();
    }

   
    public int executeHqlUpdate(CharSequence hql, Object... args) {
        Query queryObject = getSession().createQuery(hql.toString());
        for (int i = 0; i < args.length; ++i) {
            queryObject.setParameter(i, args[i]);
        }
        return queryObject.executeUpdate();
    }
    }
