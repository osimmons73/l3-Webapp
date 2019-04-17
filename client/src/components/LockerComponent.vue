<template>
  <div>
    <NavBar/>
    <div>locker component here</div>
    <router-link to="/payment">confirm payment</router-link>
  </div>
</template>

<script>
import NavBar from "./home/Navbar.vue";
export default {
  name: "LockerComponent",
  components: { NavBar }
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
