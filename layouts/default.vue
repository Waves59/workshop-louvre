<template>
  <div>
    <the-header :test="counter" @call="increment"></the-header>
    <button @click="increment">+</button>
    <nuxt/>
    <footer/>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader";
console.log(TheHeader);
export default {
  components: {
    TheHeader
  },
  methods: {
    increment(){
      console.log('clicked')
      this.counter++
    }
  },
  data() {
    return {
      counter: 0,
      msg: "coucou"
    };
  }
};
</script>