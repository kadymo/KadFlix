<template>
  <div>
    <TheHeader />

    <main v-once>
      <MoviesList path="/movie/now_playing">
        <h1>Em cartaz</h1>
      </MoviesList>

      <MoviesList sortBy="popularity.desc">
        <h1>Mais populares</h1>
      </MoviesList>

      <MoviesList genres="28,878" sortBy="popularity.desc">
        <h1>Filmes de ação e ficção científica</h1>
      </MoviesList>

      <MoviesList genres="35" sortBy="popularity.desc">
        <h1>Filmes de comédia</h1>
      </MoviesList>

      <MoviesList genres="16,12" sortBy="vote_count.desc">
        <h1>Filmes de animação e aventura</h1>
      </MoviesList>

      <MoviesList genres="10751" sortBy="vote_count.desc">
        <h1>Para assistir com a família</h1>
      </MoviesList>

      <MoviesList genres="10749" sortBy="vote_count.desc">
        <h1>Filmes de romance</h1>
      </MoviesList>

      <MoviesList genres="18" sortBy="vote_count.desc">
        <h1>Filmes de drama</h1>
      </MoviesList>

      <MoviesList genres="10752" sortBy="vote_count.desc">
        <h1>Filmes de guerra</h1>
      </MoviesList>

      <MoviesList genres="80" sortBy="vote_count.desc">
        <h1>Filmes policiais</h1>
      </MoviesList>

      <MoviesList genres="27" sortBy="vote_count.desc">
        <h1>Filmes de terror</h1>
      </MoviesList>

      <MoviesList genres="53" sortBy="vote_count.desc">
        <h1>Filmes de suspense</h1>
      </MoviesList>

      <MoviesList genres="99" sortBy="vote_count.desc">
        <h1>Documentários</h1>
      </MoviesList>
    </main>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import MoviesList from "@/components/MoviesList.vue";

export default {
  name: "Home",
  components: {
    TheHeader,
    MoviesList,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

main {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 120px;
  @include responsive("medium") {
    gap: 100px;
  }
  @include responsive("small") {
    margin-top: 20px;
  }
}
</style>
