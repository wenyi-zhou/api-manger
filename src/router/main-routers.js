var routers = [
  {
    path: '',
    component: resolve => require(['../view/main.vue'], resolve)
  },
  {
    path: 'main',
    name: 'main',
    component: resolve => require(['../view/main.vue'], resolve)
  },
  // 用户管理
  {
    path: 'user',
    name: 'user',
    component: resolve => require(['../view/user/user-index.vue'], resolve)
  },
  // 课程管理
  {
    path: 'course',
    name: 'course',
    component: resolve => require(['../view/course/course-index.vue'], resolve)
  },
  {
    path: 'course/:id',
    name: 'course:id',
    component: resolve => require(['../view/course/course-info.vue'], resolve)
  },
  {
    path: 'course/:id/:lessonId',
    name: 'course:id:lessonId',
    component: resolve => require(['../view/course/lesson/lesson-info.vue'], resolve)
  },
  // 活动管理
  {
    path: 'activity',
    name: 'activity',
    component: resolve => require(['../view/activity/activity-index.vue'], resolve)
  },
  {
    path: 'activity/info/:id',
    name: 'activity:info:id',
    component: resolve => require(['../view/activity/activity-info.vue'], resolve)
  },
  {
    path: 'activity/edit/:id',
    name: 'activity:edit:id',
    component: resolve => require(['../view/activity/activity-edit.vue'], resolve)
  },
  // 订单管理
  {
    path: 'order',
    redirect: '/order/course'
  },
  {
    path: 'order/course',
    name: 'order:course',
    component: resolve => require(['../view/order/order-course.vue'], resolve)
  },
  {
    path: 'order/activity',
    name: 'order:activity',
    component: resolve => require(['../view/order/order-activity.vue'], resolve)
  },
  // 资讯管理
  {
    path: 'news',
    redirect: '/news/list'
  },
  {
    path: 'news/list',
    name: 'news:list',
    component: resolve => require(['../view/news/news-list.vue'], resolve)
  },
  {
    path: 'news/info/:id',
    name: 'news:info:id',
    component: resolve => require(['../view/news/news-info.vue'], resolve)
  },
  {
    path: 'news/edit/:id',
    name: 'news:edit:id',
    component: resolve => require(['../view/news/news-edit.vue'], resolve)
  },
  {
    path: 'news/type',
    name: 'news:type',
    component: resolve => require(['../view/news/news-type.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routers
