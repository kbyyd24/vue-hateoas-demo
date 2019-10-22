<template>
  <div>
    <div id="refresh"><button @click="refresh">refresh</button></div>
    <WeiboListItem v-for="(weibo) in weiboList" :key="weibo.id" :weibo="weibo" />
    <div id="post"></div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import WeiboListItem from "./WeiboListItem";

export default {
  name: "HomePage",
  computed: mapState({
    weiboList: state => state.weibos.weiboListItems
  }),
  methods: {
      ...mapActions({
          refresh: 'getHomePage'
      })
  },
  components: {
      WeiboListItem
  }
};
</script>

<style>
</style>