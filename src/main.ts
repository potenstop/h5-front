import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import i18n from '@/plugins/i18n'

Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  i18n,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
