package cp.smile.auth.oauth2;

import cp.smile.auth.oauth2.provider.OAuth2Provider;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;

@Component
public class CustomOAuth2UserFactory {

    public CustomOAuth2User create(String provider, OAuth2User oAuth2User) {
        Collection<? extends GrantedAuthority> authorities =
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));

        if (provider.equals(OAuth2Provider.kakao.name())) {
            return new KakaoOAuth2User(oAuth2User.getAttributes(), authorities);
        }

        return null;
    }
}
