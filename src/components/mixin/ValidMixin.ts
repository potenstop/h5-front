import { Component, Vue } from 'vue-property-decorator'
import { JsonProtocol, ValidError, ValidUtil } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className ValidMixin
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/8/11 18:01
 */
@Component
export default class ValidMixin extends Vue {
  private messageWarn (msg: string) {
    this.$Message.warning(msg)
  }
  public validQuery<RouterQueryT> (bean: new () => RouterQueryT): RouterQueryT {
    const beanObj = JsonProtocol.jsonToBean(this.$route.query, bean) as any
    try {
      ValidUtil.validBean(beanObj)
      return beanObj
    } catch (e) {
      if (e instanceof ValidError) {
        this.messageWarn(e.message)
      } else {
        this.messageWarn(e.message)
      }
      return null
    }
  }
}
