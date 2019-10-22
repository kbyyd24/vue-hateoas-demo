<template>
  <div>
    <div id="user-id"><span>
        user id :
        <input type="text" v-model="userId" />
      </span></div>
    <div id="refresh">
      <button @click="refresh(userId)">refresh</button>
    </div>
    <WeiboListItem v-for="(weibo) in weiboList" :key="weibo.id" :weibo="weibo" />
    <div id="post"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WeiboListItem from "./WeiboListItem";

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
    WeiboListItem
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