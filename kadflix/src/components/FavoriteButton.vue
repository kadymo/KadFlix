<template>
  <span
    @click.prevent="isFavorited ? DISFAVOR_MOVIE(movie) : FAVORITE_MOVIE(movie)"
    :title="titleFavoriteButton"
    class="favorite"
  >
    <svg
      :style="styleFavoriteButton"
      width="26px"
      height="26px"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="Favorite">
          <stop offset="5%" stop-color="#84e" />
          <stop offset="95%" stop-color="#5f33a1" />
        </linearGradient>
      </defs>
      <path
        d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
      ></path>
    </svg>
  </span>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "FavoriteButton",
  props: ["movie"],

  data() {
    return {
      favorite_movies: this.$store.state.favorite_movies,
    };
  },

  computed: {
    isFavorited() {
      return this.favorite_movies.some(({ id }) => id === this.movie.id);
    },

    titleFavoriteButton() {
      return this.isFavorited
        ? "Remover dos favoritos"
        : "Adicionar aos favoritos";
    },

    styleFavoriteButton() {
      if (this.isFavorited) {
        return {
          fill: "url(#Favorite)",
          stroke: "url(#Favorite)",
          strokeWidth: "2px",
          transition: ".2s",
        };
      } else {
        return {
          fill: "transparent",
          stroke: "#fff",
          strokeWidth: "2px",
        };
      }
    },
  },
  methods: {
    ...mapMutations(["FAVORITE_MOVIE", "DISFAVOR_MOVIE"]),
  },
};
</script>
