<template>
  <div class="home">
    <!-- Title -->
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
        <h6 class="text-sm-right" v-bind="myUser">Hi {{myUser.firstName}}</h6>
        <h5 class="text-center">Please Select Locker Station</h5>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "./home/Navbar.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Station",
  components: { Navbar },
  computed: {
    ...mapGetters(["myUser"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style>
</style>
