// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-default/index.css'
import './styles/material-font/css/material-design-iconic-font.min.css'
import './styles/css/base.css'

import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'

import App from './App.vue'

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // （缩写）相当于 routes: routes
  template: '<App/>',
  components: { App }
})
