<template>
  <div>
    <div id="user-id"><span>
        user id :
        <input type="text" v-model="userId" />
      </span></div>
    <div id="refresh">
      <button @click="refresh(userId)">refresh</button>
    </div>
    <PostWeibo v-bind:userId="userId"/>
    <WeiboListItem v-for="(weibo) in weiboList" :key="weibo.id" :weibo="weibo" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WeiboListItem from "./WeiboListItem";
import PostWeibo from './PostWeibo';

export default {
  name: "HomePage",
  data: () => {
    return {
      userId: ""
    };
  },
  computed: mapState({
    weiboList: state => state.weibos.weiboListItems
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
#user-id {
  font-size: 20px;
}
button {
  font-size: 14px;
}
</style>