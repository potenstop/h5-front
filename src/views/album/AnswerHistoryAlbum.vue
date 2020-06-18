<template>
  <div class="main-div">
    <div ref="scroller" class="history-bs-wrapper">
      <div class="pullup-scroller">
        <v-list two-line>
          <course-item-album
            v-for="(item, i) in albumCourseProblemHistoryListItemResponseList"
            :key="i"
            :value="item"
          >
          </course-item-album>
        </v-list>
        <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import CourseItemAlbum from '@/components/album/CourseItemAlbum.vue'
import { AlbumCourseProblemHistoryListItemRequest } from '@/request/AlbumCourseProblemHistoryListItemRequest'
import { ApiUtil } from '@/common/util/ApiUtil'
import { AlbumCourseProblemHistoryListItemResponse } from '@/response/AlbumCourseProblemHistoryListItemResponse'
import { CourseApi } from '@/dao/api/CourseApi'

BScroll.use(Pullup)
const courseApi = new CourseApi()

@Component({
  components: {
    CourseItemAlbum
  }
})
export default class AnswerHistoryAlbum extends Vue {
  private name = 'AnswerHistoryAlbum'
  private pageNum = 1
  private pageSize = 10
  private index = 1
  private len = 30
  private isPullUpLoad = false
  private bscroll: any = null
  private albumCourseProblemHistoryListItemResponseList: AlbumCourseProblemHistoryListItemResponse[] = []

  private async created () {
  }

  private async mounted () {
    this.initBscroll()
    await this.pullingUpHandler()
  }

  private initBscroll () {
    this.bscroll = new BScroll(this.$refs.scroller as any, {
      scrollY: true,
      pullUpLoad: true,
      click: false
    })

    this.bscroll.on('pullingUp', this.pullingUpHandler)
  }

  private async pullingUpHandler () {
    this.isPullUpLoad = true

    await this.requestData()

    this.bscroll.finishPullUp()
    this.bscroll.refresh()
    this.isPullUpLoad = false
  }

  private async requestData () {
    try {
      const albumCourseProblemHistoryListItemRequest = new AlbumCourseProblemHistoryListItemRequest()
      albumCourseProblemHistoryListItemRequest.setPageNum(this.pageNum)
      albumCourseProblemHistoryListItemRequest.setPageSize(this.pageSize)
      let list = ApiUtil.getData(await courseApi.albumCourseProblemHistory(albumCourseProblemHistoryListItemRequest)).getList()
      this.albumCourseProblemHistoryListItemResponseList.push(...list.splice(0, 20))
      console.log(this.albumCourseProblemHistoryListItemResponseList.length, 222222222)
      this.pageNum++
    } catch (e) {

    }
  }
}
</script>

<style lang="css">
  .history-bs-wrapper {
    height: 100%;
    padding: 0 10px;
    overflow: hidden;
  }
  .pullup-list-item{
    padding: 10px 0;
    list-style: none;
    border-bottom: 1px solid #ccc;
  }
  .pullup-wrapper {
    padding: 20px;
    text-align: center;
    color: #999;
  }
</style>
