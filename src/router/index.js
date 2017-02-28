import Vue from 'vue'
import Router from 'vue-router'
import MainRouters from './main-routers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { anyone: true }, // 任何人都可以访问
      component: resolve => require(['../view/login.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['../view/index.vue'], resolve),
      children: MainRouters
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
