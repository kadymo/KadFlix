<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["favorite_movies"]),
  },

  created() {
    if (localStorage.favoriteMovies) {
      this.$store.commit("UPDATE_LS", JSON.parse(localStorage.favoriteMovies));
    }
  },

  watch: {
    favorite_movies() {
      localStorage.favoriteMovies = JSON.stringify(this.favorite_movies);
    },
  },
};
</script>

<style lang="scss">
@import "./scss/base/reset.scss";

body {
  max-width: 100vw;
  max-height: 100vh;
  font-family: "Inter", sans-serif;
  background: #1d1d22;
  @media (max-width: 500px) {
    width: 100vw;
    height: 100vh;
  }
}
</style>
