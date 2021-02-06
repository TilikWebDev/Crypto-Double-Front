import { getUserData } from './auth-reducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false
}

export const changeInitialized = () => {
    return {
        type: SET_INITIALIZED
    }
}

export const initializeApp = () => {
    return (dispatch) => {
        let get_user_promise = dispatch(getUserData());

        Promise.all([get_user_promise]).then(() => {
            dispatch(changeInitialized());
        });        
    }
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export default appReducer;