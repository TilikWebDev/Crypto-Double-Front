import {headerAPI} from '../api/api';
import {updateUserBalance} from './index-reducer';

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    email: null,
    color: null,
    is_auth: false
};

export const setUserData = (email, color) => {
    return {
        type: SET_USER_DATA,
        data: {email, color}
    }
}

export const getUserData = () => {
    return (dispatch) => {
        headerAPI.authMe().then(data => {
            if (!data.error) {
                let {email, balance, color} = data.data;

                dispatch(setUserData(email, color ));
                dispatch(updateUserBalance(balance));
            }
        });
    }
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return  {
                ...state,
                ...action.data,
                is_auth: true
            };

        default: 
            return state;
    }
}

export default authReducer;