package cp.smile.auth.jwt;

import cp.smile.auth.oauth2.CustomOAuth2User;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtProvider {

    private final String SECRET_KEY;

    //TODO : 1시간으로 돌려놔야됨.
    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 *24; // 1hour
    public static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 7; // 1week
    private final String CLAIM_USER_ID = "userId";
    private final String CLAIM_USER_EMAIL = "userEmail";
    private final String CLAIM_USER_ROLE = "role";

    public JwtProvider(@Value("${app.auth.jwt.secret-key}") String secretKey) {
        this.SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + ACCESS_TOKEN_VALIDATE_TIME);

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .addClaims(buildUserClaims(oAuth2User, role))
                .setIssuer("issuer")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    private Map<String, Object> buildUserClaims(CustomOAuth2User oAuth2User, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_USER_ID, oAuth2User.getUserId());
        claims.put(CLAIM_USER_EMAIL, oAuth2User.getEmail());
        claims.put(CLAIM_USER_ROLE, role);

        return claims;
    }

    public String createRefreshToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + REFRESH_TOKEN_VALIDATE_TIME);

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setIssuer("smile")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(CLAIM_USER_ROLE).toString().split(","))
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        CustomOAuth2User customOAuth2User = new CustomOAuth2User(
                (Integer) claims.get(CLAIM_USER_ID),
                (String) claims.get(CLAIM_USER_EMAIL)
        );

        return new UsernamePasswordAuthenticationToken(customOAuth2User, "", authorities);
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public boolean validateToken(String token) {
        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
        return true;
    }
}