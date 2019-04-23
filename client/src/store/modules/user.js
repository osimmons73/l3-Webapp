import axios from "axios";
import AuthService from "../../AuthService";
import UserService from "../../services/UserService";
const state = {
  user: {
    _id: "",
    googleId: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    assignedStation: "",
    assignedLocker: ""
  },
  load_status: "NotLoading"
};

const getters = {
  myUser: state => state.user,
  myStation: state => state.user.assignedStation,
  loadStatus: state => state.load_status
};

const actions = {
  async getUserInfo({ commit }) {
    commit("isLoading", "IsLoading");
    var response = await axios.get("api/current_user");
    console.log("from store", response.data);
    commit("setUser", response.data);
    try {
      var responseStation = await UserService.getMyStation({
        userId: state.user._id
      });
    } catch (error) {
      console.error(error);
    }

    commit("settingStation", responseStation);
    commit("notLoading", "NotLoading");
  },
  async getMyStation({ commit }) {
    commit("isLoading", "IsLoading");
    var responseStation = await UserService.getMyStation(state.user._id);
    //console.log(`My station data: ${response}`);
    commit("settingStation", responseStation);
    commit("notLoading", "NotLoading");
  },
  async setMyStation({ commit }, stationId) {
    commit("isLoading", "IsLoading");
    console.log("loading to set station");
    console.log(state.user.assignedStation);
    if (state.user.assignedStation.length == 0) {
      try {
        console.log("in try block");
        var response = await UserService.insertMyUserStation(
          state.user._id,
          stationId
        );
      } catch (error) {
        throw console.error(error);
      }
      console.log("commiting station");
      commit("settingStation", stationId);
    }
    commit("notLoading", "NotLoading");
  },
  async getMyLocker({ commit }, lockerId) {
    commit("isLoading", "IsLoading");
    var responseLocker = await UserService.getMyLocker(state.user._id);
    commit("settingLocker", responseLocker);
    commit("notLoading", "NotLoading");
  },
  async setMyLocker({ commit }, lockerId) {
    if (state.user.assignedLocker.length == 0) {
      var response = await UserService.insertMyUserLocker(
        state.user._id,
        lockerId
      );
      commit("settingLocker", lockerId);
    }
  }
};

const mutations = {
  setUser: (state, u) => {
    console.log("setUser", u);
    state.user._id = u._id;
    state.user.googleId = u.googleId;
    state.user.firstName = u.firstName;
    state.user.lastName = u.lastName;
    state.user.emailAddress = u.emailAddress;
  },
  settingStation: (state, s) => {
    state.user.assignedStation = s;
  },
  settingLocker: (state, l) => {
    state.user.assignedLocker = l;
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
