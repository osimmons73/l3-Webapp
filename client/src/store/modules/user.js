import axios from "axios";

const state = {
  user: {}
};

const getters = {
  allUser: state => state.user
};

const actions = {
  async getUserInfo({ commit }) {
    var response = await axios.get("/api/current_user");
    console.log(response.data);
    commit("setUser", response.data);
  }
};

const mutations = {
  setUser: (state, u) => (state.user = u)
};

export default {
  state,
  getters,
  actions,
  mutations
};
