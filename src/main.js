// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-default/index.css'
import './assets/material-font/css/material-design-iconic-font.min.css'
import './assets/css/base.css'

import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'

import App from './App.vue'

sync(store, router)

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // （缩写）相当于 routes: routes
  store,
  template: '<App/>',
  components: { App }
})
