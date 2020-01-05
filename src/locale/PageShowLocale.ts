/**
 *
 * 功能描述:
 *
 * @className PageShowLocale
 * @projectName h5-front
 * @author yanshaowen
 * @date 2019/12/30 12:16
 */
import { LocaleMapper } from 'papio-h5'
import { LocaleLangConstant } from '@/common/constant/LocaleLangConstant'
const prefix = 'PAGE_SHOW_'
export class PageShowLocale {
  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '当前课程' }])
  public static readonly CURRENT_COURSE = prefix + 'CURRENT_COURSE'
}
