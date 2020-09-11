import { network } from './network';

class AuthService {
    login(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}


const authService = new AuthService();
Object.freeze(authService);

export { authService };