<template>
  <div class="home">
    <div v-for="post in posts">
      {{ post.post }}
      |
      {{ post.city }}
      |
      {{ post.user }}
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      posts: []
    };
  },
  created: function() {
    axios.get("/api/posts").then(response => {
      this.posts = response.data;
      console.log(this.posts);
    });
  },
  methods: {}
};
</script>
