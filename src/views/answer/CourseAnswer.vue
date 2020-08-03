<template>
  <div class="main-div">
    <swiper ref="swiper" :options="swiperOptions" class="main-div">
      <swiper-slide v-for="(item, i) in dataList" :key="i">
        <content-topic-item
          :data="item"
          :topic-index="i"
          :topic-total="dataList.length"
          @on-next-topic="nextTopic(i)"
          @on-change-choose="changeChoose(i)"
        ></content-topic-item>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseApi } from '@/dao/api/CourseApi'
import { JSHelperUtil, StringUtil } from 'papio-h5'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ContentTopicItem from '@/components/topic/ContentTopicItem.vue'
import { AlbumCourseProblemAddRequest } from '@/request/AlbumCourseProblemAddRequest'
import { LocalForageUtil } from '@/common/util/LocalForageUtil'
import 'swiper/css/swiper.css'
import { CollectionUtils } from 'papio-h5/lib/util/CollectionUtils'
import moment from 'moment'
import { AlbumCourseProblemUpdateRequest } from '@/request/AlbumCourseProblemUpdateRequest'
import { ProblemContentTopicRequest } from '@/request/ProblemContentTopicRequest'

const courseApi = new CourseApi()
@Component({
  components: {
    ContentTopicItem,
    Swiper,
    SwiperSlide
  }
})
export default class CourseAnswer extends Vue {
  @Ref() readonly swiper!: any
  private name = 'CourseAnswer'
  private dataList: ContentTopicAnswerListItemFrontResponse[] = []
  private albumId: number = null
  private albumCourseProblemId: number = null
  private swiperOptions = {
    pagination: {
    }
  }
  private asyncRemoteData: AlbumCourseProblemUpdateRequest = null
  private async created () {
    const query = this.$route.query as any
    this.albumId = query.albumId
    this.albumCourseProblemId = query.albumCourseProblemId
    if (JSHelperUtil.isNotNull(this.albumId)) {
      if (isNaN(+this.albumId)) {
        this.$Message.warning('链接错误')
        return
      }
      this.albumId = +this.albumId
    } else {
      this.$Message.warning('链接错误')
      return
    }

    if (JSHelperUtil.isNotNull(this.albumCourseProblemId)) {
      if (isNaN(+this.albumId)) {
        this.$Message.warning('链接错误')
        return
      }
      this.albumCourseProblemId = +this.albumCourseProblemId
    } else {
      // 创建答题试卷
      const request = new AlbumCourseProblemAddRequest()
      request.setAlbumId(this.albumId)
      this.albumCourseProblemId = ApiUtil.getData(await courseApi.albumCourseProblemAdd(request))
    }
    await this.initData()
    await this.startAsyncRemote()
  }
  private async startAsyncRemote () {
    setInterval(async () => {
      if (this.asyncRemoteData !== null) {
        const result = await courseApi.albumCourseProblemUpdate(this.asyncRemoteData)
        if (result.getCode() !== '0' && +result.getCode() < 10000) {
          console.log('业务异常， 需要重试')
          throw new Error(result.getMessage())
        }
        this.asyncRemoteData = null
      }
    }, 100)
  }
  private async getContentTopicCacheData () {
    // 获取本地的
    const historyCacheDataList = await LocalForageUtil.getPrefixItem('albumCourseProblemHistory' + this.albumCourseProblemId) as any[]
    let historyCacheData = null
    if (CollectionUtils.isNotEmpty(historyCacheDataList)) {
      historyCacheData = historyCacheDataList[0]
    }
    let remote: any = null
    // 获取远程的
    try {
      const result = await courseApi.albumCourseProblemTopicList(this.albumCourseProblemId)
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
  private async initData () {
    const contentTopicCacheData = await this.getContentTopicCacheData()
    // 获取试卷的总的题目
    this.dataList = ApiUtil.getData(await courseApi.contentTopicByAlbumId(this.albumId))
    // 设置已答的题目
    this.dataList.forEach((item, j) => {
      if (item.getContentId() in contentTopicCacheData) {
        item.setChooseValue(contentTopicCacheData[item.getContentId()])
      }
    })
  }
  private mounted () {
  }
  private nextTopic (index: number) {
    this.swiper.$swiper.slideTo(index + 1, 1000, false)
  }
  private async asyncCache () {
    // 保存key=contentId value=chooseValue
    const cacheData = {}
    this.dataList.forEach(item => {
      if (item.getChooseValue()) {
        cacheData[item.getContentId()] = item.getChooseValue()
      }
    })
    const history = await LocalForageUtil.getPrefixItem('albumCourseProblemHistory' + this.albumCourseProblemId) as any[]
    const newList = [{ date: new Date().getTime(), data: cacheData }]
    if (JSHelperUtil.isNullOrUndefined(history)) {
      await LocalForageUtil.setPrefixItem('albumCourseProblemHistory' + this.albumCourseProblemId, newList)
    } else {
      const list = history.slice(0, 100)
      list.unshift(newList[0])
      await LocalForageUtil.setPrefixItem('albumCourseProblemHistory' + this.albumCourseProblemId, list)
    }
  }
  private async asyncRemote () {
    this.asyncRemoteData = new AlbumCourseProblemUpdateRequest()
    this.asyncRemoteData.setAlbumCourseProblemId(this.albumCourseProblemId)
    const list: ProblemContentTopicRequest[] = []
    this.asyncRemoteData.setProblemContentTopicList(list)
    this.dataList.forEach(item => {
      const problemContentTopicRequest = new ProblemContentTopicRequest()
      problemContentTopicRequest.setContentId(item.getContentId())
      problemContentTopicRequest.setChooseValue(item.getChooseValue())
      list.push(problemContentTopicRequest)
    })
  }
  private async changeChoose (index: number) {
    await this.asyncCache()
    await this.asyncRemote()
  }
}
</script>

<style scoped>

</style>
