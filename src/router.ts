import Vue from 'vue'
import Router from 'vue-router'
import ConfigRouter from '@/router/ConfigRouter'
import ProjectConfig from '@/config/ProjectConfig'
import store from './store'
import axios from 'axios'
const { homeName } = ProjectConfig

Vue.use(Router)
const LOGIN_PAGE_NAME = 'UserLogin'
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: ConfigRouter
})

export default router
