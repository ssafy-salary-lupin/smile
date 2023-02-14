package cp.smile.auth.oauth2;

import cp.smile.auth.oauth2.provider.OAuth2Provider;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter @Setter
public class CustomOAuth2User implements OAuth2User, UserDetails {

    private int userId;
    private OAuth2Provider provider;
    private String email;
    private String nickname;
    private String profileImagePath;
    private String profileThumbnailImagePath;
    private boolean isDefaultProfileImage;
    private Map<String, Object> attributes;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomOAuth2User(Map<String, Object> attributes, Collection<? extends GrantedAuthority> authorities) {
        this.attributes = attributes;
        this.authorities = authorities;
    }

    public CustomOAuth2User(int userId, String email) {
        this.userId = userId;
        this.email = email;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return email;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
