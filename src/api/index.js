import Vue from 'vue'
import VueResource from 'vue-resource'
import Config from './config.js'

Vue.use(VueResource)

Vue.http.options.root = Config.BaseUrl
Vue.http.options.credentials = false
Vue.http.interceptors.push((request, next) => {
  // const auth = store.state.account.auth;
  // if (auth.check()) {
  //   const accessToken = auth.jwt_token.access_token;
  //   Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  // } else {
  //   delete Vue.http.headers.common.Authorization;
  // }
  // // continue to next interceptor
  // 请求发送前的处理逻辑
  next((response) => {
    // 请求发送后的处理逻辑

    // Vue.prototype.$notify.error({
    //   title: '数据获取错误' + response.data.code,
    //   message: '这是一条错误的提示消息'
    // })
    if (response.ok) {
      // 成功
      response.data = response.data.data
    } else {
      // 失败
      Vue.prototype.$notify.error({
        title: '数据获取错误' + response.data.code,
        message: response.data.msg
      })
    }
    return response
  })
})

export default {
  // User
  user_register: function (params) {
    var option = {}
    option.params = params
    return Vue.http.post('user/lists', option)
  }
}
