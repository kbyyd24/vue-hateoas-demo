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
                .catch(err => alert(err))
        }
    }
})