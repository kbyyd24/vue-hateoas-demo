<template>
  <div id="user-id">
    <span>
      user id :
      <input type="text" v-model="userId" />
    </span>
  </div>
</template>

<script>
export default {
  name: "UserId",
  computed: {
    userId: {
      get() {
        return this.$store.state.userId;
      },
      set(value) {
        this.$store.commit("saveUserId", value);
      }
    }
  }
};
</script>

<style>
#user-id {
  font-size: 20px;
}
</style>