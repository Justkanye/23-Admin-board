// action - state management
import { LOADING_TEAM, LOAD_TEAM, LOAD_TEAM_ERROR } from './actions';

export const initialState = {
    teamMembers: [],
    isLoading: false,
    hasLoaded: true
};

//-----------------------|| TEAM REDUCER ||-----------------------//

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_TEAM: {
            return {
                ...state,
                isLoading: true,
                hasLoaded: false
            };
        }
        case LOAD_TEAM: {
            const teamMembers = action.payload;
            return {
                ...state,
                teamMembers,
                isLoading: false
            };
        }
        case LOAD_TEAM_ERROR: {
            return {
                ...state,
                isLoading: true
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default teamReducer;
