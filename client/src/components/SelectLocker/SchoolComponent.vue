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
    <section>
      <div class="container mt-3">
        <div class="row">
          <div class="card-deck" style="width:800px; margin:0 auto;">
            <div
              class="card mb-4"
              style="min-width: 18rem; max-width: 18rem;width:800px; margin:0 auto;"
              v-for="school in schools"
              :key="school._id"
            >
              <router-link
                style="height:8em;"
                class="btn btn-primary"
                role="button"
                aria-pressed="true"
                :to="{ name: 'selectStation', params: { id: school._id }}"
              >Click to Select School</router-link>
              <div class="card-body">
                <h5 class="card-title">{{school.Name}}</h5>
                <p class="card-text">
                  <small class="text-muted">Powered By L3</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import SchoolService from "../../services/SchoolService.js";
import { mapGetters, mapActions } from "vuex";
import Navbar from "../home/Navbar.vue";

export default {
  name: "SchoolComponent",
  components: { Navbar },
  computed: {
    ...mapGetters(["myUser"])
  },
  data() {
    return {
      schools: [],
      error: "",
      name: "",
      domain: ""
    };
  },
  methods: {},
  async created() {
    try {
      this.schools = await SchoolService.getSchools();
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<style>
</style>
