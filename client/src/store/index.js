import Vuex from "vuex";
import Vue from "vue";
import user from "./modules/user";
import station from "./modules/station";
import locker from "./modules/locker";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    station,
    locker
  }
});
