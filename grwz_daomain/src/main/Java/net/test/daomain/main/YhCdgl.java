package net.test.daomain.main;

import javax.persistence.*;

/**
 * Created by yucheng on 2017/8/16.
 */
@Table(name = "GRWZ_USER_MENU_GL")
@Entity
public class YhCdgl {
    @Id
    @SequenceGenerator(name = "SEQ_GRWZ_USER_MENU_GL", sequenceName = "SEQ_GRWZ_USER_MENU_GL", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_GRWZ_USER_MENU_GL")
    private Integer id;
    @Column(name = "USERID")
    private Integer userId;
    @Column(name = "MENUID")
    private Integer menuId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }
}
