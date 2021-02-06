import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleWare from 'redux-thunk';

import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import userReducer from './user-reducer';

import casesReducer from './cases-reducer';
import doubleReducer from './double-reducer';
import provablyFairReducer from './provably-fair-reducer';

import notificationsReducer from './notifications-reducer';
import modalWindowReducer from './modal-window-reducer';

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,

    cases: casesReducer,
    double_page: doubleReducer,
    provably_fair: provablyFairReducer,

    notifications: notificationsReducer,
    modal_window: modalWindowReducer    
});


let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;