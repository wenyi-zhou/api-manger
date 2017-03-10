// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-default/index.css'
import 'vueditor/dist/css/vueditor.min.css'
import './assets/font-awesome/css/font-awesome.min.css'
import './assets/css/base.css'

import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

import ElementUI from 'element-ui'
import Vueditor from 'vueditor'

// Vueditor config
let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', '|', 'insertOrderedList', 'insertUnorderedList', '|', 'switchView'
  ],
  fontName: [
    { val: '宋体, SimSun', abbr: '宋体' }, { val: '黑体, SimHei', abbr: '黑体' },
    { val: '楷体, SimKai', abbr: '楷体' }, { val: "微软雅黑, 'Microsoft YaHei'", abbr: '微软雅黑' }
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  lang: 'cn',
  mode: 'default',
  iframePath: '',
  fileuploadUrl: ''
}

import App from './App.vue'

sync(store, router)

Vue.use(ElementUI)
Vue.use(Vueditor, config)

if (window.sessionStorage.admin) {
  store.dispatch('setAdmin', JSON.parse(window.sessionStorage.admin))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.anyone)) {
    next()
  } else {
    if (store.state.admin.info.admin_id) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // （缩写）相当于 routes: routes
  store,
  template: '<App/>',
  components: { App }
})
