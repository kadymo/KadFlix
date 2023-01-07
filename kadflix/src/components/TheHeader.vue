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
    <a
      href="https://github.com/kadymosantana"
      class="github-corner"
      aria-label="View source on GitHub"
      ><svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="
          fill: #84e;
          color: #1d1d22;
          position: fixed;
          top: 0;
          border: 0;
          right: 0;
        "
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        ></path></svg></a>
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

    .github-corner svg {
      position: absolute !important;
    }
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

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
