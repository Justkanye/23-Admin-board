// action - state management
import { SIGNUP } from './actions';

export const initialState = {
    users: []
};

//-----------------------|| USER REDUCER ||-----------------------//

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP: {
            const { user } = action.payload;
            return {
                ...state,
                users: [...state.users, user]
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default usersReducer;
