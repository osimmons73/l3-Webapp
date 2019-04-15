<template>
  <div class="home">
    <!-- Title -->
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "./home/Navbar.vue";

export default {
  name: "station",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
