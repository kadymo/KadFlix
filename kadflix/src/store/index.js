import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: "",
    movies_search: "",
    movie_search: "",
    api_images: "https://image.tmdb.org/t/p/",
    favorite_movies: []
  },

  mutations: {
    CHANGE_MOVIES_SEARCH(state, payload) {
      state.movies_search = payload;
    },

    FAVORITE_MOVIE(state, payload) {
      state.favorite_movies.push(payload);
    },

    DISFAVOR_MOVIE(state, payload) {
      const index = state.favorite_movies.indexOf(payload);
      const movieObject = {
        index: index
      };
      movieObject.index === -1 ? (movieObject.index = 0) : null;
      state.favorite_movies.splice(movieObject.index, 1);
    },

    UPDATE_LS(state, payload) {
      state.favorite_movies = payload;
    }
  },

  actions: {
    fetchSearchMovies(context, payload) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=37823c25fd81a1efa9124efeb53be3a8&language=pt-BR&query=${payload}`
      )
        .then((r) => r.json())
        .then((r) => {
          context.commit("CHANGE_MOVIES_SEARCH", r);
        });
    }
  }
});
