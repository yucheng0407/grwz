package net.test.daomain.main;

import net.test.daomain.BaseDomain;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Where;
import javax.persistence.*;
import java.util.Date;
import java.util.List;
/**
 * Created by rxnew on 2017/8/16.
 * 用户实体
 */
@Table(name = "GRWZ_USER")
@Entity
public class User {
    @Id
    @SequenceGenerator(name = "SEQ_GRWZ_USER", sequenceName = "SEQ_GRWZ_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_GRWZ_USER")
    private Integer id;

    /**
     * 用户账号
     */
    @Column(name = "YHZH")
    private String yhzh;
    /**
     *用户密码
     */
    @Column(name = "MM")
    private String mm;
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
     *用户名称
     */
    @Column(name = "YHMC")
    private String yhmc;

    /**
     *用户等级
     */
    @Column(name = "TYPE")
    private String type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getYhzh() {
        return yhzh;
    }

    public void setYhzh(String yhzh) {
        this.yhzh = yhzh;
    }

    public String getMm() {
        return mm;
    }

    public void setMm(String mm) {
        this.mm = mm;
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

    public String getYhmc() {
        return yhmc;
    }

    public void setYhmc(String yhmc) {
        this.yhmc = yhmc;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
