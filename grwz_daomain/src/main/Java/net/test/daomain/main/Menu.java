package net.test.daomain.main;

import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by yucheng on 2017/8/16.
 * 菜单实体
 */
@Table(name = "GRWZ_MENU")
@Entity
public class Menu {
    @Id
    @SequenceGenerator(name = "SEQ_GRWZ_USER", sequenceName = "SEQ_GRWZ_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_GRWZ_USER")
    private Integer id;

    /**
     * 名称
     */
    @Column(name = "MC")
    private String mc;
    /**
     * 上级菜单ID
     */
    @Column(name = "SJMENU")
    private Integer sjMenu;
    /**
     *网站
     */
    @Column(name = "URL")
    private String url;
    /**
     *状态
     */
    @Column(name = "ZT")
    private String zt;
    /**
     *用户时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;
    /**
     *状态
     */
    @Column(name = "TYPE")
    private String type;
    /**
     *排列
     */
    @Column(name = "PL")
    private Integer pl;
    /**
     *下拉菜单list
     */
    @OneToMany(targetEntity = Menu.class, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "SJMENU", referencedColumnName = "ID"))
    @Where(clause = "ZT='1' AND ID IN(SELECT L.MENUID FROM GRWZ_USER R,GRWZ_USER_MENU_GL L WHERE R.ID=L.USERID )")
    @OrderBy("PL")
    private List<Menu> menu;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMc() {
        return mc;
    }

    public void setMc(String mc) {
        this.mc = mc;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getZt() {
        return zt;
    }

    public void setZt(String zt) {
        this.zt = zt;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Menu> getMenu() {
        return menu;
    }

    public void setMenu(List<Menu> menu) {
        this.menu = menu;
    }

    public Integer getSjMenu() {
        return sjMenu;
    }

    public void setSjMenu(Integer sjMenu) {
        this.sjMenu = sjMenu;
    }

    public Integer getPl() {
        return pl;
    }

    public void setPl(Integer pl) {
        this.pl = pl;
    }
}
