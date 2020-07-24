<template>
  <div class="main-div">
    <swiper ref="swiper" :options="swiperOptions" class="main-div">
      <swiper-slide v-for="(item, i) in dataList" :key="i">
        <content-topic-item
          :data="item"
          :topic-index="i"
          :topic-total="dataList.length"
          @on-next-topic="nextTopic(i)"
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
    // 获取试卷的总的题目
    this.dataList = ApiUtil.getData(await courseApi.contentTopicByAlbumId(+query.albumId))
  }
  private async getCacheData () {
    // 获取本地的
    const historyCacheDataList = await LocalForageUtil.getItem('albumCourseProblemHistory' + this.albumCourseProblemId) as any[]
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
    const cacheData = await this.getCacheData()
  }
  private mounted () {
  }
  private nextTopic (index: number) {
    this.swiper.$swiper.slideTo(index + 1, 1000, false)
  }
}
</script>

<style scoped>

</style>
