package cp.smile.auth.oauth2.exception;

public class UnsupportedOAuthProviderException extends RuntimeException {

    public UnsupportedOAuthProviderException() {
    }

    public UnsupportedOAuthProviderException(String message) {
        super(message);
    }

    public UnsupportedOAuthProviderException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnsupportedOAuthProviderException(Throwable cause) {
        super(cause);
    }

    public UnsupportedOAuthProviderException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
