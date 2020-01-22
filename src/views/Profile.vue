<template>
  <div id="page-wrapper">
    <section id="header" class="wrapper">
      <!-- Logo -->
      <div id="logo">
        <h1>{{ user.name }}</h1>
        <p>{{ user.city }}</p>
      </div>

      <!-- Nav -->
      <!-- Nav -->
      <nav id="nav">
        <ul>
          <li class="current"><a href="/races">Home</a></li>
          <li><a href="/profile">Profile</a></li>

          <li><a href="/workouts">Workouts</a></li>

          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    </section>
    <section id="intro" class="wrapper style1">
      <div class="title">Your profile</div>
      <div class="container">
        <p class="style1">YOUR COMPLETED RACES</p>
        <p>Completed Marathons: {{ user.completed_marathon }}</p>
        <p>Completed 10ks: {{ user.completed_10k }}</p>
        <p>Completed 5ks: {{ user.completed_5k }}</p>
        <h1>Shoes</h1>
        <p></p>
        <p v-for="shoe in shoes">{{ shoe.name }} -- {{ shoe.distance }}</p>
        <!--         <p class="style2">
          Escape Velocity is a free responsive
          <br class="mobile-hide" />
          site template by
          <a href="http://html5up.net" class="nobr">HTML5 UP</a>
        </p>
        <p class="style3">
          It's
          <strong>responsive</strong>
          , built on
          <strong>HTML5</strong>
          and
          <strong>CSS3</strong>
          , and released for free under the
          <a href="http://html5up.net/license">Creative Commons Attribution 3.0 license</a>
          , so use it for any of your personal or commercial projects &ndash; just be sure to credit us!
        </p> -->
        <!--         <ul class="actions">
          <li><a href="#" class="button style3 large">Proceed</a></li>
        </ul> -->
      </div>
    </section>
    <section id="main" class="wrapper style2">
      <div class="title">Your Badges</div>
      <div class="container">
        <!-- Image -->

        <!-- Features -->
        <section id="features">
          <header class="style1"></header>
          <div class="feature-list">
            <div class="row">
              <div v-for="badge in badges" class="col-6 col-12-medium">
                <section>
                  <h3 class="icon fa-star">{{ badge.name }}</h3>
                  <p></p>
                </section>
              </div>
            </div>
          </div>
          <!--           <ul class="actions special">
            <li><a href="#" class="button style1 large">Get Started</a></li>
            <li><a href="#" class="button style2 large">More Info</a></li>
          </ul>
 -->
        </section>
      </div>
    </section>

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
      badges: [],
      shoes: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      this.user = response.data;
      this.badges = response.data.badges;
      console.log(response);
    });
    axios.get("/api/shoes").then(response => {
      this.shoes = response.data;
    });
  },
  methods: {}
};
</script>
