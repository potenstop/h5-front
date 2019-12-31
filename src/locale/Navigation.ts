/**
 *
 * 功能描述:
 *
 * @className navigation
 * @projectName h5-front
 * @author yanshaowen
 * @date 2019/12/30 12:16
 */
import { LocaleMapper } from 'papio-h5'
import { LocaleLangConstant } from '@/common/constant/LocaleLangConstant'
const prefix = 'NAVIGATION_'
export class Navigation {
  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '首页' }])
  public static readonly HOME = prefix + 'HOME'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '分类' }])
  public static readonly TYPE = prefix + 'TYPE'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '我的' }])
  public static readonly MY = prefix + 'MY'
}
