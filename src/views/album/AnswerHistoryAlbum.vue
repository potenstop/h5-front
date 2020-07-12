<template>
  <div class="main-div">
    <course-scroll-album :load-pull-data="requestData">
      <template v-slot:dataList>
        <v-list two-line>
          <course-item-album
            v-for="(item, i) in albumCourseProblemHistoryListItemResponseList"
            :key="i"
            :value="item"
          >
          </course-item-album>
        </v-list>
      </template>
    </course-scroll-album>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CourseItemAlbum from '@/components/album/CourseItemAlbum.vue'
import { AlbumCourseProblemHistoryListItemRequest } from '@/request/AlbumCourseProblemHistoryListItemRequest'
import { ApiUtil } from '@/common/util/ApiUtil'
import { AlbumCourseProblemHistoryListItemResponse } from '@/response/AlbumCourseProblemHistoryListItemResponse'
import { CourseApi } from '@/dao/api/CourseApi'
import CourseScrollAlbum from '@/components/album/CourseScrollAlbum.vue'

const courseApi = new CourseApi()

@Component({
  components: {
    CourseItemAlbum,
    CourseScrollAlbum
  }
})
export default class AnswerHistoryAlbum extends Vue {
  private name = 'AnswerHistoryAlbum'
  private pageNum = 1
  private pageSize = 10
  private albumCourseProblemHistoryListItemResponseList: AlbumCourseProblemHistoryListItemResponse[] = []

  private async created () {
  }

  private async mounted () {
  }

  private async requestData () {
    try {
      const albumCourseProblemHistoryListItemRequest = new AlbumCourseProblemHistoryListItemRequest()
      albumCourseProblemHistoryListItemRequest.setPageNum(this.pageNum)
      albumCourseProblemHistoryListItemRequest.setPageSize(this.pageSize)
      let list = ApiUtil.getData(await courseApi.albumCourseProblemHistory(albumCourseProblemHistoryListItemRequest)).getList()
      this.albumCourseProblemHistoryListItemResponseList.push(...list)
      this.pageNum++
    } catch (e) {

    }
  }
}
</script>

<style lang="css">
</style>
