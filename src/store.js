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
        postWeibo(context, {url, content}) {
            console.log(content);/* eslint-disable-line */
            const headers = buildHeaders(context.state.userId)
            axios.post(url, { content }, { headers })
                .then(() => context.dispatch('getHomePage'))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        getWeiboDetail(context, weiboId) {
            const headers = buildHeaders(context.state.userId)
            return axios.get(`http://localhost:8080/weibos/${weiboId}`, { headers })
                .then(response => context.commit('saveCurrentWeibo', response.data))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        editWeibo(context, { weiboId, content }) {
            const headers = buildHeaders(context.state.userId)
            return axios.post(`http://localhost:8080/weibos/${weiboId}`, { content }, { headers })
                .then(() => context.dispatch('getWeiboDetail', weiboId))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        deleteWeibo(context, weiboId) {
            const headers = buildHeaders(context.state.userId)
            return axios.delete(`http://localhost:8080/weibos/${weiboId}`, { headers })
                .then(() => context.dispatch('getHomePage'))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        likeWeibo(context, weiboId) {
            const headers = buildHeaders(context.state.userId)
            axios.post(`http://localhost:8080/weibos/${weiboId}/like`, {}, { headers })
                .then(() => context.dispatch('getWeiboDetail', weiboId))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        dislikeWeibo(context, weiboId) {
            const headers = buildHeaders(context.state.userId)
            axios.post(`http://localhost:8080/weibos/${weiboId}/cancel-like`, {}, { headers })
                .then(() => context.dispatch('getWeiboDetail', weiboId))
                .catch(err => console.log(err))/* eslint-disable-line */
        }
    }
})

const buildHeaders = (userId) => {
    if (userId && userId.trimLeft().trimRight() != '') {
        return {
            'X-USER-ID': userId
        }
    } else {
        return {}
    }
}