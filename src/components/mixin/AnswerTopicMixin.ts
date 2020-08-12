/**
 *
 * 功能描述:
 *
 * @className AnswerTopicMixin
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/8/11 15:08
 */
import { Vue, Component } from 'vue-property-decorator'
import { LocalForageUtil } from '@/common/util/LocalForageUtil'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseApi } from '@/dao/api/CourseApi'
import moment from 'moment'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import { CollectionUtils } from 'papio-h5'

const courseApi = new CourseApi()
@Component
export default class AnswerTopicMixin extends Vue {
  private async getContentTopicCacheData (albumCourseProblemId: number) {
    // 获取本地的
    const historyCacheDataList = await LocalForageUtil.getPrefixItem('albumCourseProblemHistory' + albumCourseProblemId) as any[]
    let historyCacheData = null
    if (CollectionUtils.isNotEmpty(historyCacheDataList)) {
      historyCacheData = historyCacheDataList[0]
    }
    let remote: any = null
    // 获取远程的
    try {
      const result = await courseApi.albumCourseProblemTopicList(albumCourseProblemId)
      const albumCourseProblemTopicResponseList = ApiUtil.getData(result)
      // 找出最大的时间
      let maxTime = null
      let data = {}
      albumCourseProblemTopicResponseList.forEach(item => {
        data[item.getContentId()] = item.getInputSelectOption()
        const current = moment(item.getUpdateTime()).format('x')
        if (!maxTime) {
          maxTime = current
        } else if (current > maxTime) {
          maxTime = current
        }
      })
      remote = {}
      remote.date = maxTime
      remote.data = data
    } catch (e) {
      this.$Message.warning('获取远程数据失败')
    }
    if (historyCacheData && !remote) {
      return historyCacheData.data
    } else if (!historyCacheData && remote) {
      return remote.data
    } else if (remote && historyCacheData) {
      if (historyCacheData.date <= remote.date) {
        return remote.data
      } else {
        return historyCacheData.data
      }
    } else {
      return {}
    }
  }

  public async getTopicListAndAnswerValue (albumCourseProblemId: number, albumId: number): Promise<ContentTopicAnswerListItemFrontResponse[]> {
    const contentTopicCacheData = await this.getContentTopicCacheData(albumCourseProblemId)
    // 获取试卷的总的题目
    const dataList = ApiUtil.getData(await courseApi.contentTopicByAlbumId(albumId))
    // 设置已答的题目
    dataList.forEach((item, j) => {
      if (item.getContentId() in contentTopicCacheData) {
        item.setChooseValue(contentTopicCacheData[item.getContentId()])
      }
    })
    return dataList
  }
}
