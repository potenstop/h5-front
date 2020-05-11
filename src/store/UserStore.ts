import Vuex from 'vuex'
import { UserApi } from '@/dao/api/UserApi'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CookiesUtil } from '@/common/util/CookiesUtil'
const userApi = new UserApi()

/**
 *
 * 功能描述:
 *
 * @className UserStore
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 10:31
 */
export default {
  namespaced: true,
  state: {
    nickname: '',
    userId: '',
    avatar: '',
    token: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar (state, avatar) {
      state.avatar = avatar
    },
    setUserId (state, id) {
      state.userId = id
    },
    setNickname (state, name) {
      state.nickname = name
    },
    setToken (state, token) {
      state.token = token
      CookiesUtil.setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadList (state, list) {
      state.messageReadList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id: msgId, content }) {
      state.messageContentStore[msgId] = content
    },
    moveMsg (state, { from, to, msg_id: msgId }) {
      const index = state[from].findIndex(_ => _.msg_id === msgId)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadCount: state => state.messageReadList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // wxmp登录
    async handleWxmpLogin ({ commit }, { userId }) {
      console.log('111', userId)
      const result = await userApi.byUserIdLogin(userId)
      const data = ApiUtil.getData(result)
      commit('setToken', data)
    },
    // 获取用户相关信息
    async getUserInfo ({ state, commit }) {
      const result = await userApi.userBasic()
      const data = ApiUtil.getData(result)
      commit('setAvatar', data.getAvatar())
      commit('setNickname', data.getNickname())
      commit('setUserId', data.getUserId())
      commit('setHasGetInfo', true)
      return data
    }
  }
}
