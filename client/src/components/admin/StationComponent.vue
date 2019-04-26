<template>
  <div class="container">
    <h1>Latest Stations here</h1>
    <a @click="$router.go(-1)">
      <p class="text">Back to Schools</p>
    </a>
    <!-- CREATE SCHOOL HERE -->
    <div class="create-school">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Station Name" v-model="name"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="resetName">Clear Name Field</v-btn>
              </v-flex>
              <v-flex xs6>
                Station Name:
                {{name}}
              </v-flex>
            </v-layout>
            <v-flex xs12>
              <v-btn @click="insertStation">Add Station</v-btn>
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
        v-for="(station,index) in stations"
        v-bind:item="station"
        v-bind:index="index"
        v-bind:key="station._id"
      >
        <div>
          <div>{{`${station.CreatedAt.getMonth()}/${station.CreatedAt.getDate()}/${station.CreatedAt.getFullYear()}`}}</div>
          <div style="  text-align: right;">
            <i v-on:click="deleteStation(station._id)" class="fas fa-trash-alt"></i>
          </div>
        </div>
        <router-link :to="{ name: 'adminLocker', params: { id: station._id }}">
          <p class="text">{{station.Name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import StationService from "../../services/StationService.js";
export default {
  name: "StayComponent",
  props: ["schoolId"],
  data() {
    return {
      stations: [],
      error: "",
      name: "",
      id: "abc"
    };
  },
  methods: {
    resetName() {
      this.name = "";
    },
    async insertStation() {
      if (this.name == "") {
        this.error = "Name  field Cannot be empty, smh yo!";
      } else {
        await StationService.insertStation(this.id, this.name);
        this.name = "";
        this.stations = await StationService.getStationById(this.id);
      }
    },
    async deleteStation(id) {
      try {
        await StationService.deleteStation(id);
        this.stations = await StationService.getStationById(this.id);
      } catch (err) {
        this.error = err.message;
      }
    }
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
</style>
