import Vue from 'vue'
import Router from 'vue-router'
import MainRouters from './main-routers'

Vue.use(Router)

export default new Router({
  routes: MainRouters,
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
