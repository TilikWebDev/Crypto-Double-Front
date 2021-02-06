import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3011/'
})

export const casesAPI = { 
    getCategoryData () {
        return instance.get('cases/category').then(response => {
            return response.data;
        });
    },
    
    getLastDropData () {
        return instance.get('cases/last-drops').then(response => {
            return response.data;
        });
    },

    getCasesData (name = '') {
        return instance.get('cases/data?name=' + name).then(response => {
            return response.data;
        });
    },

    getOpenCase (name) {
        return instance.get('cases/opencase?name=' + name).then(response => {
            return response.data;
        });
    },

    sellDrop (id) {
        return instance.get('cases/sell?id=' + id).then(response => {
            return response.data;
        });
    }
};

export const authAPI = {
    authMe () {
        return instance.get('auth-me').then(response => {
            return response.data;
        });
    },

    login (email, password) {
        return instance.post('login?email=' + email + '&password=' + password).then(response => {
			return response.data;
        });
    },

    logout () {
        return instance.post('logout').then(response => {
			return response.data;
        });
    },

    register (email, password) {
        return instance.post('register?email=' + email + '&password=' + password).then(response => {
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

export const provablyFairAPI = {
    getResults (size, page) {
        return instance.get('provably-fair?size=' + size + '&page=' + page).then(response => {
            return response.data;
        });
    }
};