/*
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import qs from 'qs'
import VueParticles from 'vue-particles'

import Global from './Global'
Vue.use(Global)

Vue.use(VueParticles)
Vue.prototype.$qs = qs
Vue.use(ElementUI)
Vue.config.productionTip = false

// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path === '/home' || to.path === '/index' || to.path === '/weekly') {
    const token = sessionStorage.getItem('token')

    if (token !== null) {
    //   console.log('全局前置守卫启动，token有值放行！')
      next()
    } else {
      Vue.prototype.notifyError('请先登录！')
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
