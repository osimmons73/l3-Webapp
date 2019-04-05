<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <UserComponent/>
    <a href="/auth/google" class="google-signin">Google Sign in</a>
  </div>
</template>

<script>
import UserComponent from "./components/UserComponent.vue";

export default {
  name: "app",
  components: {
    UserComponent
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
