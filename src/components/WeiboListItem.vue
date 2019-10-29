<template>
  <div>
    <div id="weibo-item-box" @click="goToDetail()">
      <div id="weibo-list-owner">{{ weibo.owner.name }} :</div>
      <div id="weibo-list-content">{{ weibo.content }}</div>
      <div id="like-count">点赞数：{{ weibo.likedCount }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "WeiboListItem",
  props: ["weibo"],
  methods: {
    ...mapActions(["get"]),
    ...mapMutations(["saveCurrentWeibo"]),
    goToDetail() {
      this.get(this.weibo._links.self.href)
        .then(response => this.saveCurrentWeibo(response.data))
        .then(() => this.$router.push(`/weibos/${this.weibo.id}`))
        .catch(err => alert(err));
    }
  }
};
</script>

<style>
#weibo-item-box {
  width: 40%;
  margin: auto;
  margin-top: 10px;
  border-color: gray;
  border-style: solid;
}

#weibo-list-owner {
  text-align: left;
  width: 98%;
  margin: auto;
}

#weibo-list-content {
  text-align: left;
  width: 90%;
  margin: auto;
}

#like-count {
  text-align: right;
  width: 90%;
  margin: auto;
}
</style>