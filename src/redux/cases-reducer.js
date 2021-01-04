import {casesAPI} from '../api/api';
import {updateUserBalance} from './user-reducer';

import {createNotification} from './notifications-reducer';

const SET_CASES_DATA = 'SET_CASES_DATA';
const SET_CASE_BY_NAME = 'SET_CASE_BY_NAME';
const CHANGE_AUTO_SELL = 'CHANGE_AUTO_SELL';
const SET_OPENING_STATUS= 'SET_OPENING_STATUS';
const SET_ROLL_STYLE = 'SET_ROLL_STYLE';
const SET_WIN_DROP = 'SET_WIN_DROP';
const SOCKET_SET_NEW_DROP = 'SOCKET_SET_NEW_DROP';
const START_LOADING_CASE_DATA = 'START_LOADING_CASE_DATA';
const OPEN_BUTTON_DISABLED_TRUE = 'OPEN_BUTTON_DISABLED_TRUE';
const OPEN_BUTTON_DISABLED_FALSE = 'OPEN_BUTTON_DISABLED_FALSE';
const SET_CATEGORY_DATA = 'SET_CATEGORY_DATA';
const CHANGE_CASE_CATEGORY = 'CHANGE_CASE_CATEGORY';

let initialState = {
    category_data: [

    ],

    cases: [

    ],

    last_drop: {
        default: [

        ],

        best_drop: {

        }
    },

    case_name_data: [

    ],

    roulette_drop: [

    ],

    win_drop: {

    },
    
    case_data_is_loading: false,
    auto_sell_drops: false,
    opening_status: 'case-zoom',
    open_button_disabled: false,

    style_data: {
        marginLeft: 0,
        transition: '0s',
        width: 'auto'
    }
};

export const changeCaseCategory = (name) => {
    return {
        type: 'CHANGE_CASE_CATEGORY',
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

export const changeAutoSell = () => {
    return {
        type: CHANGE_AUTO_SELL
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

export const setRollStyle = (style) => {
    return {
        type: SET_ROLL_STYLE,
        style: style
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

export const getCategoryData = () => {
    return (dispatch) => {
        casesAPI.getCategoryData().then(data => {
            dispatch(setCategoryData(data.data));
        });
    }
}

export const sellDrop = (id, price) => {
    return (dispatch) => {
        casesAPI.sellDrop(id).then(data => {
            if (!data.error) {
                dispatch(updateUserBalance(price, '+'));
                dispatch(setOpeningStatus('case-zoom'));
            } else {
                dispatch(createNotification(data.message, 'error'));
            }
        });
    }
}

export const gotoOpenCase = () => {
    return (dispatch) => {
        dispatch(setOpeningStatus('case-zoom'));
    }
}

export const openCase = (name, price, drop_list, width, opening_status) => {
    return (dispatch) => {

        dispatch(openButtonDisabledTrue());

        casesAPI.getOpenCase(name).then(data => {

            if (!data.error) {
                dispatch(setWinDrop(data.data));

                let winning_position = 0;
                let _drop_list = [...drop_list].reverse().splice(20);

                for (let i in _drop_list) {
                    if (_drop_list[i]._id == data.data._id) {
                        winning_position = 130 - i;
                        break;
                    }
                }
                
                dispatch(updateUserBalance(price, '-'));
                dispatch(setOpeningStatus('roulette'));

                dispatch(setRollStyle({
                    marginLeft: 0,
                    transition: '0s'
                }));

                setTimeout(() => {
                    dispatch(setRollStyle({
                        marginLeft: (-winning_position * 200) + (width / 2) + 100,
                        transition: '6s'
                    }));
                }, 0);

                setTimeout(() => {
                    dispatch(setOpeningStatus('open-result'));
                    dispatch(setRollStyle({
                        marginLeft: 0,
                        transition: '0s'
                    }));
                }, 6300);
            } else {
                dispatch(createNotification(data.message, 'error'));
            }

            dispatch(openButtonDisabledFalse());
        });
    }
}

export const getCaseByName = (name) => {
    return (dispatch) => {

        dispatch(startLoadingCaseData());

        casesAPI.getCasesData(name).then(data => {
            dispatch(setCaseByName(data.data));
        });
    }
}

export const getCasesData = () => {
    return (dispatch) => {
        casesAPI.getCasesData().then(data => {
            dispatch(setCasesData(data.data));
        });
    }
}

export const getLastDropData = () => {
    return (dispatch) => {
        casesAPI.getLastDropData().then(data => {
            data.data.map((d) => {
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
        });
    }
}

export const casesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CASE_CATEGORY:
            return {
                ...state,
                category_data: [
                    ...state.category_data.map((c) => {
                        c.active = (c.name == action.name);
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
                open_button_disabled: true
            }

        case OPEN_BUTTON_DISABLED_FALSE:
            return {
                ...state,
                open_button_disabled: false
            }

        case START_LOADING_CASE_DATA:
            return {
                ...state,
                case_data_is_loading: false
            }

        case SOCKET_SET_NEW_DROP:
            return (action.drop.price > 1000) ?
                {
                    ...state,
                    last_drop: {
                        default: [
                            ...state.last_drop.default.slice(state.last_drop.default.length - 52, state.last_drop.default.length),
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
                    last_drop: {
                        ...state.last_drop,
                        default: [
                            ...state.last_drop.default.slice(state.last_drop.default.length - 52, state.last_drop.default.length),
                            {...action.drop}
                        ]
                    }
                }

        case SET_WIN_DROP:
            return {
                ...state,
                win_drop: {...action.drop}
            }

        case SET_OPENING_STATUS: 
            return {
                ...state,
                opening_status: action.name
            }

        case SET_ROLL_STYLE: 
            return {
                ...state,
                style_data: {
                    ...state.style_data,
                    ...action.style
                }
            }

        case CHANGE_AUTO_SELL:
            return {
                ...state,
                auto_sell_drops: !state.auto_sell_drops
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
                case_name_data: action.case,
                roulette_drop: roulette_drop,
                case_data_is_loading: true
            }

        case SET_CASES_DATA:
            return {
                ...state,
                cases: [
                    ...action.cases
                ]
            }

        default: 
            return state;
    }
}

export default casesReducer;