package cp.smile.auth.oauth2;

import cp.smile.auth.oauth2.provider.OAuth2Provider;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Map;

public class KakaoOAuth2User extends CustomOAuth2User{

    private Map<String, Object> account;
    private Map<String, Object> profile;

    public KakaoOAuth2User(Map<String, Object> attributes, Collection<? extends GrantedAuthority> authorities) {
        super(attributes, authorities);
        this.account = (Map<String, Object>) attributes.get("kakao_account");
        this.profile = (Map<String, Object>) account.get("profile");

        super.setEmail((String) account.get("email"));
        super.setNickname((String) profile.get("nickname"));
        super.setProfileImagePath((String) profile.get("profile_image_url"));
        super.setProfileThumbnailImagePath((String) profile.get("thumbnail_image_url"));
        super.setProvider(OAuth2Provider.kakao);
    }
}
