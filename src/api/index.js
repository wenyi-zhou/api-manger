import Vue from 'vue'
import VueResource from 'vue-resource'
import Config from './config.js'

Vue.use(VueResource)

Vue.http.options.credentials = false
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  // 请求发送前的处理逻辑
  next((response) => {
    // 请求发送后的处理逻辑
    // Vue.prototype.$notify.error({
    //   title: response.data.code,
    //   message: response.data.msg
    // })
    if (response.ok && response.data.code === 200) {
      // 成功
      response.data = response.data.data
    } else {
      // 失败
      Vue.prototype.$notify.error({
        title: '错误:' + response.data.code,
        message: response.data
      })
    }
    return response
  })
})

export default {
  requestLocal: function (path, params, callback) {
    Vue.http.options.root = ''
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    Vue.http.get(path, params).then(
      (response) => {
        callback(response.data)
      },
      (response) => {
        callback(undefined, response.status)
      }
    )
  },

  startRequest: function (path, params, callback) {
    Vue.http.options.root = Config.BaseUrl
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    Vue.http.post(path, params).then(
      (response) => {
        callback(response.data)
      },
      (response) => {
        callback(undefined, response.status)
      }
    )
  },
  // 用户管理
  user_register: function (params, callback) {
    this.startRequest('user/lists', params, callback)
  },
  // 课程管理
  course_list: function (params, callback) {
    this.startRequest('course/lists', params, callback)
  },
  course_info: function (params, callback) {
    this.startRequest('course/detail', params, callback)
  },
  course_info_lesson_list: function (params, callback) {
    this.startRequest('course/listLesson', params, callback)
  },
  course_info_lesson_info: function (params, callback) {
    this.startRequest('course/lessonDetail', params, callback)
  },
  course_info_commentList: function (params, callback) {
    this.startRequest('comment/listCourseComment', params, callback)
  },
  lesson_info: function (params, callback) {
    this.startRequest('course/lessonDetail', params, callback)
  },
  course_lesson_video_list: function (params, callback) {
    this.startRequest('video/lists', params, callback)
  },
  // 其它
  delete_comment: function (params, callback) {
    // 删除评论
    this.startRequest('comment/deleteComment', params, callback)
  }
}
