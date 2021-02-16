import {createSelector} from 'reselect';

const calculateRarity = (price) => {
    let _price = parseInt(price);

    if (!_price) return false;

    switch (true) {
        case (_price > 50000):
            return 'anc';

        case (_price > 20000):
            return 'arc';

        case (_price > 10000):
            return 'leg';

        case (_price > 1000):
            return 'imm';

        case (_price > 500):
            return 'myt';

        case (_price > 250):
            return 'rar';

        case (_price > 100):
            return 'unc';

        default:
            return 'com'; 
    }
}

const getCurrentState = (state) => state.cases
const getInitialized = (state) => getCurrentState(state).initialized
const getCasesData = (state) => getCurrentState(state).cases_data
const getCaseByNameData = (state) => getCurrentState(state).case_name_data
const getCategoryData = (state) => getCurrentState(state).category_data
const getLastDropData = (state) => getCurrentState(state).last_drop_data
const getSellDropButtonStatus = (state) => getCurrentState(state).sell_drop_button_status
const getRouletteDrop = (state) => getCurrentState(state).roulette_drop
const getOpeningStatus = (state) => getCurrentState(state).opening_status
const getWinDropData = (state) => getCurrentState(state).win_drop_data
const getOpenButtonStatus = (state) => getCurrentState(state).open_button_status

///

export const getCasesInitializedStatus = createSelector(getInitialized, (initialized) => initialized);

export const getCasesDataSelector = createSelector(getCasesData, (cases_data) => cases_data);

export const getCaseByNameDataSelector = createSelector(getCaseByNameData, (case_name_data) => case_name_data);

export const getCategoryDataSelector = createSelector(getCategoryData, (category_data) => category_data);

export const getLastDropDataSelector = createSelector(getLastDropData, ({best_drop, default_drop}) => {
    return {
        default_drop: default_drop.reduce((accumulator, s) => {
            return [
                ...accumulator,
                {
                    ...s,
                    class_name: calculateRarity(s.price)
                }
            ]
        }, []),

        best_drop: {
            ...best_drop,
            class_name: `b_${calculateRarity(best_drop.price)}`
        }
    }
});

export const getSellDropButtonStatusSelector = createSelector(getSellDropButtonStatus, (sell_drop_button_status) => sell_drop_button_status);

export const getRouletteDropSelector = createSelector(getRouletteDrop, (roulette_drop) => {
    return roulette_drop.map((d) => {
        return {
            ...d,
            class_name: calculateRarity(d.price)
        }
    });
});

export const getOpeningStatusSelector = createSelector(getOpeningStatus, (opening_status) => opening_status);

export const getWinDropDataSelector = createSelector(getWinDropData, (win_drop_data) => win_drop_data);

export const getOpenButtonStatusSelector = createSelector(getOpenButtonStatus, (open_button_status) => open_button_status);