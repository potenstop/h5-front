<template>
  <div class="main-div">
    <swiper ref="swiper" :options="swiperOptions">
      <swiper-slide v-for="(item, i) in dataList" :key="i">
        <content-topic-item :data="item" :topic-index="i" :topic-total="dataList.length"></content-topic-item>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseApi } from '@/dao/api/CourseApi'
import { StringUtil } from 'papio-h5'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import ContentTopicItem from '@/components/topic/ContentTopicItem.vue'

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
  private swiperOptions = {
    pagination: {
      el: '.swiper-pagination'
    }
  }
  private async created () {
    const query = this.$route.query as any
    if (StringUtil.isBank(query.albumId)) {
      this.$Message.error('链接错误')
      return
    }
    if (isNaN(+query.albumId)) {
      this.$Message.error('链接错误')
      return
    }
    this.dataList = ApiUtil.getData(await courseApi.contentTopicByAlbumId(+query.albumId))
  }
  mounted () {
  }
}
</script>

<style scoped>

</style>
