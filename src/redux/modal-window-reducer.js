import {modalWindowAPI} from '../api/api';
import {createNotification} from '../redux/notifications-reducer';

const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

const ON_CHANGE_LOGIN_EMAIL = 'ON_CHANGE_LOGIN_EMAIL';
const ON_CHANGE_LOGIN_PASSWORD = 'ON_CHANGE_LOGIN_PASSWORD';

let initialState = {
    is_show: false,
    modal_list: [
        {
            name: 'login', 
            active: false,
            inputs: {
                email: '',
                password: ''
            }
        },
        {name: 'register', active: false},
        {name: 'chat_rules', active: false},
        {name: 'forgot_password', active: false}
    ]
};

export const onChangeLoginEmail = (email) => {
    return {
        type: ON_CHANGE_LOGIN_EMAIL,
        email: email 
    }
};

export const onChangeLoginPassword = (password) => {
    return {
        type: ON_CHANGE_LOGIN_PASSWORD,
        password: password 
    }
};

export const userLogin = (email, password) => {
    return (dispatch) => {
        modalWindowAPI.login(email, password).then(data => {
			if (data.error) {
				dispatch(createNotification(data.message, 'error'));
			} else {
				window.location.href = '/';
			}
        });
    }
};

export const showModal = (name) => {
    return {
        type: SHOW_MODAL,
        name: name
    }
}

export const hideModal = () => {
    return {
        type: HIDE_MODAL
    }
}

export const modalWindowReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_MODAL:
            return  {
                is_show: true,
                modal_list: [
                    ...state.modal_list.map((m) =>  { 
                        if (m.name === action.name) {
                            return {...m, active: true};
                        } else {
                            return {...m, active: false};
                        }
                    })
                ]
            };

        case HIDE_MODAL:
            return  {
                is_show: false,
                modal_list: [
                    ...state.modal_list.map((m) =>  { 
                        return {...m, active: false};
                    })
                ]
            };
        
        case ON_CHANGE_LOGIN_EMAIL: 
            return {
                ...state,
                modal_list: [
                    ...state.modal_list.map((m) => {
                        if (m.name === 'login') {
                            return {
                                ...m,
                                inputs: {
                                    ...m.inputs,
                                    email: action.email
                                }
                            };
                        } else {
                            return m;
                        }
                    })
                ]
            };

        case ON_CHANGE_LOGIN_PASSWORD: 
            return {
                ...state,
                modal_list: [
                    ...state.modal_list.map((m) => {
                        if (m.name === 'login') {
                            return {
                                ...m,
                                inputs: {
                                    ...m.inputs,
                                    password: action.password
                                }
                            };
                        } else {
                            return m;
                        }
                    })
                ]
            };

        default: 
            return state;
    }
}

export default modalWindowReducer;