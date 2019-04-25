<template>
  <div class="container">
    <h1>Latest Schools here</h1>
    <!-- CREATE SCHOOL HERE -->
    <div class="create-school">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="University Name" v-model="name"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="resetName">Clear Name Field</v-btn>
              </v-flex>
              <v-flex xs6>
                University Name:
                {{name}}
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Accepted Domains" v-model="domain"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="resetDomain">Clear Domain Field</v-btn>
              </v-flex>
              <v-flex xs6>
                Domains (e.g. @nova.edu):
                {{domain}}
              </v-flex>
            </v-layout>
            <v-flex xs12>
              <v-btn @click="insertSchool">Add School</v-btn>
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
        v-for="(school,index) in schools"
        v-bind:item="school"
        v-bind:index="index"
        v-bind:key="school._id"
      >
        <div>
          <div>{{`${school.CreatedAt.getMonth()}/${school.CreatedAt.getDate()}/${school.CreatedAt.getFullYear()}`}}</div>
          <div style="  text-align: right;">
            <i v-on:click="deleteSchool(school._id)" class="fas fa-trash-alt"></i>
          </div>
        </div>

        <p class="text">{{school.Name}}</p>
        <p class="text">Accepted Email Domains: {{school.EmailDomain}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolService from "../../services/SchoolService.js";
export default {
  name: "SchoolComponent",
  data() {
    return {
      schools: [],
      error: "",
      name: "",
      domain: ""
    };
  },
  methods: {
    resetName() {
      this.name = "";
    },
    resetDomain() {
      this.domain = "";
    },
    async insertSchool() {
      if (this.name == "" || this.domain == "") {
        this.error = "Name and Domain Field Cannot be empty, smh!";
      } else {
        await SchoolService.insertSchool(this.name, this.domain);
        this.name = "";
        this.domain = "";
        this.schools = await SchoolService.getSchools();
      }
    },
    async deleteSchool(id) {
      try {
        await SchoolService.deleteSchool(id);
        this.schools = await SchoolService.getSchools();
      } catch (err) {
        this.error = err.message;
      }
    }
  },
  async created() {
    try {
      this.schools = await SchoolService.getSchools();
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
