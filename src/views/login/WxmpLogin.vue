<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StringUtil } from 'papio-h5'
import { StoreConstant } from '@/common/constant/StoreConstant'
import { namespace } from 'vuex-class'

const userModule = namespace(StoreConstant.USER)

@Component
export default class WxmpLogin extends Vue {
  @userModule.Action handleWxmpLogin
  @userModule.Action getUserInfo
  private name = 'WxmpLogin'
  private async created () {
    const query = this.$route.query as any
    if (StringUtil.isBank(query.userId)) {
      this.$Message.error('链接错误')
      return
    }
    console.log(query.userId, 222)
    // 按userId进行
    await this.handleWxmpLogin({ userId: query.userId })
    await this.getUserInfo()
    // 跳转页面
    if (StringUtil.isBank(query.callbackUrl)) {
      await this.$router.push({
        path: '/'
      })
    } else {
      await this.$router.push({
        path: query.callbackUrl
      })
    }
  }
}
</script>

<style scoped>

</style>
