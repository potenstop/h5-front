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

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '答题历史' }])
  public static readonly ANSWER_HISTORY_ALBUM = prefix + 'ANSWER_HISTORY_ALBUM'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '题目详情' }])
  public static readonly ALBUM_DETAIL = prefix + 'ALBUM_DETAIL'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '真题模考' }])
  public static readonly ANSWER_OLD_EXAM_ALBUM = prefix + 'ANSWER_OLD_EXAM_ALBUM'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '选择题目' }])
  public static readonly SELECT_TOPIC_ANSWER = prefix + 'SELECT_TOPIC_ANSWER'

  @LocaleMapper([{ lang: LocaleLangConstant.ZH_CN, desc: '答题报告' }])
  public static readonly REPORT_ANSWER = prefix + 'REPORT_ANSWER'
}
