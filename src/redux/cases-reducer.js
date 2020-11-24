import {casesAPI} from '../api/api';

const SET_CASES_DATA = 'SET_CASES_DATA';
const SET_LAST_DROP_DATA = 'SET_LAST_DROP_DATA';
const UPDATE_LAST_DROP_DATA = 'UPDATE_LAST_DROP_DATA';
const SET_CASE_BY_NAME = 'SET_CASE_BY_NAME';
const CHANGE_AUTO_SELL = 'CHANGE_AUTO_SELL';

let initialState = {
    cases: [

    ],

    last_drop: [

    ],

    case_name_data: [

    ],
    
    case_data_is_loading: false,
    auto_sell_drops: false
};

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

export const setLastDropData = (cases) => {
    return {
        type: SET_CASES_DATA,
        cases: cases
    }
}

export const updateLastDropData = (lastDrop) => {
    return {
        type: UPDATE_LAST_DROP_DATA,
        lastDrop: lastDrop
    }
}

//thunk

export const getCaseByName = (name) => {
    return (dispatch) => {
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
            dispatch(setLastDropData(data.data));
        });
    }
}

export const casesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_AUTO_SELL:
            return {
                ...state,
                auto_sell_drops: !state.auto_sell_drops
            }

        case SET_CASE_BY_NAME: 
            return {
                ...state,
                case_name_data: action.case,
                case_data_is_loading: true
            }

        case SET_CASES_DATA:
            return {
                ...state,
                cases: [
                    ...action.cases
                ]
            }

        case SET_LAST_DROP_DATA:
            return {
                ...state,
                lastDrop: [
                    ...action.lastDrop
                ]
            }
        default: 
            return state;
    }
}

export default casesReducer;