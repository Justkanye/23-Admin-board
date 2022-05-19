// action - state management
import { LOADING_CLIENTS, LOAD_CLIENTS, LOAD_CLIENTS_ERROR } from './actions';

export const initialState = {
    clients: [],
    isLoading: false,
    hasLoaded: true
};

//-----------------------|| CLIENTS REDUCER ||-----------------------//

const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CLIENTS: {
            return {
                ...state,
                isLoading: true,
                hasLoaded: false
            };
        }
        case LOAD_CLIENTS: {
            const clients = action.payload;
            return {
                ...state,
                clients,
                isLoading: false,
                hasLoaded: true
            };
        }
        case LOAD_CLIENTS_ERROR: {
            return {
                ...state,
                isLoading: false,
                hasLoaded: false
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default clientsReducer;
