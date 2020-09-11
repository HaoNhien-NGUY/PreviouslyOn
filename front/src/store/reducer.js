import { ACTIONS } from './actions';

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
            return {
                ...state,
                user: false
            };
        default:
            return state;
    };
};