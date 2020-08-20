import {betsAPI} from '../api/api';

const SET_BETS_LIST = 'SET_BETS_LIST';

let initialState = {
    bets_list: []
};

export const setBetsList = (data) => {
    return {
        type: SET_BETS_LIST,
        data: data
    }
}

export const getBetsList = (status) => {
    return (dispatch) => {
        betsAPI.getApiSportsBetting(status).then(data => {
            dispatch(setBetsList(data));
        });
    };
}

export const betsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_BETS_LIST:
            return  {
                bets_list: [...action.data]
            };

        default: 
            return state;
    }
}

export default betsReducer;
