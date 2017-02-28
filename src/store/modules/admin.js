import Vue from 'vue'

export default {
  state: {
    info: {}
  },

  mutations: {
    ADMIN_INFO: (state, infoData) => {
      Vue.set(state, 'info', infoData)
    }
  },

  actions: {
    setAdmin ({ commit }, infoData) {
      commit('ADMIN_INFO', infoData)
    }
  }
}
