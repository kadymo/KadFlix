<template>
  <ul v-if="searched_movies.results?.length" class="movies">
    <router-link
      v-for="movie in searched_movies.results"
      :to="{ name: 'Movie', params: { movie_id: movie.id } }"
      :key="movie.id"
      tag="li"
      class="movie"
    >
      <img :src="$store.state.url_images + 'w300' + movie.poster_path" alt="" />

      <div>
        <h4>{{ movie.title }}</h4>
        <span>{{ movie.release_date | dateFilter("short") }}</span>
      </div>
    </router-link>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { dateFilter } from "@/filters.js";

export default {
  name: "SearchSugestions",
  computed: {
    ...mapState(["searched_movies"]),
  },
  filters: {
    dateFilter,
  },
};
</script>

<style scoped lang="scss">
.movies {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 50px;
  width: 100%;
  max-height: 350px;
  background: #27272e;
  box-shadow: 0px 2px 2px #1d1d22;
  border-radius: 12px;
  padding-top: 20px;
  overflow: scroll;
  &::-webkit-scrollbar-track {
    margin-top: 20px;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #84e, #5f33a1);
    border-radius: 50px;
  }
  @media (max-width: 600px) {
    width: 100vw;
  }
}

.movie {
  display: flex;
  gap: 10px;
  padding: 10px 10px 5px 20px;

  cursor: pointer;
  &:hover {
    background: #1d1d22;
  }

  img {
    width: 40px;
    border-radius: 6px;
    box-shadow: 0px 4px 2px #17171b;
  }

  h4 {
    font-weight: 500;
    letter-spacing: -0.5px;
    color: #fff;
  }

  span {
    font-size: 14px;
    color: #aaa;
  }
}
</style>
