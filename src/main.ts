import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import i18n from '@/plugins/i18n'
// import message from '@/plugins/message'
import { Message } from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueScroller from 'vue-scroller'

// @ts-ignore
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(VueScroller)

Vue.config.productionTip = false
Vue.prototype.axios = axios

if (process.env.NODE_ENV !== 'production') {
  // require('@/mock/UserMock')
  // require('@/mock/CourseMock')
}
Vue.prototype.$Message = Message
new Vue({
  router,
  store,
  i18n,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
