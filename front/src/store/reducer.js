import { ACTIONS } from './actions';
import { authService } from '../services/authService';

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            const { login, access_token } = action.payload;
            return {
                ...state,
                user: {
                    login
                },
                access_token
            };
        case ACTIONS.LOGOUT:
            authService.logout();
            return {
                ...state,
                user: false,
                access_token: null
            };
        default:
            return state;
    };
};