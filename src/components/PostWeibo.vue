<template>
  <div id="create">
    <div id="content-container">
      <textarea id="content-input" cols="30" rows="10" v-model="content"></textarea>
    </div>
    <div id="post">
      <button id="post-button" @click="postWeibo()">post</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostWeibo",
  props: ["postWeiboUrl"],
  data: () => {
    return {
      content: ""
    };
  },
  methods: {
    postWeibo() {
      const content = this.content;
      this.$store
        .dispatch("post", {
          url: this.postWeiboUrl,
          data: { content }
        })
        .then(() => this.$store.dispatch("getHomePage"))
        .catch(err => alert(err));
    }
  }
};
</script>

<style>
#content-container {
  margin-top: 20px;
}
#content-input {
  font-size: 20px;
  width: 560px;
  height: 60px;
}
#post-button {
  font-size: 14px;
}
</style>