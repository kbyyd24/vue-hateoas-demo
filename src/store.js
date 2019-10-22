import Vuex, { Store } from "vuex";
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Store({
    state: {
        weibos: {}
    },
    mutations: {
        updateHomePage(state, data) {
            state.weibos = data
        }
    },
    actions: {
        getHomePage(context, userId) {
            axios.get('http://localhost:8080/home', { headers: { 'X-USER-ID': userId } })
                .then(response => context.commit('updateHomePage', response.data))
                .catch(err => console.log(err))/* eslint-disable-line */
        },
        postWeibo(context, { userId, content }) {
            console.log(content)/* eslint-disable-line */
            axios.post('http://localhost:8080/weibos', { content }, { headers: { 'X-USER-ID': userId } })
                .then(() => context.dispatch('getHomePage', userId))
                .catch(err => console.log(err))/* eslint-disable-line */
        }
    }
})