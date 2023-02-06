package cp.smile.auth.service;

public interface AuthService {

    String reissueAccessToken(String oldAccessToken, String refreshToken);
}
