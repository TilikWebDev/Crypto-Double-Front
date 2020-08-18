const SHOW_NOTIFY = 'SHOW_NOTIFY';
const REMOVE_NOTIFY = 'REMOVE_NOTIFY';

let initialState = [

];

export const createNotification = (msg, status) => {
    return {
        type: SHOW_NOTIFY,
        text: msg,
        status: status
    }
}

export const removeNotification= (id) => {
    return {
        type: REMOVE_NOTIFY,
        id: id
    }
}

export const notificationsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_NOTIFY:
            return [
                ...state,
                {
                    text: action.text,
                    status: action.status,
                    id: Math.random(99999999999)
                }
            ]

        case REMOVE_NOTIFY:
            return  state.filter((n) =>  { 
                return n.id !== action.id;
            });

        default: 
            return state;
    }
}

export default notificationsReducer;