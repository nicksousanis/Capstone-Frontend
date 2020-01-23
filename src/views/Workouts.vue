<template>
  <div class="workouts">
    <section id="header" class="wrapper">
      <div v-if="distance !== null" id="logo">
        <h1>You ran</h1>
        <div>|</div>
        <h1>{{ distance }} miles</h1>
        <div>|</div>
        <h1>{{ time }}</h1>
        <div>__</div>
        <a
          v-for="workout in workouts"
          v-if="workout.id === currentWorkout"
          v-on:click="deleteWorkout(workout)"
          class="button style1"
        >
          Delete workout
        </a>
      </div>
      <nav id="nav">
        <ul>
          <li class="current"><a href="/races">Home</a></li>
          <li><a href="/profile">Profile</a></li>

          <li>
            <a href="#">Workouts</a>
            <ul>
              <li v-for="workout in workouts">
                <a href="/workouts/" v-on:click="showWorkout(workout)">Workout{{ workout.id }}</a>
              </li>
            </ul>
          </li>

          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    </section>

    <div id="map"></div>
  </div>
</template>

<style>
#map {
  height: 400px;
}
</style>

<script>
/* global mapboxgl */
/* global MapboxDirections */
import axios from "axios";
export default {
  data: function() {
    return {
      workouts: [],
      coordinates: [],
      // places: [
      //   { latitude: -25.363, longitude: 131.044, description: "A place in Australia" },
      //   { latitude: -33.8675, longitude: 151.207, description: "The main city!" },
      //   { latitude: 41.89, longitude: -87.62, description: "Chicago" }
      // ],
      current_workout: "",
      coordinate: [],
      start: [],
      distance: null,
      time: null,
      currentWorkout: null
    };
  },
  mounted: function() {
    this.setupTheme();
    axios.get("/api/workouts").then(response => {
      this.workouts = response.data;
    });
    axios.get("/api/coordinates").then(response => {
      this.coordinates = response.data;
      this.setupMap();
    });
  },
  methods: {
    setupTheme: function() {
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
    setupMap: function() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoicml2ZXJzMTQiLCJhIjoiY2s1ZzJlMzRrMDNoeTNtczhwazNsM2hoaiJ9.vqKM1QhaJaz7vL2In6qn3g";
      var index = 0;
      var monument = [-87.6348, 41.8921];
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v10",
        center: monument,
        zoom: 14
      });
      while (index < this.coordinates.length) {
        var el = document.createElement("div");
        el.id = "marker";
        if (this.current_workout === this.coordinates[index].workout_id) {
          var marker = new mapboxgl.Marker()
            .setLngLat([this.coordinates[index].longitude, this.coordinates[index].latitude])

            .addTo(map);
          index = index + 1;
        } else {
          index = index + 1;
        }
      }
    },
    showWorkout: function(workout) {
      this.distance = workout.distance;
      this.time = workout.workout_time;
      this.currentWorkout = workout.id;
      this.current_workout = workout.id;
      this.setupMap();

      console.log(this.coordinates);
      console.log(this.current_workout);
    },
    deleteWorkout: function(workout) {
      axios.delete("/api/workouts/" + workout.id).then((this.distance = null));
    }
  }
};
</script>
