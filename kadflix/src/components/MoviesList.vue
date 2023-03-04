<template>
  <div v-if="movies" class="container">
    <div>
      <slot></slot>
      <Pagination
        :currentPage="movies.page"
        :totalPages="movies.total_pages"
        @paginate="paginate"
      />
    </div>
    <ul class="movies">
      <MoviePreview
        v-for="movie in movies.results"
        :key="movie.id"
        :movie="movie"
      />
    </ul>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import MoviePreview from "@/components/MoviePreview.vue";
import useFetch from "@/composables/fetch";
import ratingsColor from "@/utils/ratingsColor.js";

export default {
  name: "MoviesList",
  components: {
    Pagination,
    MoviePreview,
  },
  props: ["fetchFilter"],

  data() {
    return {
      movies: null,
      currentPage: 1,
    };
  },

  watch: {
    currentPage() {
      this.fetchMovies();
      this.ratingsColor();
    },
  },

  created() {
    this.fetchMovies();
  },

  methods: {
    ratingsColor,
    async fetchMovies() {
      const data = await useFetch(
        "discover/movie?",
        `&page=${this.currentPage}&language=pt-BR&${this.fetchFilter}`
      );
      this.movies = data;
      this.ratingsColor();
    },

    paginate(page) {
      this.currentPage = page;
    },
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
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
