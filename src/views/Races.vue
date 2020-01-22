<template>
  <div id="page-wrapper">
    <!-- Header -->
    <section id="header" class="wrapper">
      <!-- Logo -->
      <div id="logo">
        <h1>Route-Runner</h1>
      </div>

      <!-- Nav -->
      <!-- Nav -->
      <nav id="nav">
        <ul>
          <li class="current"><a href="/races">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li>
            <a href="#">City</a>
            <ul>
              <li><a href="#" v-on:click="showCity('Boston')">Boston</a></li>
              <li><a href="#" v-on:click="showCity('Chicago')">Chicago</a></li>
              <li><a href="#" v-on:click="showCity('Los Angeles')">Los Angeles</a></li>
              <li><a href="#" v-on:click="showCity('New York')">New York</a></li>
            </ul>
          </li>

          <li><a href="/workouts">Workouts</a></li>

          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    </section>

    <!-- Main -->
    <section id="main" class="wrapper style2">
      <div class="title">{{ current_city }} races</div>
      <div class="container">
        <div class="row gtr-150">
          <div class="col-4 col-12-medium">
            <!-- Sidebar -->
            <div id="sidebar">
              <section class="box">
                <header>
                  <h2>Your upcoming races</h2>
                </header>
                <ul v-for="watchlist in watchlists" class="style2">
                  <li>
                    <article class="box post-excerpt">
                      <a class="image left">
                        <img
                          v-if="watchlist.city === 'Chicago'"
                          src="https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/chicago_skyline_j_crocker.jpg?itok=pjK1ib5p"
                          alt=""
                        />
                        <img
                          v-if="watchlist.city === 'New York'"
                          src="https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/a8/45/58/shutterstock-221359171.jpg"
                          alt=""
                        />
                        <img
                          v-if="watchlist.city === 'Boston'"
                          src="https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/11/boston-skyline-now.jpg"
                          alt=""
                        />
                        <img
                          v-if="watchlist.city === 'Los Angeles'"
                          src="https://live.staticflickr.com/7414/27302339295_8e2a20feaf_b.jpg"
                          alt=""
                        />
                      </a>
                      <h3>
                        <a>{{ watchlist.name }}</a>
                      </h3>
                      <a>{{ watchlist.date }}</a>
                      <p>
                        <!--   Duis odio diam, luctus et vulputate vitae, vehicula ac dolor. Pellentesque at urna eget tellus
                        sed etiam. -->
                      </p>
                      <a v-on:click="removeRace(watchlist)" class="button style1">Remove from list</a>
                    </article>
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <div class="col-8 col-12-medium imp-medium">
            <!-- Content -->
            <div id="content">
              <div class="row gtr-150">
                <div v-for="race in races" class="col-6 col-12-small" v-if="current_city === race.city">
                  <section class="box">
                    <header>
                      <h2>{{ race.name }} / {{ race.date }}</h2>
                    </header>
                    <a class="image featured">
                      <img
                        v-if="race.city === 'Chicago'"
                        src="https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/chicago_skyline_j_crocker.jpg?itok=pjK1ib5p"
                        alt=""
                      />
                      <img
                        v-if="race.city === 'New York'"
                        src="https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/a8/45/58/shutterstock-221359171.jpg"
                        alt=""
                      />
                      <img
                        v-if="race.city === 'Boston'"
                        src="https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/11/boston-skyline-now.jpg"
                        alt=""
                      />
                      <img
                        v-if="race.city === 'Los Angeles'"
                        src="https://live.staticflickr.com/7414/27302339295_8e2a20feaf_b.jpg"
                        alt=""
                      />
                    </a>
                    <p>
                      <!--      Rutrum bibendum. Proin pellentesque diam non ligula commodo tempor. Vivamus eget urna nibh.
                      Curabitur non fringilla nisl. Donec accumsan interdum nisi, quis tempus. -->
                    </p>
                    <a v-if="!race.isWatched" v-on:click="addRace(race)" class="button style1">Add race to my list</a>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      races: [],
      user: {},
      current_city: "",
      watchlists: [],
      test:
        "https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/chicago_skyline_j_crocker.jpg?itok=pjK1ib5p"
    };
  },
  created: function() {
    axios.get("/api/races").then(response => {
      this.races = response.data;
    });
    axios.get("/api/users").then(response => {
      this.user = response.data;
      this.current_city = this.user.city;
    });
    axios.get("/api/racewatchlists").then(response => {
      this.watchlists = response.data;
    });
  },
  mounted: function() {
    (function($) {
      var $window = $(window),
        $body = $("body");

      // Breakpoints.
      breakpoints({
        xlarge: ["1281px", "1680px"],
        large: ["981px", "1280px"],
        medium: ["737px", "980px"],
        small: [null, "736px"]
      });

      // Play initial animations on page load.
      $window.on("load", function() {
        window.setTimeout(function() {
          $body.removeClass("is-preload");
        }, 100);
      });

      // Dropdowns.
      $("#nav > ul").dropotron({
        mode: "fade",
        noOpenerFade: true,
        alignment: "center",
        detach: false
      });

      // Nav.

      // Title Bar.
      $(
        '<div id="titleBar">' +
          '<a href="#navPanel" class="toggle"></a>' +
          '<span class="title">' +
          $("#logo h1").html() +
          "</span>" +
          "</div>"
      ).appendTo($body);

      // Panel.
      $('<div id="navPanel">' + "<nav>" + $("#nav").navList() + "</nav>" + "</div>")
        .appendTo($body)
        .panel({
          delay: 500,
          hideOnClick: true,
          hideOnSwipe: true,
          resetScroll: true,
          resetForms: true,
          side: "left",
          target: $body,
          visibleClass: "navPanel-visible"
        });
    })(jQuery);
  },
  methods: {
    showCity: function(city) {
      this.current_city = city;
      console.log(this.current_city);
    },
    addRace: function(race) {
      race.isWatched = true;
      var params = {
        user_id: this.user.id,
        race_id: race.id
      };
      axios.post("/api/racewatchlists", params).then(response => {
        this.watchlists.push(response.data);
        console.log(response.data);
        axios.get("/api/racewatchlists").then(response => {
          this.watchlists = response.data;
        });
      });
    },
    removeRace: function(watchlist) {
      axios.delete("/api/racewatchlists/" + watchlist.watchlist_id).then(response => {
        var index = this.watchlists.indexOf(watchlist);
        this.watchlists.splice(index, 1);
        axios.get("/api/races").then(response => {
          this.races = response.data;
        });
      });
    }
  }
};
</script>
