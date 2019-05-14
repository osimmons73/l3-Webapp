<template>
  <div class="container">
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
      </div>
    </section>
    <h1>Latest Lockers here</h1>
    <!-- CREATE SCHOOL HERE -->
    <a @click="$router.go(-1)">
      <p class="text">Back to Stations</p>
    </a>

    <router-link :to="{ name: 'adminStation'}"></router-link>
    <div class="create-school">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Locker Name" v-model="name"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="resetName">Clear Name Field</v-btn>
              </v-flex>
              <v-flex xs6>
                Locker Name:
                {{name}}
              </v-flex>
            </v-layout>
            <v-flex xs12>
              <v-btn @click="insertLocker">Add Locker</v-btn>
            </v-flex>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
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
        <div>
          <div>{{`${locker.CreatedAt.getMonth()}/${locker.CreatedAt.getDate()}/${locker.CreatedAt.getFullYear()}`}}</div>
          <div style="  text-align: right;">
            <i v-on:click="deleteLocker(locker._id)" class="fas fa-trash-alt"></i>
          </div>
        </div>
        <p class="text">{{locker.LockerName}}</p>
        <p class="text">Is in use: {{locker.IsUsed}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LockerService from "../../services/LockerService.js";
import Navbar from "../home/Navbar.vue";

export default {
  name: "LockerComponent",
  props: ["Id"],
  components: { Navbar },

  data() {
    return {
      lockers: [],
      error: "",
      name: "",
      id: "abc"
    };
  },
  methods: {
    resetName() {
      this.name = "";
    },
    async insertLocker() {
      if (this.name == "") {
        this.error = "Name field Cannot be empty, smh yo!";
      } else {
        await LockerService.insertLocker(this.id, this.name);
        this.name = "";
        this.lockers = await LockerService.getLockersByStationId(this.id);
      }
    },
    async deleteLocker(id) {
      try {
        await LockerService.deleteLocker(id);
        this.lockers = await LockerService.getLockersByStationId(this.id);
      } catch (err) {
        this.error = err.message;
      }
    }
  },
  async created() {
    this.id = this.$route.params.id;
    try {
      this.lockers = await LockerService.getLockersByStationId(this.id);
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.school {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.Created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
#title {
  background-color: #5bd658;
}
</style>
