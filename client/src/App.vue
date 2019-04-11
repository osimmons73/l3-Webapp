<template>
  <div id="app">
    <HomeComponent/>
  </div>
</template>

<script>
//import UserComponent from "./components/UserComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";

export default {
  name: "app",
  components: {
    HomeComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
