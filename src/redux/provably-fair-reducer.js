import {provablyFairAPI} from '../api/api';

const SET_LAST_ROLLS = 'SET_LAST_ROLLS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    last_rolls: [],
    page_size: 20,
    total_count: 0,
    current_page: 1,
    is_fetching: true
};

export const toggleIsFetching = (value) => {
    return {
        type: TOGGLE_IS_FETCHING,
        value: value
    }
}

export const setLastRolls = (data) => {
    return {
        type: SET_LAST_ROLLS,
        data: data
    }
}

export const setCurrentPage = (id) => {
    return {
        type: SET_CURRENT_PAGE,
        id: id
    }
}

export const changePage = (page_size, id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true)); 
        dispatch(setCurrentPage(id));

        provablyFairAPI.getResults(page_size, id).then(data => {
            dispatch(setLastRolls(data));
            dispatch(toggleIsFetching(false));
        });
    }
}

export const getLastRolls = (page_size, current_page) => {
    return (dispatch) => {
        provablyFairAPI.getResults(page_size, current_page).then(data => {
            dispatch(setLastRolls(data));
            dispatch(toggleIsFetching(false));
        });
    }
}

const provablyFairReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_LAST_ROLLS:
            return { 
                ...state, 
                total_count: (action.data.total_count > 100) ? 100 : action.data.total_count,
                last_rolls: [ ...action.data.result ]
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                current_page: action.id
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                is_fetching: action.value
            };

        default:
            return state;
    }
}

export default provablyFairReducer;