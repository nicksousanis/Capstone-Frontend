import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Profile from "../views/Profile.vue";
import Forum from "../views/Forum.vue";
import Races from "../views/Races.vue";
import Workouts from "../views/Workouts.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/races",
    name: "races",
    component: Races
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/forums",
    name: "forums",
    component: Forum
  },
  {
    path: "/workouts",
    name: "workouts",
    component: Workouts
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
