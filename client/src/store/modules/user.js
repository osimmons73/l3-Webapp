import axios from "axios";

const state = {
  user: {},
  load_status: "NotLoading"
};

const getters = {
  allUser: state => state.user,
  loadStatus: state => state.load_status
};

const actions = {
  async getUserInfo({ commit }) {
    commit("isLoading", "IsLoading");
    var response = await axios.get("/api/current_user");
    console.log(response.data);
    commit("setUser", response.data);
    commit("notLoading", "NotLoading");
  }
};

const mutations = {
  setUser: (state, u) => (state.user = u),
  isLoading: (state, l) => (state.load_status = l),
  notLoading: (state, l) => (state.load_status = l)
};

export default {
  state,
  getters,
  actions,
  mutations
};
