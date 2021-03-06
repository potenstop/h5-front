/**
 *
 * 功能描述:
 *
 * @className ConfigRouter
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 17:07
 */
import MainOverall from '@/components/overall/MainOverall.vue'
import BlankOverall from '@/components/overall/BlankOverall.vue'
import AnswerOverall from '@/components/overall/AnswerOverall.vue'

/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hasLogin: 是否需要登录
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export default [
  {
    path: '/',
    name: 'Home',
    redirect: '/home/default'
  },
  {
    path: '/home',
    name: 'Home',
    component: MainOverall,
    children: [
      {
        path: 'default',
        name: 'DefaultHome',
        meta: {
          title: '{{ TITLE_HOME }}',
          hasLogin: true
        },
        component: () => import('@/views/home/DefaultHome.vue')
      }
    ]
  },
  {
    path: '/course',
    name: 'Course',
    component: BlankOverall,
    children: [
      {
        path: 'change',
        name: 'ChangeCourse',
        meta: {
          hasLogin: true
        },
        component: () => import('@/views/course/ChangeCourse.vue')
      }
    ]
  },
  {
    path: '/type',
    name: 'Type',
    component: BlankOverall,
    children: [
      {
        path: 'project',
        name: 'ProjectType',
        meta: {
          hasLogin: false
        },
        component: () => import('@/views/type/ProjectType.vue')
      }
    ]
  },
  {
    path: '/answer',
    name: 'Answer',
    component: BlankOverall,
    children: [
      {
        path: 'course',
        name: 'CourseAnswer',
        meta: {
          title: '{{TITLE_ALBUM_DETAIL}}',
          hasLogin: true
        },
        component: () => import('@/views/answer/CourseAnswer.vue')
      },
      {
        path: 'report',
        name: 'ReportAnswer',
        meta: {
          title: '{{TITLE_REPORT_ANSWER}}',
          hasLogin: true
        },
        component: () => import('@/views/answer/ReportAnswer.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: BlankOverall,
    children: [
      {
        path: 'wxmp',
        name: 'WxmpLogin',
        meta: {
          title: '{{TITLE_WXMP_LOGIN}}',
          hasLogin: false
        },
        component: () => import('@/views/login/WxmpLogin.vue')
      },
      {
        path: 'user',
        name: 'UserLogin',
        meta: {
          title: '{{TITLE_USER_LOGIN}}',
          hasLogin: false
        },
        component: () => import('@/views/login/UserLogin.vue')
      }
    ]
  },
  {
    path: '/album',
    name: 'Album',
    component: BlankOverall,
    children: [
      {
        path: 'answer/history',
        name: 'AnswerHistoryAlbum',
        meta: {
          title: '{{TITLE_ANSWER_HISTORY_ALBUM}}',
          hasLogin: false
        },
        component: () => import('@/views/album/AnswerHistoryAlbum.vue')
      }, {
        path: 'answer/old-exam',
        name: 'AnswerOldExamAlbum',
        meta: {
          title: '{{TITLE_ANSWER_OLD_EXAM_ALBUM}}',
          hasLogin: false
        },
        component: () => import('@/views/album/AnswerOldExamAlbum.vue')
      }
    ]
  }
]
