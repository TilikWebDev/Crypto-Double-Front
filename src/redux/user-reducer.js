const SET_USER_DATA = 'SET_USER_DATA';
const UPDATE_USER_BALANCE = 'UPDATE_USER_BALANCE';

let initialState = {
    user_balance: 0,
    email: '',
    color: ''
};

export const setUserData = (user_balance = 0, email, color) => {
    return {
        type: SET_USER_DATA,
        user_balance,
        email,
        color
    }
}

export const updateUserBalance = (value, action) => {
    return {
        type: UPDATE_USER_BALANCE,
        value,
        action
    }
}

const userReducer = (state = initialState, {type, value, action, user_balance, email, color}) => {
    switch (type) {
        case UPDATE_USER_BALANCE:
            return {
                ...state,
                user_balance: (action) ? 
                    (action === '+') ? 
                        state.user_balance + value 
                        : 
                        state.user_balance - value 
                    : 
                    value
            };

        case SET_USER_DATA:
            return  {
                ...state,
                user_balance: user_balance,
                email: email,
                color: color
            };
    
        default:
            return state;
    }
}

export default userReducer;