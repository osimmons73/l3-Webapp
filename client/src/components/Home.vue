<template>
  <div>
    <div class="user">
      <div v-bind="allUser">
        {{allUser.firstName}}
        {{allUser.lastName}}
        {{allUser.emailAddress}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  computed: mapGetters(["allUser"]),
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
