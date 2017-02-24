var routers = [
  {
    path: '/',
    name: 'main',
    component: resolve => require(['../view/index.vue'], resolve)
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['../view/index.vue'], resolve)
  },
  // 用户管理
  {
    path: '/user',
    name: 'user',
    component: resolve => require(['../view/user/user-index.vue'], resolve)
  },
  // 课程管理
  {
    path: '/course',
    name: 'course',
    component: resolve => require(['../view/course/course-index.vue'], resolve)
  },
  {
    path: '/course/:id',
    name: 'course:id',
    component: resolve => require(['../view/course/course-info.vue'], resolve)
  },
  {
    path: '/course/:id/:lessonId',
    name: 'course:id:lessonId',
    component: resolve => require(['../view/course/lesson/lesson-info.vue'], resolve)
  },
  // 活动管理
  {
    path: '/activity',
    name: 'activity',
    component: resolve => require(['../view/activity/activity-index.vue'], resolve)
  },
  {
    path: '/activity/:id',
    name: 'activity:id',
    component: resolve => require(['../view/activity/activity-info.vue'], resolve)
  },
  // 订单管理
  {
    path: '/order',
    redirect: '/order/course'
  },
  {
    path: '/order/course',
    name: 'order:course',
    component: resolve => require(['../view/order/order-course.vue'], resolve)
  },
  {
    path: '/order/activity',
    name: 'order:activity',
    component: resolve => require(['../view/order/order-activity.vue'], resolve)
  }
]

export default routers
