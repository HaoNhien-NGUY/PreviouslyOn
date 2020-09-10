import { ACTIONS } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            const { username, email, access_token } = action.payload;
            return {
                ...state,
                user: {
                    username,
                    email
                },
                access_token
            };
        case ACTIONS.LOGOUT:
            return {
                user: false
            };
        default:
            return state;
    };
};