import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
