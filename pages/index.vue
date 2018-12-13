<template>
  <section class="page">
    <!-- Canvas -->
    <div id="main"></div>

    <div class="page__content">
      <h1 class="main-title" v-html="title"></h1>
      <h3 class="subtitle" v-html="subtitle"></h3>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import MainScene from "~/assets/js/scenes/mainScene";

export default {
  computed: {
    ...mapGetters({
      appLoaded: "isAppLoaded"
    })
  },

  data() {
    return {
      title: "Starter",
      subtitle: "Starter build with nuxt.js"
    };
  },

  mounted() {
    const mainScene = new MainScene();
  }
};
</script>

<style lang="stylus" scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events : none;

  #main {
    position: relative;
    z-index: 1;
    
  }

  &__content {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    text-align: center;

    .main-title {
      font-family: $baldinger-bold;
    }

    .subtitle {
      font-family: $baldinger;
      margin-top: 20px;
    }
  }
}
</style>
