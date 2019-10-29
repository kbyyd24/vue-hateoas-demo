<template>
  <div id="weibo-detail">
    <div v-if="!editing">
      <div id="weibo-detail-owner">{{ detail.owner.name }} :</div>
      <div id="weibo-detail-content">{{ detail.content }}</div>
      <div id="weibo-detail-operation">
        <button class="weibo-detail-button" @click="refresh(detail.id)">Refresh</button>
        <button class="weibo-detail-button" @click="edit()">Edit</button>
        <button class="weibo-detail-button" @click="deleteThis()">Delete</button>
      </div>
      <div id="weibo-detail-reaction-container">
        <div id="weibo-reaction">
          <button
            class="weibo-reactoin-button"
            v-if="!hasLiked()"
            @click="likeWeibo(detail.id)"
          >Like</button>
          <button
            class="weibo-reactoin-button"
            v-if="hasLiked()"
            @click="dislikeWeibo(detail.id)"
          >Dislike</button>
        </div>
        <div>
          Liked By:
          <li v-for="user in detail.likedBy" :key="user.id">{{ user.name }}</li>
        </div>
      </div>
    </div>
    <div v-if="editing">
      <div>
        <textarea id="content-input" v-model="editingContent"></textarea>
      </div>
      <div>
        <button id="weibo-detail-edit-button" @click="save()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "WeiboDetail",
  data: () => {
    return {
      editing: false,
      editingContent: ""
    };
  },
  computed: mapState({
    detail: state => state.currentWeibo,
    userId: state => state.userId
  }),
  methods: {
    ...mapActions(["deleteWeibo", "likeWeibo", "dislikeWeibo"]),
    ...mapActions({
      refresh: "getWeiboDetail"
    }),
    edit() {
      this.editing = true;
      this.editingContent = this.detail.content;
    },
    save() {
      const weiboId = this.detail.id;
      const content = this.editingContent;
      this.$store
        .dispatch("editWeibo", { weiboId, content })
        .then(() => (this.editing = false));
    },
    deleteThis() {
      const weiboId = this.detail.id;
      this.$store
        .dispatch("deleteWeibo", weiboId)
        .then(() => this.$router.go(-1));
    },
    hasLiked() {
      return (
        this.detail.likedBy
          .map(user => user.id)
          .filter(id => id === this.userId).length !== 0
      );
    }
  }
};
</script>

<style>
#weibo-detail {
  width: 60%;
  margin: auto;
  margin-top: 30px;
}

#weibo-detail-owner {
  text-align: left;
}

#weibo-detail-content {
  width: 90%;
  margin: auto;
  text-align: left;
}

#weibo-detail-operation {
  width: 40%;
  margin: auto;
  margin-top: 10px;
}

#weibo-reaction {
  width: 20%;
  margin: auto;
  margin-top: 10px;
}

.weibo-detail-button {
  width: 33%;
}
</style>