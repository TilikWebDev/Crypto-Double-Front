import { loadUserData } from './user-reducer';

const SET_APP_INITIALIZED = 'APP/SET_APP_INITIALIZED';

let initialState = {
    initialized: false
}

export const changeInitialized = () => {
    return {
        type: SET_APP_INITIALIZED
    }
}

export const initializeApp = () => {
    return (dispatch) => {
        let get_user_promise = dispatch(loadUserData());

        Promise.all([get_user_promise]).then(() => {
            dispatch(changeInitialized());
        });        
    }
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export default appReducer;