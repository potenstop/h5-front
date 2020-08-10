import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import i18n from '@/plugins/i18n'
// import message from '@/plugins/message'
import { Message } from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueScroller from 'vue-scroller'
import '../public/style.css'
import 'katex/dist/katex.min.css'
import SvgIcon from '@/components/icon/SvgIcon.vue' // svg组件
import router from './router'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(VueScroller)
// svg ---start
Vue.component('svg-icon', SvgIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./icons/svg', false, /\.svg$/)
requireAll(req)
// svg ---stop

// if (process.env.NODE_ENV !== 'production') {
// require('@/mock/UserMock')
// require('@/mock/CourseMock')
// }
Vue.prototype.$Message = Message
new Vue({
  router,
  store,
  i18n,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
