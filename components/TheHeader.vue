<template>
  <div id="header" ref="header" v-if="offsetHeight < 200">
    <ul>
      <li>{{ test }}</li>
      <li @click="event">Cooucou</li>
      <li>Cooucou</li>
      <li>Cooucou</li>
      <li>Cooucou</li>
      <li>Cooucou</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      offsetHeight: 0
    };
  },
  methods: {
    event() {
      this.$emit("call");
    }
  },
  mounted() {
    console.log(this.$refs.header);
    this.$refs.header.addEventListener("scroll", () => {
      this.offsetHeight = this.$refs.header.offsetHeight;
    });
  },
  props: {
    test: {
      type: Number,
      required: true,
      validator: value => {
        return value = 0;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>