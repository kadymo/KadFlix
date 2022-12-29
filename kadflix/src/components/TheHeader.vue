<template>
  <header class="header-container">
    <router-link class="logo" to="/">
      <span>K</span>ad<span>F</span>lix
    </router-link>

    <div class="input-container">
      <input
        type="text"
        placeholder="Pesquisar filmes"
        v-model="searched_movie"
      />
      <SearchSugestions />
    </div>

    <router-link class="favorite" to="/favorites">
      <svg width="24px" height="24px" viewBox="0 0 24 24">
        <path
          fill=""
          d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
        ></path>
      </svg>
      <span>Favoritos</span>
    </router-link>

    <a class="tmdb" href="https://www.themoviedb.org/">
      <img src="../assets/tmdb.svg" alt="TBMB" />
    </a>
  </header>
</template>

<script>
import SearchSugestions from "@/components/SearchSugestions.vue";

export default {
  name: "TheHeader",

  components: {
    SearchSugestions,
  },

  computed: {
    searched_movie: {
      get() {
        return "";
      },
      set(value) {
        this.$store.dispatch("fetchSearchedMovies", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  align-items: center;
  gap: 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: #1d1d22;
  opacity: 0.99;
  width: 100vw;
  border-bottom: 0.5px solid #3a3a3a;
  padding: 20px 30px;

  .logo {
    grid-row: 1;
    user-select: none;
    font-size: 2.1rem;
    font-weight: 300;
    color: #fff;
    span {
      color: #84e;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 2fr auto;
    align-items: center;
    gap: 15px;
    position: relative;
    min-width: 100vw;
    padding: 20px;
  }
}

.input-container {
  position: relative;
  input {
    width: 100%;
    background: #27272e;
    letter-spacing: -0.5px;
    color: #9696a1;
    font-size: 1rem;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-radius: 25px;
    padding: 8px 16px;
    outline: none;
    caret-color: #84e;
    &:focus {
      border: 2px solid #84e;
    }
  }
  @media (max-width: 600px) {
    grid-column: 1;
    grid-row: 2;
    width: 100%;
    input {
      width: 100%;
      font-size: 18px;
    }
  }
}

.favorite {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #27272e;
  letter-spacing: -0.5px;
  color: #9696a1;
  font-size: 1rem;
  border-radius: 25px;
  padding: 8px 16px;
  margin-left: -15px;

  svg {
    fill: transparent;
    stroke: #9696a1;
    stroke-width: 2px;
  }

  @media (max-width: 600px) {
    grid-column: 2;
    grid-row: 2;
    margin-left: 0;
  }
}

.tmdb {
  justify-self: end;
  padding-right: 60px;
  img {
    min-width: 180px;
  }
  @media (max-width: 600px) {
    grid-column: 2;
    grid-row: 1;
    padding-right: 0;
  }
}
</style>
