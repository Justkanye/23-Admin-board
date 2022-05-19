// action - state management
import { LOADING_PRODUCTS, LOAD_PRODUCTS, LOAD_PRODUCTS_ERROR } from './actions';

export const initialState = {
    products: [],
    isLoading: false,
    hasLoaded: true
};

//-----------------------|| PRODUCTS REDUCER ||-----------------------//

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PRODUCTS: {
            return {
                ...state,
                isLoading: true,
                hasLoaded: false
            };
        }
        case LOAD_PRODUCTS: {
            const products = action.payload;
            return {
                ...state,
                products,
                isLoading: false,
                hasLoaded: true
            };
        }
        case LOAD_PRODUCTS_ERROR: {
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

export default productsReducer;
