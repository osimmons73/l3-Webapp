<template>
  <div class="container">
    <h1 class>Latest User</h1>
    <hr class>
    <p class="error" v-if="error">{{error}}</p>
    <div class="user-container">
      <div class="user" v-if="user" v-bind="user">
        <div>{{user}}</div>
        <div>
          <a href="api/logout">Sign out</a>
        </div>
      </div>
      <div class="user" v-else>
        <a href="/auth/google" class="google-signin">Google Sign in</a>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../AuthService";
export default {
  name: "UserComponent",
  data() {
    return {
      user: "",
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.user = await UserService.getUser();
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

div.post {
  position: relative;
  border: 1px solid #5bd685;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
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
