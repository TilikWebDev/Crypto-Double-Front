import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleWare from 'redux-thunk';

import notificationsReducer from './notifications-reducer';
import userReducer from './user-reducer';
import indexReducer from './index-reducer';
import provablyFairReducer from './provably-fair-reducer';
import modalWindowReducer from './modal-window-reducer';
import betsReducer from './bets-reducer';
import authReducer from './auth-reducer';

let reducers = combineReducers({
    user: userReducer,
    index_page: indexReducer,
    notifications: notificationsReducer,
    provably_fair: provablyFairReducer,
    modal_window: modalWindowReducer,
    bets: betsReducer,
    auth: authReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;