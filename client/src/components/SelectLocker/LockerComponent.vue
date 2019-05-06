<template>
  <div>
    <!-- Title -->
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
        <Title/>
        <h6 class="text-sm-right" v-bind="myUser">Hi {{myUser.firstName}}</h6>
        <h5 class="text-center">Please Select Locker</h5>
      </div>
    </section>
    <h1>Latest Lockers here</h1>
    <!-- CREATE SCHOOL HERE -->
    <a @click="$router.go(-1)">
      <p class="text">Back to Stations</p>
    </a>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="school-container">
      <div
        class="school"
        v-for="(locker,index) in lockers"
        v-bind:item="locker"
        v-bind:index="index"
        v-bind:key="locker._id"
      >
        <div v-on:click="selectLocker(locker._id)">
          <div class="available" v-if="!locker.IsUsed">
            <router-link to="/">
              <p class="text">{{locker.LockerName}}</p>
              <p class="text">Is in use: {{locker.IsUsed}}</p>
              <p class="text">Detailed info : {{locker}}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserService from "../../services/UserService.js";
import LockerService from "../../services/LockerService.js";
import Navbar from "../home/Navbar.vue";
import Title from "../home/Title.vue";
export default {
  name: "home",
  data() {
    return {
      lockers: [],
      error: "",
      name: "",
      schoolId: "",
      stationId: ""
    };
  },
  components: { Navbar },
  computed: {
    ...mapGetters(["myUser"])
  },
  methods: {
    // ...mapActions(["getLockers", "setMyLocker"]),
    selectLocker: async function(lockerId) {
      UserService.insertMyUserLocker(
        this.myUser._id,
        this.schoolId,
        this.stationId,
        lockerId
      );
      await LockerService.activateLocker(lockerId);
      this.lockers = await LockerService.getLockersByStationId(this.stationId);
    }
  },
  async created() {
    this.schoolId = this.$route.params.schoolId;
    this.stationId = this.$route.params.stationId;
    console.log("school: ", this.schoolId);
    console.log("station: ", this.stationId);
    console.log("user: ", this.myUser._id);
    try {
      await UserService.updateLockersStatus(this.myUser._id, this.stationId);
      this.lockers = await LockerService.getLockersByStationId(this.stationId);
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<style>
</style>
