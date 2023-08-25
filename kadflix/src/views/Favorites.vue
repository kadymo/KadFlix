<template>
  <div>
    <TheHeader />

    <main>
      <h1>Filmes favoritos</h1>
      <transition-group
        v-if="this.$store.state.favorite_movies.length"
        tag="ul"
        name="list"
        class="movies"
      >
        <MovieCard
          v-for="movie in this.$store.state.favorite_movies"
          :key="movie.id"
          :movie="movie"
        />
      </transition-group>

      <p v-else>Você não adicionou nenhum filme aos favoritos.</p>
    </main>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import MovieCard from "@/components/MovieCard.vue";
import pageTitle from "@/utils/pageTitle.js";

export default {
  name: "Favorites",
  components: {
    TheHeader,
    MovieCard,
  },

  created() {
    this.pageTitle("Filmes favoritos");
  },

  methods: {
    pageTitle,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

main {
  padding-left: 30px;
  margin-top: 120px;
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
