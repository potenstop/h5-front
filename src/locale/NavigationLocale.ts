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
const prefix = 'NAVIGATION_'
export class NavigationLocale {
  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '首页' }])
  public static readonly HOME = prefix + 'HOME'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '分类' }])
  public static readonly TYPE = prefix + 'TYPE'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '我的' }])
  public static readonly MY = prefix + 'MY'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '收藏' }])
  public static readonly COLLECT = prefix + 'COLLECT'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '菜单' }])
  public static readonly MENU = prefix + 'MENU'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '交卷' }])
  public static readonly POST = prefix + 'POST'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '分享' }])
  public static readonly SHARE = prefix + 'SHARE'
}
