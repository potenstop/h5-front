export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '考试通',
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'DefaultHome',
  /**
   * @description tokenKey
   */
  tokenKey: 'token',
  /**
   * @description token在Cookie中存储的天数，默认7天
   */
  cookieExpires: 7,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true
}
