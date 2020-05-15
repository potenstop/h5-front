import Vue from 'vue'
import Router from 'vue-router'
import ConfigRouter from '@/router/ConfigRouter'
import ProjectConfig from '@/config/ProjectConfig'
import ViewUI from 'view-design'
import store from './store'
import { CookiesUtil } from '@/common/util/CookiesUtil'
import { RouterUtil } from '@/common/util/RouterUtil'

const { homeName } = ProjectConfig

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

export default router
