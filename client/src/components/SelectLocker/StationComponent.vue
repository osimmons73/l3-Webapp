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
    <h1>Latest Stations here</h1>
    <a @click="$router.go(-1)">
      <p class="text">Back to Schools</p>
    </a>

    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="school-container">
      <div
        class="school"
        v-for="(station,index) in stations"
        v-bind:item="station"
        v-bind:index="index"
        v-bind:key="station._id"
      >
        <router-link :to="{ name: 'selectLocker', params: { stationId: station._id, schoolId:id }}">
          <p class="text">{{station.Name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StationService from "../../services/StationService.js";
import Navbar from "../home/Navbar.vue";
import Title from "../home/Title.vue";
export default {
  name: "home",
  components: { Navbar },
  data() {
    return {
      stations: [],
      error: "",
      name: "",
      id: "abc"
    };
  },
  computed: {
    ...mapGetters(["myUser"])
  },
  async created() {
    this.id = this.$route.params.id;
    try {
      this.stations = await StationService.getStationById(this.id);
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<style>
</style>
