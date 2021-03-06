import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhHans from 'vuetify/src/locale/zh-Hans'
import { LocaleUtil } from 'papio-h5'
import { NavigationLocale } from '@/locale/NavigationLocale'
import { PageShowLocale } from '@/locale/PageShowLocale'
import { TitleLocale } from '@/locale/TitleLocale'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = navLang === 'zh-CN' || navLang === 'en-US' ? navLang : false
let lang = 'zh-CN'

Vue.config.lang = lang
console.log('lang', lang)
const messages = { 'zh-CN': zhHans }
LocaleUtil.getJsonByClass(NavigationLocale, messages)
LocaleUtil.getJsonByClass(PageShowLocale, messages)
LocaleUtil.getJsonByClass(TitleLocale, messages)
// vue-i18n 6.x+写法
Vue.locale = () => {}
const i18n = new VueI18n({
  locale: lang,
  messages
})
export default i18n
