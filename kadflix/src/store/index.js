import Vue from "vue";
import Vuex from "vuex";
import useFetch from "@/composables/fetch";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: "",
    searched_movies: "",
    searched_movie: "",
    favorite_movies: [],
    url_images: "https://image.tmdb.org/t/p/",
  },

  mutations: {
    GET_SEARCHED_MOVIES(state, movies) {
      state.searched_movies = movies;
    },

    FAVORITE_MOVIE(state, movie) {
      state.favorite_movies.push(movie);
    },

    DISFAVOR_MOVIE(state, movie) {
      const index = state.favorite_movies.indexOf(movie);
      const movieObject = {
        index: index,
      };
      movieObject.index === -1 ? (movieObject.index = 0) : null;
      state.favorite_movies.splice(movieObject.index, 1);
    },

    UPDATE_LS(state, payload) {
      state.favorite_movies = payload;
    },
  },

  actions: {
    async fetchSearchedMovies(context, movie) {
      const data = await useFetch({
        path: "/search/movie",
        query: {
          language: "pt-BR",
          query: movie,
        },
      });
      context.commit("GET_SEARCHED_MOVIES", data);
    },
  },
});
