import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import usersReducer from './usersReducer';
import productsReducer from './productsReducer';
import clientsReducer from './clientsReducer';
import teamReducer from './teamReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'datta-'
        },
        accountReducer
    ),
    form: formReducer,
    users: usersReducer,
    products: productsReducer,
    clients: clientsReducer,
    team: teamReducer
});

export default reducers;
