package resolver;

import java.lang.annotation.*;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface FormModel {
    /**
     * 用于绑定的请求参数名字
     */
    String value() default "";

    /**
     * 是否必须，Model
     */
    boolean required() default true;
}
