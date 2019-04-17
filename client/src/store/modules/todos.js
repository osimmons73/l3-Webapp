import axios from "axios";

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async getItems({ commit }) {
    var response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.log(response.data);
    commit("setTodos", response.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos)
};

export default {
  state,
  getters,
  actions,
  mutations
};
