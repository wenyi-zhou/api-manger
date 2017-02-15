// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./vendors/bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css')
require('./styles/css/wy-md.css')
require('./styles/css/app.css')

import Vue from 'vue'

import App from './App.vue'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // （缩写）相当于 routes: routes
  template: '<App/>',
  components: { App }
})

// require('./vendors/bower_components/jquery/dist/jquery.min.js')
// require('./vendors/bower_components/bootstrap/dist/js/bootstrap.min.js')
