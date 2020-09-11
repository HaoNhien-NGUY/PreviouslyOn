import { network } from './network';

class AuthService {
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