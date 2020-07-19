<template>
  <div id="app">
    <HomePage/>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomePage from 'components/HomePage'

  import 'bootstrap';
  export default {
    name: 'App',
    components: {
      HomePage
    },
    data() {
      return {

      }
    }
  }
</script>

<style>
  @import 'bootstrap/dist/css/bootstrap.min.css';
  @import "assets/css/icon-font.css";
</style>
