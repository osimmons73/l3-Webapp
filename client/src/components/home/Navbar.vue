<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <router-link class="navbar-brand" to="/">L3 Services</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link role="button" :to="{ name: 'home'}">Home</router-link>
        </li>
        <router-link role="button" :to="{ name: 'selectSchool'}">Select Locker</router-link>
        <li class="nav-item">
          <router-link role="button" :to="{ name: 'inUse'}">My Lockers</router-link>
        </li>
        <li class="nav-item" v-if="myUser._id">
          <a class="nav-link" href="/api/logout">Sign Out</a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link" href="/auth/google">Sign In with Google</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
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
