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
  {
    path: '/user/teacher',
    name: 'user:teacher',
    component: resolve => require(['../view/user/teacher-index.vue'], resolve)
  },
  {
    path: '/user/organization',
    name: 'user:organization',
    component: resolve => require(['../view/user/organization-index.vue'], resolve)
  },
  {
    path: '/user/student',
    name: 'user:student',
    component: resolve => require(['../view/user/student-index.vue'], resolve)
  }
]

export default routers
