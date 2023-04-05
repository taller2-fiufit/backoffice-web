import { createStore } from 'vuex'
import { auth } from "./auth.module";

const store = createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit('setUser', user);
    },
    setToken(context, token) {
      context.commit('setToken', token);
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  modules: {
    auth,
  }
})

export default store
