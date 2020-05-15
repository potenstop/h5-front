/**
 *
 * 功能描述:
 *
 * @className NavigationLocale
 * @projectName h5-front
 * @author yanshaowen
 * @date 2019/12/30 12:16
 */
import { LocaleMapper } from 'papio-h5'
import { LocaleLangConstant } from '@/common/constant/LocaleLangConstant'
const prefix = 'TITLE_'
export class TitleLocale {
  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '首页' }])
  public static readonly HOME = prefix + 'HOME'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '公众号登陆中...' }])
  public static readonly WXMP_LOGIN = prefix + 'WXMP_LOGIN'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '用户登录' }])
  public static readonly USER_LOGIN = prefix + 'USER_LOGIN'
}
