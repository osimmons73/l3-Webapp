<template>
  <div>
    <div class="user">{{myUser}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters(["myUser"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style>
</style>
