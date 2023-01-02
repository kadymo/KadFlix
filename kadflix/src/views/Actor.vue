<template>
  <main
    v-if="actor"
    class="container"
    :style="{
      backgroundImage: `linear-gradient(to bottom, transparent 0%, #1d1d22 60%), url('https://image.tmdb.org/t/p/original${actor.profile_path}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="actor_path">
      <img
        :src="api_images + 'original/' + actor.profile_path"
        :alt="actor.name"
      />
    </div>

    <section class="actor_info">
      <h1>{{ actor.name }}</h1>

      <article v-if="actor.biography" class="biography">
        <h2>Biografia</h2>
        <p>{{ actor.biography }}</p>
      </article>

      <article class="actor_personal_infos">
        <h2>Informações pessoais</h2>

        <div class="info_item">
          <p>Data de nascimento</p>
          <span>{{ actor.birthday | dateFilter("long") }}</span>
        </div>

        <div class="info_item">
          <p>Naturalidade</p>
          <span>{{ actor.place_of_birth }}</span>
        </div>
      </article>

      <article class="actor_movies">
        <h2>Filmes</h2>
        <ul v-once v-if="actor.movie_credits.cast" class="movies">
          <MoviePreview
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
import MoviePreview from "@/components/MoviePreview.vue";
import pageTitle from "@/utils/pageTitle.js";
import averageColor from "@/utils/averageColor.js";
import { dateFilter } from "@/filters.js";

export default {
  name: "Actor",
  components: {
    MoviePreview,
  },

  filters: {
    dateFilter,
  },

  props: ["actor_id"],

  data() {
    return {
      actor: null,
      api_images: this.$store.state.api_images,
    };
  },

  methods: {
    averageColor,
    pageTitle,

    async fetchActor() {
      await fetch(
        `https://api.themoviedb.org/3/person/${this.actor_id}?api_key=37823c25fd81a1efa9124efeb53be3a8&language=pt-BR&append_to_response=movie_credits`
      )
        .then((r) => r.json())
        .then((r) => (this.actor = r));
      await this.averageColor();
      await this.pageTitle(this.actor.name);
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
  @include containerDetails;
}

.actor_path {
  position: relative;
  grid-column: 1;
  justify-self: center;
  margin-top: 400px;
  width: 100%;
  img {
    max-width: 250px;
    border-radius: 12px;
    box-shadow: 0px 4px 4px #18181d;
    @include responsive("medium") {
      padding: 0;
      width: 100%;
      max-width: max-content;
      margin: 0;
    }
  }
}

.actor_info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  grid-column: 2;
  max-width: 700px;
  font-weight: 400;
  color: #ccc;
  letter-spacing: -0.5px;
  margin-top: 400px;

  h1 {
    font-size: 2.2rem;
    letter-spacing: -1px;
    line-height: 1.1;
    color: #fff;
  }

  h2 {
    font-weight: 600;
    color: #fff;
  }

  .biography {
    line-height: 1.4;

    h2 {
      margin-bottom: 10px;
    }
  }

  @include responsive("medium") {
    grid-column: 1;
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

.actor_personal_infos {
  display: flex;
  flex-direction: column;
  .info_item {
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
