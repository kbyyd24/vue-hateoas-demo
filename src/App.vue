<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <UserId />
    <router-view></router-view>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import UserId from "./components/UserId.vue";
import WeiboDetail from "./components/WeiboDetail.vue";
import VueRouter from "vue-router";

const routes = [
  { path: "/", component: HomePage },
  { path: "/weibos/:id", component: WeiboDetail }
];

const router = new VueRouter({ routes });

export default {
  name: "app",
  components: {
    UserId
  },
  router
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
