import Vue from 'vue'
import VueResource from 'vue-resource'
import Config from './config.js'

Vue.use(VueResource)

Vue.http.options.root = Config.BaseUrl
Vue.http.options.credentials = false
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  // 请求发送前的处理逻辑
  next((response) => {
    // 请求发送后的处理逻辑

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
    return Vue.http.post('user/lists', params)
  },
  course_list: function (params) {
    return Vue.http.post('course/lists', params)
  },
  course_info: function (params) {
    return Vue.http.post('course/detail', params)
  }
}
