import { ACTIONS } from './actions';
import { authService } from '../services/authService';

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            const { login, access_token } = action.payload;
            authService.setToken(access_token);

            return {
                ...state,
                user: {
                    login,
                },
                access_token,
                user_loading: false,
            };
        case ACTIONS.LOGOUT:
            authService.removeToken();

            return {
                ...state,
                user: false,
                access_token: null,
            };
        case ACTIONS.USER_LOADING:
            return {
                ...state,
                user_loading: true,
            }
        case ACTIONS.USER_LOADING_DONE:
            return {
                ...state,
                user_loading: false,
            }
        default:
            return state;
    };
};