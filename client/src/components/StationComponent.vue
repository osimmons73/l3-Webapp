<template>
  <div>
    <!-- Title -->
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
        <Title/>
        <h6 class="text-sm-right" v-bind="myUser">Hi {{myUser.firstName}}</h6>
        <h5 class="text-center">Please Select Locker Station</h5>
      </div>
    </section>
    <div class="container mt-3">
      <div class="row">
        <div class="card-deck" style="width:800px; margin:0 auto;">
          <div
            class="card mb-4"
            style="min-width: 18rem; max-width: 18rem;width:800px; margin:0 auto;"
            v-for="station in allStations"
            :key="station._id"
          >
            <router-link
              @click.native="selectStation(station._id,$event)"
              style="height:8em;"
              class="btn btn-primary"
              role="button"
              aria-pressed="true"
              to="/locker"
            >Click to Select Station</router-link>
            <div class="card-body">
              <h5 class="card-title">{{station.Name}}</h5>
              <p class="card-text">Station ID: {{station._id}}</p>
              <p class="card-text">School ID: {{station.AtSchoolId}}</p>
              <p class="card-text">
                <small class="text-muted">Powered By L3</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserService from "../services/UserService.js";
import StationService from "../services/StationService.js";
import Navbar from "./home/Navbar.vue";
import Title from "./home/Title.vue";
export default {
  name: "home",
  components: { Navbar },
  computed: {
    ...mapGetters(["allStations", "myUser"])
  },
  methods: {
    ...mapActions(["getStations", "setMyStation"]),
    selectStation: async function(stationId, event) {
      // `this` inside methods points to the Vue instance
      console.log("seting my station from component");

      await this.setMyStation(this.myUser._id, stationId);
    }
  },
  created() {
    this.getStations();
  }
};
</script>

<style>
</style>
