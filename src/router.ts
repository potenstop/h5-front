import Vue from 'vue'
import Router from 'vue-router'
import ConfigRouter from '@/router/ConfigRouter'
import ProjectConfig from '@/config/ProjectConfig'
import ViewUI from 'view-design'
import store from './store'
import axios from 'axios'
import { CookiesUtil } from '@/common/util/CookiesUtil'
import { RouterUtil } from '@/common/util/RouterUtil'
const { homeName } = ProjectConfig
const messageVue = new Vue()
Vue.use(Router)
const LOGIN_PAGE_NAME = 'UserLogin'
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: ConfigRouter
})

router.beforeEach((to, from, next) => {
  // @ts-ignore
  ViewUI.LoadingBar.start()
  const token = CookiesUtil.getToken()
  if (!to.meta.hasLogin) {
    // 不需要登录就可以访问的页面
    next() // 跳转
  } else if (!token && to.meta.hasLogin) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    // @ts-ignore
    if (store.state.user.hasGetInfo) {
      next()
    } else {
      store.dispatch('user/getUserInfo').then(user => {
        next()
      }).catch(() => {
        CookiesUtil.setToken('')
        next({
          name: 'UserLogin'
        })
      })
    }
  }
})
router.afterEach(to => {
  RouterUtil.setTitle(to, router.app)
  // @ts-ignore
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

// http response 响应拦截器
axios.interceptors.response.use((response: any) => {
  if ('code' in response.data && response.data.code !== '0') {
    store.dispatch('app/addErrorLog', {
      type: 'http',
      code: response.data.code,
      mes: response.data.message,
      url: window.location.href
    })
  }
  return response
}, error => {
  store.dispatch('app/addErrorLog', {
    type: 'http',
    code: error.status,
    mes: error.message,
    url: window.location.href
  })
  if (error.response) {
    switch (error.response.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 401:
        CookiesUtil.setToken('')
        router.replace({
          path: '/login/user',
          query: { redirect: router.currentRoute.fullPath }
        })
    }
  }
  messageVue.$Message.error({ content: `url:${error.config.url} message: ${error.message} status: ${error.response.status}`, duration: 5 })
  // 返回接口返回的错误信息
  return Promise.reject(error)
})

export default router
