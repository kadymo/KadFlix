<template>
  <main
    v-if="actor"
    class="container"
    :style="{
      backgroundImage: `linear-gradient(to bottom, transparent 0%, #1d1d22 60%), url('${$store.state.url_images}original${actor.profile_path}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="actor_photo">
      <img
        :src="$store.state.url_images + 'original/' + actor.profile_path"
        :alt="actor.name"
      />
    </div>

    <section class="actor_info">
      <h1>{{ actor.name }}</h1>

      <article v-if="actor.biography" class="biography">
        <h2>Biografia</h2>
        <p>{{ actor.biography }}</p>
      </article>

      <article class="actor_details">
        <h2>Informações pessoais</h2>

        <div class="detail_item">
          <p>Data de nascimento</p>
          <span>{{ actor.birthday | dateFilter("long") }}</span>
        </div>

        <div class="detail_item">
          <p>Naturalidade</p>
          <span>{{ actor.place_of_birth }}</span>
        </div>
      </article>

      <article class="actor_movies">
        <h2>Filmes</h2>
        <ul v-once class="movies">
          <MovieCard
            v-for="movie in actor.movie_credits.cast"
            :key="movie.id"
            :movie="movie"
          />
        </ul>
      </article>
    </section>
  </main>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import useFetch from "@/composables/fetch";
import pageTitle from "@/utils/pageTitle.js";
import ratingsColor from "@/utils/ratingsColor.js";
import { dateFilter } from "@/filters.js";

export default {
  name: "Actor",
  components: {
    MovieCard,
  },

  filters: {
    dateFilter,
  },

  props: ["actor_id"],

  data() {
    return {
      actor: null,
    };
  },

  methods: {
    ratingsColor,
    pageTitle,

    async fetchActor() {
      const data = await useFetch(
        `person/${this.actor_id}?`,
        "&language=pt-BR&append_to_response=movie_credits"
      );
      this.actor = data;
      this.ratingsColor();
      this.pageTitle(this.actor.name);
    },
  },

  created() {
    this.fetchActor();
  },
};
</script>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

.container {
  @include grid_container;
}

.actor_photo {
  @include photo_column;
}

.actor_info {
  @include info_column;

  h1 {
    font-size: 2.2rem;
  }

  .biography {
    line-height: 1.4;
    h2 {
      margin-bottom: 10px;
    }
  }
}

.actor_details {
  @include grid_details;
}

.actor_movies {
  .movies {
    @include scrollbar(0, 0);
    display: flex;
    overflow-x: auto;
    gap: 30px 15px;
    padding: 20px 0;
    margin-bottom: 10px;
    @include responsive("small") {
      width: 100vw;
    }
  }

  @include responsive("medium") {
    width: 100vw;
    .credits {
      width: 100vw;
      .actor {
        img {
          max-width: 140px;
        }
      }
    }
  }
}
</style>
