<template>
  <div v-if="movies" class="container">
    <div>
      <slot></slot>
      <Pagination
        @paginate="paginate"
        :currentPage="movies.page"
        :totalPages="movies.total_pages"
      />
    </div>
    <ul ref="movies" class="movies">
      <MovieCard
        v-for="movie in movies.results"
        :key="movie.id"
        :movie="movie"
      />
    </ul>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import MovieCard from "@/components/MovieCard.vue";
import useFetch from "@/composables/fetch";
import ratingsColor from "@/utils/ratingsColor.js";

export default {
  name: "MoviesList",
  components: {
    Pagination,
    MovieCard,
  },

  props: {
    path: { type: String, default: "/discover/movie", required: false },
    genres: { type: String, default: "", required: false },
    sortBy: { type: String, default: "", required: false },
  },

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
      const data = await useFetch({
        path: this.path,
        query: {
          page: this.currentPage,
          language: "pt-BR",
          with_genres: this.genres,
          sort_by: this.sortBy,
        },
      });
      this.movies = data;
      this.ratingsColor();
    },

    paginate(page) {
      this.currentPage = page;
      this.$refs.movies.scrollTo({ behavior: "smooth", left: 0 });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

.container {
  padding-left: 30px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @include responsive("medium") {
    padding-left: 20px;
    > div {
      display: initial;
      position: relative;
    }
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
