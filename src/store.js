import Vuex, { Store } from "vuex";
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Store({
    state: {
        weibos: {},
        userId: '',
        currentWeibo: {}
    },
    mutations: {
        saveUserId(state, userId) {
            state.userId = userId
        },
        updateHomePage(state, data) {
            state.weibos = data
        },
        saveCurrentWeibo(state, data) {
            state.currentWeibo = data
        }
    },
    actions: {
        getHomePage(context) {
            const headers = buildHeaders(context.state.userId)
            axios.get('http://localhost:8080/home', { headers })
                .then(response => context.commit('updateHomePage', response.data))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        get(context, url) {
            const headers = buildHeaders(context.state.userId)
            return axios.get(url, { headers })
        },
        post(context, { url, data }) {
            const headers = buildHeaders(context.state.userId)
            return axios.post(url, data, { headers })
        },
        delete(context, url) {
            const headers = buildHeaders(context.state.userId)
            return axios.delete(url, { headers })
        }
    }
})

const buildHeaders = (userId) => {
    if (userId && userId.trimLeft().trimRight() != '') {
        return {
            'X-USER-ID': userId,
            'Accept': 'application/hal+json'
        }
    } else {
        return { 'Accept': 'application/hal+json' }
    }
}