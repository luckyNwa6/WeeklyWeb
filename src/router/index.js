/*
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/login', //登录
    name: 'login',
    component: () => import('../views/login/index.vue')
  },

  {
    path: '/home', //首页
    name: 'home',
    meta: { title: '首页' },
    redirect: '/index',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/index', //首页
        name: 'index',
        meta: { title: '首页' },
        component: () => import('../views/home/index/index.vue')
      },
      {
        path: '/weekly', //周报管理
        name: 'weekly',
        meta: { title: '周报管理' },
        component: () => import('../views/home/weekly/index.vue'),
        children: [
          {
            path: '/myWeekly',
            name: 'myWeekly',
            meta: { title: '我的周报' },
            component: () => import('../views/home/weekly/myWeekly.vue')
          },
          {
            path: '/allWeekly',
            name: 'allWeekly',
            meta: { title: '所有周报' },
            component: () => import('../views/home/weekly/allWeekly.vue')
          },
          {
            path: '/modifyMy',
            name: 'modifyMy',
            meta: { title: '修改' },
            component: () => import('../views/home/weekly/modifyMy.vue')
          },
          {
            path: '/addMy',
            name: 'addMy',
            meta: { title: '添加' },
            component: () => import('../views/home/weekly/addMy.vue')
          }
        ]
        // component: () => import('../views/home/user/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
