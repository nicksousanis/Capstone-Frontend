<template>
  <div class="home">
    {{ user.name }}
    {{ user.city }}
    {{ user.completed_5k }}
    {{ user.completed_10k }}
    {{ user.completed_marathon }}
    <div v-for="badge in badges">
      {{ badge.name }}
    </div>
    <!--     <div v-for:></div> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      user: [],
      badges: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      this.user = response.data;
      this.badges = response.data.badges;
      console.log(response);
    });
  },
  methods: {}
};
</script>
