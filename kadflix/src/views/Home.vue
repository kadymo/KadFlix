<template>
  <div>
    <TheHeader />

    <main v-once>
      <MoviesList fetchFilter="sort_by=popularity.desc">
        <h1>Mais populares</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=28,878">
        <h1>Filmes de ação e ficção científica</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=35">
        <h1>Filmes de comédia</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=16,12&sort_by=vote_count.desc">
        <h1>Filmes de animação e aventura</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=10751&sort_by=vote_count.desc">
        <h1>Para assistir com a família</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=10749&sort_by=vote_count.desc">
        <h1>Filmes de romance</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=18&sort_by=vote_count.desc">
        <h1>Filmes de drama</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=10752&sort_by=vote_count.desc">
        <h1>Filmes de guerra</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=80">
        <h1>Filmes policiais</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=27">
        <h1>Filmes de terror</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=53&sort_by=vote_count.desc">
        <h1>Filmes de suspense</h1>
      </MoviesList>

      <MoviesList fetchFilter="with_genres=99&sort_by=vote_count.desc">
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
  gap: 20px;
  margin-top: 100px;
  @include responsive("small") {
    gap: 20px;
    margin-top: 20px;
  }
}
</style>
