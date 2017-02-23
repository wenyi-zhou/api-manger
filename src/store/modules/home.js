import Vue from 'vue'
import API from '../../api'

export default {
  state: {
    breadcrumb_data: [],
    menu_list: []
  },

  mutations: {
    MENU_LIST_GET_SUCCESS: (state, menuData) => {
      Vue.set(state, 'menu_list', menuData)
    },
    BREADCRUMB_DATA_UPDATE: (state, {data}) => {
      Vue.set(state, 'breadcrumb_data', data)
    }
  },

  actions: {
    enumListInit ({ commit }) {
      API.requestLocal('static/menu-list.json', (data) => {
        commit('MENU_LIST_GET_SUCCESS', data)
      })
    }
  }
}
