import Vue from 'vue'
import API from '../../api'

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    breadcrumb_data: [],
    menu_list: [],
    activity_menu: null
  },

  mutations: {
    MENU_LIST_GET_SUCCESS: (state, menuData) => {
      Vue.set(state, 'menu_list', menuData)
    },
    MENU_ACTIVITY_UPDATE: (state, {data}) => {
      Vue.set(state, 'activity_menu', data)
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
