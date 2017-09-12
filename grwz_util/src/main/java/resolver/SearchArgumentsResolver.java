package resolver;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import json.JacksonMapper;
import json.JacksonUtil;
import net.test.daomain.BaseDomain;
import org.springframework.beans.BeanUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.HashMap;
import java.util.Map;

public class SearchArgumentsResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.hasParameterAnnotation(SearchModel.class);
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        Object o = BeanUtils.instantiate(methodParameter.getParameterType());
        String jsonStr = nativeWebRequest.getParameter("map");
        ObjectMapper mapper = JacksonMapper.getInstance();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        Object domain = mapper.readValue(jsonStr, o.getClass());
        if (domain != null && !(domain instanceof HashMap))
            ((BaseDomain) domain).setInteractionFields(JacksonUtil.getJsonNode(jsonStr));
        return domain;
    }
}
