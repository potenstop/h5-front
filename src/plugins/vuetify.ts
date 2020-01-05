// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
// @ts-ignore
import Vuetify from 'vuetify/lib'

// import { LocaleUtil } from 'papio-h5'

Vue.use(Vuetify)

// Object.assign(zhHans, LocaleUtil.getJsonByDir('src/locale'))

const opts = {
  // icons: {
  //   iconfont: 'mdiSvg'
  // }
}

export default new Vuetify(opts)
