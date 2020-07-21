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
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import ContentTopicItem from '@/components/topic/ContentTopicItem.vue'
import { AlbumCourseProblemAddRequest } from '@/request/AlbumCourseProblemAddRequest'

const courseApi = new CourseApi()
@Component({
  components: {
    ContentTopicItem
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

    this.dataList = ApiUtil.getData(await courseApi.contentTopicByAlbumId(+query.albumId))
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
