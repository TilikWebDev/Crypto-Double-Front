import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://91.240.84.47:3000/'
})

export const betsAPI = { 

    getApiSportsBetting (status) {
        if (this.ajaxRequest ) {
            this.ajaxRequest.cancel(); 
        }

        this.ajaxRequest = axios.CancelToken.source();

        return instance.get('api-sports-betting/' + status, {
            cancelToken: this.ajaxRequest.token
        }).then(response => {
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

export const indexAPI = {
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
    }
};

export const provablyFairAPI = {
    getResults (size, page) {
        return instance.get('provably-fair?size=' + size + '&page=' + page).then(response => {
            return response.data;
        });
    }
};