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
    <div class="container mt-3">
      <div class="row">
        <div class="card-deck" style="width:800px; margin:0 auto;">
          <div
            class="card mb-4"
            style="min-width: 18rem; max-width: 18rem;width:800px; margin:0 auto;"
            v-for="locker in allLockers"
            :key="locker._id"
          >
            <router-link
              @click.native="selectLocker(locker._id,$event)"
              style="height:8em;"
              class="btn btn-primary"
              role="button"
              aria-pressed="true"
              to="/payment"
            >Click to Select Locker</router-link>
            <div class="card-body">
              <h5 class="card-title">{{locker.LockerName}}</h5>
              <p class="card-text">Station ID: {{locker.StationId}}</p>
              <p class="card-text">In Use: {{locker.IsUsed}}</p>
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
import LockerService from "../services/LockerService.js";
import Navbar from "./home/Navbar.vue";
import Title from "./home/Title.vue";
export default {
  name: "home",
  components: { Navbar },
  computed: {
    ...mapGetters(["allLockers", "myUser"])
  },
  methods: {
    ...mapActions(["getLockers", "setMyLocker"]),
    selectLocker: async function(lockerId, event) {
      // `this` inside methods points to the Vue instance
      console.log("seting my locker from component");

      await this.setMyLocker(lockerId);
    }
  },
  created() {
    this.getLockers();
  }
};
</script>

<style>
</style>
