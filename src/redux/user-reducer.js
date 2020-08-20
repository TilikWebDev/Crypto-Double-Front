const UPDATE_USER_BALANCE = 'UPDATE_USER_BALANCE';

let initialState = {
    user_balance: 0
};

export const updateUserBalance = (value, action) => {
    return {
        type: UPDATE_USER_BALANCE,
        value: value,
        action: action
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_BALANCE:
            let new_value = action.value;

            if (action.action) {
                new_value = (action.action === '+') ? state.user_balance + action.value : state.user_balance - action.value;
            }

            return {
                ...state,
                user_balance: new_value
            };
    }
    return state;
}

export default userReducer;