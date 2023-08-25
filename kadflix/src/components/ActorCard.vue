<script>
export default {
  name: "ActorCard",
  props: {
    actor: { required: true },
  },
};
</script>

<template>
  <router-link
    :to="{ name: 'Actor', params: { actor_id: actor.id } }"
    tag="li"
    class="actor"
  >
    <img
      :src="$store.state.url_images + 'w342' + actor.profile_path"
      :alt="actor.name"
    />
    <div class="actor_details">
      <h3>{{ actor.name }}</h3>
      <span>{{ actor.character }}</span>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
@import "../scss/abstracts/_mixins.scss";

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

  @include responsive("medium") {
    max-width: 140px;
  }
}
</style>
