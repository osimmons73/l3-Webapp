<template>
  <div>
    <div class="todos">
      <div v-for="todo in allTodos" v-bind:key="todo.id">{{todo.title}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  computed: mapGetters(["allTodos"]),
  methods: {
    ...mapActions(["getItems"])
  },
  created() {
    this.getItems();
  }
};
</script>

<style>
</style>
