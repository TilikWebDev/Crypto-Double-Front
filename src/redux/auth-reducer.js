import {authAPI} from '../api/api';
import {createNotification} from './notifications-reducer';

const CHANGE_IS_AUTH = 'AUTH/CHANGE_IS_AUTH';

let initialState = {
    is_auth: false
};

export const changeIsAuth = (status) => {
    return {
        type: CHANGE_IS_AUTH,
        status
    }
}

//thunk

export const userLogin = async (email, password, setStatus) => {
    let {data, message, error} = await authAPI.login(email, password);

    if (error) {
        setStatus(message);
    } else {
        window.location.href = '/';
    }
};

export const userLogout = () => {
    return (dispatch) => {
        authAPI.logout().then(data => {
            if (data.error) {
				dispatch(createNotification(data.message, 'error'));
			} else {
				window.location.href = '/';
			}
        });
    }
};

export const userRegister = (email, password, passwordVerify, setStatus) => {
    return (dispatch) => {
        if (password === passwordVerify) {
            authAPI.register(email, password).then(({error, message}) => {
                if (error) {
                    setStatus(message);
                } else {
                    window.location.href = '/';
                }
            })
        } else {
            setStatus('Password and Password confirm are not the same!');
        }
    }
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_IS_AUTH:
            return {
                ...state,
                is_auth: action.status
            }
        
        default:
            break;
    }

    return state;
}

export default authReducer;