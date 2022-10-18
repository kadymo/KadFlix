<template>
  <div>
    <TheHeader />

    <section>
      <h1>Filmes favoritos</h1>
      <transition-group
        tag="ul"
        name="list"
        v-if="favorite_movies.length"
        class="movies"
      >
        <MoviePreview
          v-for="movie in favorite_movies"
          :key="movie.id"
          :movie="movie"
        />
      </transition-group>

      <p v-else>Você não adicionou nenhum filme aos favoritos.</p>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TheHeader from "@/components/TheHeader.vue";
import MoviePreview from "@/components/MoviePreview.vue";
import { pageTitle } from "@/helpers.js";

export default {
  name: "Favorites",
  components: {
    TheHeader,
    MoviePreview,
  },
  data() {
    return {
      favoriteMovies: this.favorite_movies,
    };
  },

  computed: {
    ...mapState(["favorite_movies"]),
  },

  created() {
    this.pageTitle("Filmes favoritos");
  },

  methods: {
    pageTitle,
    ...mapMutations(["UPDATE_LS"]),
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

section {
  padding-left: 30px;
  margin-top: 100px;
  @include responsive("small") {
    padding-left: 20px;
    margin-top: 20px;
  }
  p {
    font-size: 18px;
    color: #ccc;
  }
}

h1 {
  @include title;
  margin-bottom: 30px;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  @include responsive("small") {
    @include scrollbar(20px, 20px);
    flex-wrap: nowrap;
    gap: 30px 15px;
    width: 100vw;
    overflow-x: auto;
    padding: 20px 20px 20px 0;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>