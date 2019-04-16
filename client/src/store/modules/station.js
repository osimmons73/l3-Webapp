import axios from "axios";
import StationService from "../../services/StationService";
const state = {
  stations: []
};

const getters = {
  allStations: state => state.stations
};

const actions = {
  async getStations({ commit }) {
    var data = await StationService.getStation();
    console.log("quick check", data);
    commit("setStations", data);
  }
};

const mutations = {
  setStations: (state, s) => {
    state.stations = s;
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};
