<template>
  <div id="weibo-detail">
    <div v-if="!editing">
      <div id="weibo-detail-owner">{{ detail.owner.name }} :</div>
      <div id="weibo-detail-content">{{ detail.content }}</div>
      <div id="weibo-detail-operation">
        <button class="weibo-detail-button" @click="refresh()">Refresh</button>
        <button v-if="detail._links.edit" class="weibo-detail-button" @click="edit()">Edit</button>
        <button v-if="detail._links.delete" class="weibo-detail-button" @click="deleteThis()">Delete</button>
      </div>
      <div id="weibo-detail-reaction-container">
        <div id="weibo-reaction">
          <button v-if="detail._links.like" class="weibo-reactoin-button" @click="like()">Like</button>
          <button
            v-if="detail._links.cancelLike"
            class="weibo-reactoin-button"
            @click="cancelLike()"
          >Cancel like</button>
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
import { mapState, mapActions, mapMutations } from "vuex";

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
    ...mapActions(["get", "post", "delete", "getHomePage"]),
    ...mapMutations(["saveCurrentWeibo"]),
    refresh() {
      this.get(this.detail._links.self.href)
        .then(response => this.saveCurrentWeibo(response.data))
        .catch(err => alert(err));
    },
    edit() {
      this.editing = true;
      this.editingContent = this.detail.content;
    },
    save() {
      this.post({
        url: this.detail._links.edit.href,
        data: { content: this.editingContent }
      })
        .then(this.refresh)
        .then(() => (this.editing = false))
        .catch(err => alert(err));
    },
    deleteThis() {
      this.delete(this.detail._links.delete.href)
        .then(() => this.getHomePage())
        .then(() => this.$router.go(-1));
    },
    like() {
      this.postAndRefresh(this.detail._links.like.href);
    },
    cancelLike() {
      this.postAndRefresh(this.detail._links.cancelLike.href);
    },
    postAndRefresh(url) {
      this.post({
        url,
        data: {}
      })
        .then(this.refresh)
        .catch(err => alert(err));
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