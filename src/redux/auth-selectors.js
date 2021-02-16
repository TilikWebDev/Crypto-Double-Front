import {createSelector} from 'reselect';

export const getAuth = (state) => {
    return state.auth.is_auth;
}

export const getAuthSelector = createSelector(getAuth, (is_auth) => {
    return is_auth
});