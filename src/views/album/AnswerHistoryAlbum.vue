<template>
  <div class="pr-wrap">
    <div class="wrap-part first">
      <vue-scroll
        :ops="scrollerOps"
        @load-start="handleLoadStart"
        @load-before-deactivate="handleLBD"
        ref="my_scroller">

        <template>
          <v-list two-line>
            <course-item-album
              v-for="(item, i) in albumCourseProblemHistoryListItemResponseList"
              :key="i"
              :value="item"
            >
            </course-item-album>
          </v-list>
        </template>
      </vue-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CourseItemAlbum from '../../components/album/CourseItemAlbum.vue'
import { AlbumCourseProblemHistoryListItemRequest } from '@/request/AlbumCourseProblemHistoryListItemRequest'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseApi } from '@/dao/api/CourseApi'
import { AlbumCourseProblemHistoryListItemResponse } from '@/response/AlbumCourseProblemHistoryListItemResponse'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

let courseApi = new CourseApi()
BScroll.use(Pullup)

  @Component({
    components: {
      CourseItemAlbum
    }
  })
export default class AnswerHistoryAlbum extends Vue {
    private name = 'AnswerHistoryAlbum'
    private albumCourseProblemHistoryListItemResponseList: AlbumCourseProblemHistoryListItemResponse[] = []
    private pageNum = 1
    private pageSize = 10
    private index = 1;
    private scrollerOps = {
      vuescroll: {
        mode: 'slide',
        pushLoad: {
          enable: true,
          auto: true,
          autoLoadDistance: 0,
          tips: {
            deactive: '上拉加载',
            active: '释放加载',
            start: '加载中...',
            beforeDeactive: '加载成功!'
          }
        }
      }
    }

    private async created () {
      await this.requestData()
    }

    private async mounted () {
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

    private async handleLoadStart (vm, loadDom, done) {
      done()
    }

    private async handleLBD (vm, loadDom, done) {
      await this.requestData()
      done()
    }
}
</script>

<style scoped>
.pr-wrap{
  height: 100%;
}
</style>
