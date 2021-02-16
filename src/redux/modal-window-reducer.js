const SHOW_MODAL = 'MODAL/SHOW_MODAL';
const HIDE_MODAL = 'MODAL/HIDE_MODAL';

let initialState = {
    is_show: false,
    modal_list: [
        {
            name: 'login', 
            active: false
        },

        {
            name: 'register',
            active: false
        },

        {
            name: 'chat_rules', 
            active: false
        },

        {
            name: 'forgot_password', 
            active: false
        }
    ]
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
                        return (m.name === action.name) ?
                            {...m, active: true} :
                            {...m, active: false}
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

        default: 
            return state;
    }
}

export default modalWindowReducer;