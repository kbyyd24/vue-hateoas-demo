import Vuex, { Store } from "vuex";
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Store({
    state: {
        weibos: {},
        userId: ''
    },
    mutations: {
        saveUserId(state, userId) {
            state.userId = userId
        },
        updateHomePage(state, data) {
            state.weibos = data
        }
    },
    actions: {
        getHomePage(context) {
            let headers = buildHeaders(context.state.userId)
            axios.get('http://localhost:8080/home', { headers })
                .then(response => context.commit('updateHomePage', response.data))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        postWeibo(context, content) {
            console.log(content);/* eslint-disable-line */
            let headers = buildHeaders(context.state.userId)
            axios.post('http://localhost:8080/weibos', { content }, { headers })
                .then(() => context.dispatch('getHomePage'))
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