// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
// @ts-ignore
import Vuetify from 'vuetify/lib'

// import { LocaleUtil } from 'papio-h5'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#e91e63',
        secondary: '#ffc107',
        accent: '#009688',
        error: '#ff5722',
        warning: '#ff9800',
        info: '#4caf50',
        success: '#03a9f4'
      }
    }
  }
}

export default new Vuetify(opts)
