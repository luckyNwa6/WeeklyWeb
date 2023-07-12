export default {
  state: {
    user: '',
    token: ''
  },
  getters: {

    getUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    }
  },
  mutations: {

    setUser(state, data) {
      state.user = data
    },
    setToken(state, data) {
      state.token = data
    }
  },
  actions: {

    setUser({ commit }, data) {
      commit('setUser', data)
    },
    setToken({ commit }, data) {
      commit('setToken', data)
    }
  }
}
