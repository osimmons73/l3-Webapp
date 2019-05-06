<template>
  <div>
    <!-- Title -->
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
        <h6 class="text-sm-right" v-bind="myUser">Hi {{myUser.firstName}}</h6>
        <h5 class="text-center">My Current Lockers</h5>
      </div>
    </section>
    <section>
      <div class="container mt-3">
        <div class="row">
          <div class="card-deck" style="width:800px; margin:0 auto;">
            <div
              class="card mb-4"
              style="min-width: 18rem; max-width: 18rem;width:800px; margin:0 auto;"
              v-for="locker in lockers"
              :key="locker._id"
            >
              <div class="schoolName">School Name: {{locker.SchoolId.Name}}</div>
              <div class="stationName">Station Name: {{locker.StationId.Name}}</div>
              <div class="lockerName">Locker Name: {{locker.LockerId.LockerName}}</div>
              <div class="lockerStatus">In Use: {{locker.LockerId.IsUsed}}</div>
              <div class="lockerStart">Expired at this time: {{new Date(locker.EndAt)}}</div>
              <div class="currentTime">Current Time is: {{new Date(datenow)}}</div>
              <div class="remainingTime">Time Remaining is: {{ momo(locker.EndAt)}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import UserService from "../../services/UserService.js";
import Navbar from "../home/Navbar.vue";
import moment from "moment";
export default {
  name: "InUseComponent",
  data() {
    return {
      lockers: [],
      datenow: ""
    };
  },
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(["myUser"])
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    time() {
      var self = this;
      this.datenow = moment().format();

      setInterval(self.time, 500);
    },
    momo: function(date) {
      var end = moment(date);
      var start = moment(this.datenow);
      var duration = moment.duration(end.diff(start));
      // return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      return duration.minutes();
    }
  },
  filters: {},
  mounted: function() {
    this.time();
  },
  async created() {
    await this.getUserInfo();
    this.lockers = await UserService.getMyStations(this.myUser._id);
  }
};
</script>

<style>
</style>
