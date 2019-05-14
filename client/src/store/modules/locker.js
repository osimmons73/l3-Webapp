import axios from "axios";
import LockerService from "../../services/LockerService";
const state = {
  lockers: []
};

const getters = {
  allLockers: state => state.lockers
};

const actions = {
  async getLockers({ commit }) {
    var data = await LockerService.getLocker();

    commit("setLockers", data);
  }
};

const mutations = {
  setLockers: (state, s) => {
    state.lockers = s;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
