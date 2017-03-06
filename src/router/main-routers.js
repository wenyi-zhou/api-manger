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
  {
    path: 'user/:type/:id',
    name: 'user/:type:id',
    component: resolve => require(['../view/user/user-info.vue'], resolve)
  },
  // 课程管理
  {
    path: 'course',
    redirect: '/course/list'
  },
  {
    path: 'course/list',
    name: 'course:list',
    component: resolve => require(['../view/course/course-list.vue'], resolve)
  },
  {
    path: 'course/list/:id',
    component: resolve => require(['../view/course/course-info.vue'], resolve)
  },
  {
    path: 'course/list/:courseId/:lessonId',
    component: resolve => require(['../view/course/lesson/lesson-info.vue'], resolve)
  },
  {
    path: 'course/setting',
    component: resolve => require(['../view/course/lesson/lesson-info.vue'], resolve)
  },
  // 活动管理
  {
    path: 'activity',
    redirect: '/activity/list'
  },
  {
    path: 'activity/list',
    name: 'activity:list',
    component: resolve => require(['../view/activity/activity-list.vue'], resolve)
  },
  {
    path: 'activity/type',
    name: 'activity:type',
    component: resolve => require(['../view/activity/activity-type.vue'], resolve)
  },
  {
    path: 'activity/list/info/:id',
    name: 'activity:list:info:id',
    component: resolve => require(['../view/activity/activity-info.vue'], resolve)
  },
  {
    path: 'activity/list/edit/:id',
    name: 'activity:list:edit:id',
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
  // 系统设置
  {
    path: 'system',
    redirect: '/system/admin'
  },
  {
    path: 'system/admin',
    name: 'system:admin',
    component: resolve => require(['../view/system/admin-list.vue'], resolve)
  },
  {
    path: 'system/role',
    name: 'system:role',
    component: resolve => require(['../view/system/role-list.vue'], resolve)
  },
  {
    path: 'system/permission',
    name: 'system:permission',
    component: resolve => require(['../view/system/permission-list.vue'], resolve)
    // },
    // {
    //   path: '*',
    //   redirect: '/'
  }
]

export default routers
