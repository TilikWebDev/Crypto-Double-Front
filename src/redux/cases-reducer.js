import { w3cwebsocket } from "websocket";

import {casesAPI} from '../api/api';
import {updateUserBalance} from './user-reducer';

import {createNotification} from './notifications-reducer';

const SET_CASES_DATA = 'CASES/SET_CASES_DATA';
const SET_CASE_BY_NAME = 'CASES/SET_CASE_BY_NAME';
const SET_OPENING_STATUS = 'CASES/SET_OPENING_STATUS';
const SET_WIN_DROP = 'CASES/SET_WIN_DROP';
const SOCKET_SET_NEW_DROP = 'CASES/SOCKET_SET_NEW_DROP';
const START_LOADING_CASE_DATA = 'CASES/START_LOADING_CASE_DATA';
const OPEN_BUTTON_DISABLED_TRUE = 'CASES/OPEN_BUTTON_DISABLED_TRUE';
const OPEN_BUTTON_DISABLED_FALSE = 'CASES/OPEN_BUTTON_DISABLED_FALSE';
const SET_CATEGORY_DATA = 'CASES/SET_CATEGORY_DATA';
const CHANGE_CASE_CATEGORY = 'CASES/CHANGE_CASE_CATEGORY';
const CHANGE_SELL_DROP_BUTTON_STATUS = 'CASES/CHANGE_SELL_DROP_BUTTON_STATUS';
const SET_CASES_INITIALIZED = 'CASES/SET_CASES_INITIALIZED';

let initialState = {
    initialized: false,

    category_data: [],

    cases_data: [],

    case_name_data: {
        case_data_is_loading: false
    },

    last_drop_data: {
        default_drop: [],
        best_drop: {}
    },

    win_drop_data: {},

    roulette_drop: [],

    sell_drop_button_status: true,

    opening_status: 'case-zoom',
    open_button_status: false
};

export const changeInitialized = () => {
    return {
        type: SET_CASES_INITIALIZED
    }
}

export const changeSellDropButtonStatus = (status) => {
    return {
        type: CHANGE_SELL_DROP_BUTTON_STATUS,
        status: status
    }
}

export const changeCaseCategory = (name) => {
    return {
        type: CHANGE_CASE_CATEGORY,
        name: name
    }
}

export const setCategoryData = (data) => {
    return {
        type: SET_CATEGORY_DATA,
        data: data
    }
}

export const openButtonDisabledTrue = () => {
    return {
        type: OPEN_BUTTON_DISABLED_TRUE
    }
}

export const openButtonDisabledFalse = () => {
    return {
        type: OPEN_BUTTON_DISABLED_FALSE
    }
}

export const socketSetNewDrop = (drop) => {
    return {
        type: SOCKET_SET_NEW_DROP,
        drop: drop
    }
}

export const setCaseByName = (case_data) => {
    return {
        type: SET_CASE_BY_NAME,
        case: case_data
    }
}
 
export const setCasesData = (cases) => {
    return {
        type: SET_CASES_DATA,
        cases: cases
    }
}

export const setOpeningStatus = (name) => {
    return {
        type: SET_OPENING_STATUS,
        name: name
    }
}

export const setWinDrop = (drop) => {
    return {
        type: SET_WIN_DROP,
        drop: drop
    }
}

export const startLoadingCaseData = () => {
    return {
        type: START_LOADING_CASE_DATA
    }
}

//thunk

export const initializeCases = () => {

    const websocket = new w3cwebsocket('ws://localhost:3013');
    
    return (dispatch) => {

        websocket.onopen = () => {
            dispatch(createNotification('Socket connected!', 'success'));
        };
    
        websocket.onclose = () => {
            dispatch(createNotification('Socket disconected! Pls reload page!', 'error', false));
        };
    
        websocket.onmessage = (message) => {
            dispatch(socketSetNewDrop(
                JSON.parse(message.data)
            ));
        }

        let get_cases_data = dispatch(loadCasesData());
        let get_last_drop_data = dispatch(loadLastDropData());
        let get_category_data = dispatch(loadCategoryData());

        Promise.all([get_cases_data, get_last_drop_data, get_category_data]).then(() => {
            dispatch(changeInitialized());
        });        
    }
}

export const changeOpeningStatus = (name) => {
    return (dispatch) => {
        dispatch(setOpeningStatus(name));
    }
}

export const loadCategoryData = () => {
    return async (dispatch) => {
        let {data, message, error} = await casesAPI.getCategoryData();

        if (!error) {
            dispatch(setCategoryData(data));
        } else {
            dispatch(createNotification(message, 'error'));
        }
    }
}

export const sellDrop = (id, price, set_opening_status = true) => {
    return async (dispatch) => {
        let {data, message, error} = await casesAPI.sellDrop(id);

        if (!error) {
            dispatch(updateUserBalance(price, '+'));  
            set_opening_status && dispatch(setOpeningStatus('case-zoom'));
        } else {
            dispatch(createNotification(message, 'error'));
        }
    }
}

export const openCase = (name, price, auto_sell_drops_status) => {
    return async (dispatch) => {

        dispatch(openButtonDisabledTrue());

        let {data, message, error} = await casesAPI.getOpenCase(name);

        if (!error) {
            dispatch(setWinDrop(data));  
            dispatch(setOpeningStatus('roulette')); 
            dispatch(changeSellDropButtonStatus(!auto_sell_drops_status));
            dispatch(updateUserBalance(price, '-'));

            if (auto_sell_drops_status && data.price < price) { 
                dispatch(sellDrop(data._id, data.price, false));
            }
        } else {
            dispatch(createNotification(message, 'error'));
        }

        dispatch(openButtonDisabledFalse());
    }
}

export const loadCaseByName = (name) => {
    return async (dispatch) => {
        dispatch(startLoadingCaseData());

        let {data, message, error} = await casesAPI.getCasesData(name);

        if (!error) {
            dispatch(setCaseByName(data));
        } else {
            dispatch(createNotification(message, 'error'));
        }
    }
}

export const loadCasesData = () => {
    return async (dispatch) => {
        let {data, message, error} = await casesAPI.getCasesData();
            
        if (!error) {
            dispatch(setCasesData(data));
        } else {
            dispatch(createNotification(message, 'error'));
        }
    }
}

export const loadLastDropData = () => {
    return async (dispatch) => {
        let {data, message, error} = await casesAPI.getLastDropData();

        if (!error) {
            data.map((d) => {
                let drop = {
                    user: d.email,
                    price: d.drop.price,
                    image: d.drop.image,
                    name: d.drop.name,
                    case_name: d.case.name,
                    case_image: d.case.image,
                };

                dispatch(socketSetNewDrop(drop));
            })
        } else {
            dispatch(createNotification(message, 'error'));
        }
    }
}

export const casesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CASES_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        case CHANGE_SELL_DROP_BUTTON_STATUS:
            return {
                ...state,
                sell_drop_button_status: action.status
            }

        case CHANGE_CASE_CATEGORY:
            return {
                ...state,
                category_data: [
                    ...state.category_data.map((c) => {
                        c.active = (c.name === action.name);
                        return c;
                    })
                ]
            }

        case SET_CATEGORY_DATA:
            return {
                ...state,
                category_data: [
                    ...action.data
                ]
            }

        case OPEN_BUTTON_DISABLED_TRUE:
            return {
                ...state,
                open_button_status: true
            }

        case OPEN_BUTTON_DISABLED_FALSE:
            return {
                ...state,
                open_button_status: false
            }

        case START_LOADING_CASE_DATA:
            return {
                ...state,
                case_name_data: {
                    case_data_is_loading: false
                }
            }

        case SOCKET_SET_NEW_DROP:
            return (action.drop.price > 1000) ?
                {
                    ...state,
                    last_drop_data: {
                        default_drop: [
                            ...state.last_drop_data.default_drop.slice(state.last_drop_data.default_drop.length - 52, state.last_drop_data.default_drop.length),
                            {...action.drop}
                        ],
                        best_drop: {
                            ...action.drop
                        }
                    }
                }
            : 
                {
                    ...state,
                    last_drop_data: {
                        ...state.last_drop_data,
                        default_drop: [
                            ...state.last_drop_data.default_drop.slice(state.last_drop_data.default_drop.length - 52, state.last_drop_data.default_drop.length),
                            {...action.drop}
                        ]
                    }
                }

        case SET_WIN_DROP:
            return {
                ...state,
                win_drop_data: {...action.drop}
            }

        case SET_OPENING_STATUS: 
            return {
                ...state,
                opening_status: action.name
            }

        case SET_CASE_BY_NAME: 
            let roulette_drop = [...action.case.drops];

            if  (roulette_drop.length > 0) {
                for (let i = roulette_drop.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [roulette_drop[i], roulette_drop[j]] = [roulette_drop[j], roulette_drop[i]];
                }

                while (true) {
                    if (roulette_drop.length < 150) {
                        roulette_drop.push(...roulette_drop);
                    } else {
                        roulette_drop.splice(150);
                        break;
                    }
                }
            }

            return {
                ...state,
                case_name_data: {
                    case_data_is_loading: true,
                    ...action.case
                },
                roulette_drop: roulette_drop
            }

        case SET_CASES_DATA:
            return {
                ...state,
                cases_data: [
                    ...action.cases
                ]
            }

        default: 
            return state;
    }
}

export default casesReducer;