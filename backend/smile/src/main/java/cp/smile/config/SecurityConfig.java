package cp.smile.config;

import cp.smile.auth.jwt.JwtAccessDeniedHandler;
import cp.smile.auth.jwt.JwtAuthenticationEntryPoint;
import cp.smile.auth.jwt.JwtAuthenticationFilter;
import cp.smile.auth.oauth2.CustomOAuth2UserService;
import cp.smile.auth.oauth2.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.authorizeHttpRequests()
                .antMatchers(HttpMethod.POST, "/log-in", "/users").permitAll()
                .antMatchers(HttpMethod.GET, "/studies", "/**/types",
                        "/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-resources/**",
                        "/swagger-ui.html",
                        "/webjars/**").permitAll()
                .antMatchers(HttpMethod.GET,"/ws-stomp").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);

        // jwt 사용을 위해 session 해제
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // jwt 필터 추가
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // 인증 handler 등록
        http.exceptionHandling()
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .authenticationEntryPoint(jwtAuthenticationEntryPoint);

        // 비밀번호 암호화
        http.cors().disable()			//cors 방지
                .formLogin().disable()		//기본 로그인페이지 없애기
                .headers().frameOptions().disable();

        return http.build();
    }
}
