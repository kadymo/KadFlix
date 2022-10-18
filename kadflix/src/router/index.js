import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import Favorites from "@/views/Favorites.vue";
import Movie from "@/views/Movie.vue";
import Actor from "@/views/Actor.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home
    },
    {
      path: "/movie",
      redirect: "/"
    },
    {
      path: "/actor",
      redirect: "/"
    },
    {
      name: "Favorites",
      path: "/favorites",
      component: Favorites
    },
    {
      name: "Movie",
      path: "/movie/:movie_id",
      component: Movie,
      props: true
    },
    {
      name: "Actor",
      path: "/actor/:actor_id",
      component: Actor,
      props: true
    }
  ]
});
