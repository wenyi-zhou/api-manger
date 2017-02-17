import Vue from 'vue'
import VueResource from 'vue-resource'
import Config from './config.js'

Vue.use(VueResource)

Vue.http.options.root = Config.BaseUrl
// Vue.http.options.credentials = false
Vue.http.interceptors.push((request, next) => {
  // const auth = store.state.account.auth;
  // if (auth.check()) {
  //   const accessToken = auth.jwt_token.access_token;
  //   Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  // } else {
  //   delete Vue.http.headers.common.Authorization;
  // }
  // // continue to next interceptor
  next()
})

export default {
  // User
  user_register: function (params) {
    params = {}
    params.credentials = false
    return Vue.http.get('topics', params)
  }
}
