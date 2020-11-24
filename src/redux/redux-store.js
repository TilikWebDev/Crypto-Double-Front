import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleWare from 'redux-thunk';

import casesReducer from './cases-reducer';
import notificationsReducer from './notifications-reducer';
import userReducer from './user-reducer';
import indexReducer from './index-reducer';
import doubleReducer from './double-reducer';
import provablyFairReducer from './provably-fair-reducer';
import modalWindowReducer from './modal-window-reducer';
import authReducer from './auth-reducer';

let reducers = combineReducers({
    cases: casesReducer,
    user: userReducer,
    index_page: indexReducer,
    double_page: doubleReducer,
    notifications: notificationsReducer,
    provably_fair: provablyFairReducer,
    modal_window: modalWindowReducer,
    auth: authReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;