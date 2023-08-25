<template>
  <main
    v-if="movie"
    :style="{
      backgroundImage: `linear-gradient(to bottom, transparent 0%, #1d1d22 60%), url('${$store.state.url_images}original${movie.backdrop_path}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="container"
  >
    <div class="movie_poster">
      <img
        :src="$store.state.url_images + 'w1280' + movie.poster_path"
        :alt="movie.title"
      />

      <div class="watch_providers" v-if="watchProviders && watchProviders.BR">
        <p>Onde assistir (Brasil)</p>
        <ul>
          <li
            v-for="provider in watchProviders.BR?.flatrate"
            :title="provider.provider_name"
            :key="provider.provider_id"
          >
            <img
              :src="$store.state.url_images + 'w1280' + provider.logo_path"
              :alt="provider.provider_name"
            />
          </li>
        </ul>
      </div>

      <div class="rating_container">
        <div class="rating" :style="styleRatingAverage">
          <span class="rating_value">{{ movie.vote_average.toFixed(1) }}</span>
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

      <ul class="movie_details">
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
      </ul>

      <div class="movie_credits">
        <h2>Elenco</h2>
        <ul v-once class="credits">
          <ActorCard
            v-for="actor in movie.credits.cast"
            :key="actor.id"
            :actor="actor"
          />
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
import pageTitle from "@/utils/pageTitle.js";
import ActorCard from "@/components/ActorCard.vue";
import FavoriteButton from "@/components/FavoriteButton.vue";
import useFetch from "@/composables/fetch";
import { dateFilter, genreFilter, currencyFilter } from "@/filters.js";

export default {
  name: "Movie",

  components: {
    ActorCard,
    FavoriteButton,
  },

  filters: {
    dateFilter,
    genreFilter,
    currencyFilter,
  },

  props: {
    movie_id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      movie: null,
      videos: null,
      watchProviders: null,
      url_trailer: "https://www.youtube.com/watch?v=",
    };
  },

  computed: {
    styleRatingAverage() {
      const ratingAverage = this.movie.vote_average;

      if (ratingAverage >= 8) {
        return {
          background: `conic-gradient(#55a855 ${
            ratingAverage * 10 * 3.6
          }deg, #2d2d35 0deg)`,
        };
      } else if (ratingAverage >= 7 && ratingAverage < 8) {
        return {
          background: `conic-gradient(#96a855 ${
            ratingAverage * 10 * 3.6
          }deg, #2d2d35 0deg)`,
        };
      } else if (ratingAverage >= 6 && ratingAverage < 7) {
        return {
          background: `conic-gradient(#fcc040 ${
            ratingAverage * 10 * 3.6
          }deg, #2d2d35 0deg)`,
        };
      } else {
        return {
          background: `conic-gradient(#c00505 ${
            ratingAverage * 10 * 3.6
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
      const data = await useFetch({
        path: `/movie/${this.movie_id}`,
        query: {
          language: "pt-BR",
          append_to_response: "credits",
        },
      });

      this.movie = data;
      this.pageTitle(this.movie.title);
    },

    async fetchMovieTrailer() {
      const data = await useFetch({
        path: `/movie/${this.movie_id}/videos`,
        query: { language: "en-US" },
      });

      this.videos = data.results;
    },

    async fetchWatchProviders() {
      const data = await useFetch({
        path: `/movie/${this.movie_id}/watch/providers`,
        query: { language: "en-US" },
      });

      this.watchProviders = data.results;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

.container {
  @include grid_container;
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

.movie_poster {
  @include photo_column;
  .rating_container {
    position: absolute;
    top: -20px;
    right: -20px;
    @include responsive("medium") {
      top: -20px;
      right: -40;
    }
  }
  .rating {
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
    .rating_value {
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
  @include info_column;

  .overview {
    line-height: 1.4;
  }
}

.movie_details {
  @include grid_details;
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

  @include responsive("medium") {
    width: 100vw;
    .credits {
      width: 100vw;
    }
  }
}
</style>
