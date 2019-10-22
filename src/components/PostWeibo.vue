<template>
  <div id="create">
    <div id="content-container">
      <textarea id="content-input" cols="30" rows="10" v-model="content"></textarea>
    </div>
    <div id="post">
      <button id="post-button" @click="post({userId, content})">post</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PostWeibo",
  props: ["userId"],
  data: () => {
    return {
      content: ""
    };
  },
  methods: {
    ...mapActions({
      post: "postWeibo"
    })
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