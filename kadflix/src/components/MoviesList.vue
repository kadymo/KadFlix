<template>
  <div class="container">
    <slot></slot>

    <ul v-if="movies" class="movies">
      <MoviePreview
        v-for="movie in movies.results"
        :key="movie.id"
        :movie="movie"
      />
    </ul>
  </div>
</template>

<script>
import MoviePreview from "@/components/MoviePreview.vue";
import averageColor from "@/utils/averageColor.js";

export default {
  name: "MoviesList",
  components: {
    MoviePreview,
  },
  props: ["fetchFilter"],

  data() {
    return {
      movies: null,
    };
  },

  created() {
    this.fetchMovies();
  },
  
  methods: {
    async fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=37823c25fd81a1efa9124efeb53be3a8&language=pt-BR&${this.fetchFilter}`
      )
        .then((r) => r.json())
        .then((r) => (this.movies = r));
      await this.averageColor();
    },
    averageColor,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

.container {
  padding-left: 30px;
  @include responsive("small") {
    padding-left: 20px;
  }
}

h1 {
  @include title;
  margin-bottom: 15px;
}

.movies {
  @include scrollbar(20px, 20px);
  display: flex;
  overflow-x: auto;
  gap: 30px 15px;
  padding: 20px 20px 20px 0;
  @include responsive("small") {
    width: 100vw;
  }
}
</style>
