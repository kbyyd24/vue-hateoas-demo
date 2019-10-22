<template>
  <div>
    <div id="weibo-item-box">
      <div id="owner-name">{{ weibo.owner.name }}</div>
      <div id="weibo-content">{{ weibo.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeiboListItem",
  props: ["weibo"]
};
</script>

<style>
#weibo-item-box {
  width: 80%;
  margin: auto;
  margin-top: 10px;
  border-color: gray;
  border-style: solid;
}
</style>