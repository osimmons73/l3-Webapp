import axios from "axios";
import AuthService from "../../AuthService";
import UserService from "../../services/UserService";
const state = {
  user: {
    _id: "",
    googleId: "",
    firstName: "",
    lastName: "",
    emailAddress: ""
  },
  load_status: "NotLoading"
};

const getters = {
  myUser: state => state.user,
  loadStatus: state => state.load_status
};

const actions = {
  async getUserInfo({ commit }) {
    commit("isLoading", "IsLoading");
    var response = await axios.get("/api/current_user");

    commit("setUser", response.data);
    commit("notLoading", "NotLoading");
  }
};

const mutations = {
  setUser: (state, u) => {
    state.user._id = u._id;
    state.user.googleId = u.googleId;
    state.user.firstName = u.firstName;
    state.user.lastName = u.lastName;
    state.user.emailAddress = u.emailAddress;
  },
  isLoading: (state, l) => (state.load_status = l),
  notLoading: (state, l) => (state.load_status = l)
};

export default {
  state,
  getters,
  actions,
  mutations
};
