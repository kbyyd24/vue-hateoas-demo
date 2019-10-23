<template>
  <div>
    <div id="refresh">
      <button @click="refresh()">refresh</button>
    </div>
    <PostWeibo v-if="userId" />
    <WeiboListItem v-for="(weibo) in weiboList" :key="weibo.id" :weibo="weibo" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WeiboListItem from "./WeiboListItem";
import PostWeibo from "./PostWeibo";

export default {
  name: "HomePage",
  computed: mapState({
    weiboList: state => state.weibos.weiboListItems,
    userId: state => state.userId
  }),
  methods: {
    ...mapActions({
      refresh: "getHomePage"
    })
  },
  components: {
    WeiboListItem,
    PostWeibo
  }
};
</script>

<style>
button {
  font-size: 14px;
}
</style>