import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3011/'
})

export const casesAPI = { 
    getLastDropData () {
        return instance.get('cases/lastdrop').then(response => {
            return response.data;
        });
    },

    getCasesData (name = '') {
        return instance.get('cases/data?name=' + name).then(response => {
            return response.data;
        });
    }
};

export const headerAPI = {
    authMe () {
        return instance.get('auth-me').then(response => {
            return response.data;
        });
    }
};

export const doubleAPI = {
    postChatMessage (text) {
        return instance.post('chat?text=' + text).then(response => {
            return response.data;
        })
    },

    getBalance () {
        return instance.get('refreshmybalance').then(response => {
            return response.data;
        })
    },

    postMyBet (amount, color) {
        return instance.post('createbet?bet=' + amount + '&color=' + color).then(response => {
            return response.data;
        })
    }
};

export const modalWindowAPI = {
    login (email, password) {
        return instance.post('login?email=' + email + '&password=' + password).then(response => {
			return response.data;
        });
    },

    register (email, password) {
        return instance.post('register?email=' + email + '&password=' + password).then(response => {
			return response.data;
        });
    }
};

export const provablyFairAPI = {
    getResults (size, page) {
        return instance.get('provably-fair?size=' + size + '&page=' + page).then(response => {
            return response.data;
        });
    }
};