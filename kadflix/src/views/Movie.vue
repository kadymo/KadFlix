<template>
  <main
    :style="{
      backgroundImage: `linear-gradient(to bottom, transparent 0%, #1d1d22 60%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="container"
    v-if="movie"
  >
    <div class="movie_path">
      <img :src="api_images + 'w1280' + movie.poster_path" :alt="movie.title" />

      <div class="watch_providers" v-if="watchProviders && watchProviders.BR">
        <p>Onde assistir (Brasil)</p>
        <ul>
          <li
            :title="provider.provider_name"
            v-for="provider in watchProviders.BR?.flatrate"
            :key="provider.provider_id"
          >
            <img
              :src="api_images + 'w1280' + provider.logo_path"
              :alt="provider.provider_name"
            />
          </li>
        </ul>
      </div>

      <div class="average_container">
        <div class="average" :style="styleVoteAverage">
          <span class="average_value">{{ movie.vote_average.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <section class="movie_info">
      <div class="movie_title">
        <h1>{{ movie.title }}</h1>
        <span>Título original: {{ movie.original_title }}</span>
      </div>

      <div class="movie_buttons">
        <a :href="url_trailer + trailerMovie.key" v-if="trailerMovie">
          Assistir trailer
        </a>
        <FavoriteButton :movie="movie" />
      </div>

      <p class="overview">{{ movie.overview }}</p>

      <article class="movie_details">
        <h2>Detalhes</h2>

        <div class="detail_item">
          <p>Gêneros</p>
          <ul>
            <li v-for="genre in movie.genres" :key="genre.name">
              {{ genre.name | genreFilter }}
            </li>
          </ul>
        </div>

        <div class="detail_item">
          <p>Data de lançamento</p>
          <span>{{ movie.release_date | dateFilter("long") }}</span>
        </div>

        <div class="detail_item" v-if="movie.revenue">
          <p>Receita</p>
          <span>{{ movie.revenue | currencyFilter }}</span>
        </div>

        <div class="detail_item">
          <p>Duração</p>
          <span>{{ movie.runtime + " min" }}</span>
        </div>
      </article>

      <article class="movie_credits">
        <h2>Elenco</h2>

        <ul v-once class="credits">
          <router-link
            tag="li"
            :to="{ name: 'Actor', params: { actor_id: actor.id } }"
            class="actor"
            v-for="actor in movie.credits.cast"
            :key="actor.id"
          >
            <img
              :src="api_images + 'w342' + actor.profile_path"
              :alt="actor.name"
            />
            <div class="actor_details">
              <h3>{{ actor.name }}</h3>
              <span>{{ actor.character }}</span>
            </div>
          </router-link>
        </ul>
      </article>
    </section>
  </main>
</template>

<script>
import pageTitle from "@/utils/pageTitle.js";
import { dateFilter, genreFilter, currencyFilter } from "@/filters.js";
import { mapState } from "vuex";

export default {
  name: "Movie",

  components: {
    FavoriteButton: () => import("@/components/FavoriteButton.vue"),
  },

  filters: {
    dateFilter,
    genreFilter,
    currencyFilter,
  },

  props: ["movie_id"],

  data() {
    return {
      movie: null,
      videos: null,
      api_images: this.$store.state.api_images,
      watchProviders: null,
      url_trailer: "https://www.youtube.com/watch?v=",
    };
  },

  computed: {
    ...mapState(["baseURL", "api_key"]),
    styleVoteAverage() {
      const average = this.movie.vote_average;

      if (average >= 8) {
        return {
          background: `conic-gradient(#55a855 ${
            average * 10 * 3.6
          }deg, #2d2d35 0deg)`,
        };
      } else if (average >= 7 && average < 8) {
        return {
          background: `conic-gradient(#96a855 ${
            average * 10 * 3.6
          }deg, #2d2d35 0deg)`,
        };
      } else if (average >= 6 && average < 7) {
        return {
          background: `conic-gradient(#fcc040 ${
            average * 10 * 3.6
          }deg, #2d2d35 0deg)`,
        };
      } else {
        return {
          background: `conic-gradient(#c00505 ${
            average * 10 * 3.6
          }deg, #2d2d35 0deg)`,
        };
      }
    },

    trailerMovie() {
      if (this.videos) {
        return this.videos.find((v) => v.type === "Trailer");
      }
    },
  },

  created() {
    this.fetchMovieDetails();
    this.fetchMovieTrailer();
    this.fetchWatchProviders();
  },

  methods: {
    pageTitle,

    async fetchMovieDetails() {
      await fetch(
        `${this.baseURL}movie/${this.movie_id}?api_key=${this.api_key}&language=pt-BR&append_to_response=credits`
      )
        .then((r) => r.json())
        .then((r) => (this.movie = r));
      await this.pageTitle(this.movie.title);
    },

    fetchMovieTrailer() {
      fetch(
        `${this.baseURL}movie/${this.movie_id}/videos?api_key=${this.api_key}&lan=en-US`
      )
        .then((r) => r.json())
        .then((r) => {
          this.videos = r.results;
        });
    },

    fetchWatchProviders() {
      fetch(
        `${this.baseURL}movie/${this.movie_id}/watch/providers?api_key=${this.api_key}&language=en-US`
      )
        .then((r) => r.json())
        .then((r) => (this.watchProviders = r.results));
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

.container {
  @include containerDetails;
}

.movie_title {
  display: flex;
  flex-direction: column;
  gap: 5px;
  h1 {
    font-size: 2.2rem;
    font-weight: 650;
  }
}

.movie_path {
  position: relative;
  grid-column: 1;
  justify-self: center;
  margin-top: 400px;
  width: 300px;
  img {
    border-radius: 12px;
    box-shadow: 0px 4px 4px #18181d;
    @include responsive("medium") {
      padding: 0;
      width: 100%;
      margin: 0;
    }
  }
  .average_container {
    position: absolute;
    top: -20px;
    right: -20px;
    @include responsive("medium") {
      top: -20px;
      right: -40;
    }
  }
  .average {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    position: relative;
    border-radius: 50%;
    &::before {
      content: "";
      position: absolute;
      width: 55px;
      height: 55px;
      background: #1d1d22;
      border-radius: 50%;
    }
    .average_value {
      z-index: 2;
      font-size: 22px;
      font-weight: 500;
      color: #fff;
    }
  }
  .watch_providers {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    p {
      color: #ccc;
      border-bottom: 2px solid #2d2d35;
      padding-bottom: 10px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 15px;
    }
    img {
      width: 50px;
      border-radius: 10px;
    }
  }
}

.movie_buttons {
  display: flex;
  gap: 15px;
  a {
    display: inline-block;
    background: linear-gradient(to right, #5f33a1, #84e);
    font-size: 18px;
    font-weight: 400;
    text-decoration: none;
    color: #fff;
    border-radius: 25px;
    padding: 14px 28px;
    transition: 0.2s;
    &:hover {
      background: linear-gradient(to right, #84e, #5f33a1);
      transform: scale(1.1);
    }
  }
  .favorite {
    display: flex;
    align-items: center;
    border: 2px solid #fff;
    border-radius: 25px;
    padding: 10px;
    cursor: pointer;
  }
}

.movie_info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  grid-column: 2;
  max-width: 850px;
  font-weight: 400;
  color: #ccc;
  letter-spacing: -0.5px;
  margin-top: 400px;

  h1 {
    letter-spacing: -1px;
    line-height: 1.1;
    color: #fff;
  }

  h2 {
    font-weight: 600;
    color: #fff;
  }

  .overview {
    line-height: 1.4;
  }

  @include responsive("medium") {
    grid-column: 1;
    max-width: 100vw;
    font-weight: 300;
    margin-top: 0;
  }
  @include responsive("small") {
    letter-spacing: 0;
    h1 {
      font-size: 1.8rem;
      letter-spacing: -0.5px;
    }
  }
}

.movie_details {
  display: flex;
  flex-direction: column;
  .detail_item {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
    align-items: center;
    border-bottom: 2px solid #2d2d35;
    padding: 15px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      li {
        display: inline-block;
        background: #27272e;
        border: 2px solid #2d2d35;
        border-radius: 25px;
        padding: 4px 12px;
      }
    }
  }
}

.movie_credits {
  display: flex;
  flex-direction: column;
  max-width: 100%;

  .credits {
    @include scrollbar(0, 0);
    display: flex;
    overflow-x: auto;
    gap: 30px 15px;
    padding: 20px 0;
    margin-bottom: 10px;
    @media (max-width: 1100px) {
      width: 100vw;
    }
  }

  .actor {
    position: relative;
    min-width: 150px;
    max-width: 150px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      transform: scale(1.1);
      .actor_details {
        display: grid;
      }
    }

    img {
      border-radius: 12px;
      box-shadow: 0px 6px 4px #18181d;
    }

    .actor_details {
      display: none;
      grid-template-columns: 1fr auto;
      gap: 5px 10px;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      backdrop-filter: blur(30px);
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      padding: 10px;
      overflow: hidden;
      animation: show_details 0.3s forwards;

      span {
        font-size: 14px;
        color: #eee;
      }

      h3 {
        grid-column: 1 / -1;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.5px;
        color: #fff;
      }
    }
  }
  @include responsive("medium") {
    width: 100vw;
    .credits {
      width: 100vw;
      .actor {
        max-width: 140px;
      }
    }
  }
}
</style>
