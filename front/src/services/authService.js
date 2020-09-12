const TOKEN_KEY = "betaseries_token";

class AuthService {
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }
}

const authService = new AuthService();
Object.freeze(authService);

export { authService };