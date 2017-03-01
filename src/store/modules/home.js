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
    BREADCRUMB_DATA_UPDATE: (state, breadcrumbs) => {
      Vue.set(state, 'breadcrumb_data', breadcrumbs)
    }
  },

  actions: {
    enumListInit ({ commit }) {
      API.requestLocal({ path: 'static/menu-list.json' }, (data) => {
        commit('MENU_LIST_GET_SUCCESS', data)
      })
    },
    updateBreadcrumb ({commit}, breadcrumbs) {
      commit('BREADCRUMB_DATA_UPDATE', breadcrumbs)
    }
  }
}
