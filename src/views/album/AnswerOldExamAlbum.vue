<template>
  <div class="main-div">
    <course-scroll-album :load-pull-data="requestData">
      <template v-slot:dataList>
        <v-list two-line>
          <course-item-album
            v-for="(item, i) in dataList"
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
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseApi } from '@/dao/api/CourseApi'
import CourseScrollAlbum from '@/components/album/CourseScrollAlbum.vue'
import { AlbumCourseListItemSimpleFrontResponse } from '@/response/AlbumCourseListItemSimpleFrontResponse'

const courseApi = new CourseApi()

@Component({
  components: {
    CourseItemAlbum,
    CourseScrollAlbum
  }
})
export default class AnswerOldExamAlbum extends Vue {
  private name = 'AnswerOldExamAlbum'
  private dataList: AlbumCourseListItemSimpleFrontResponse[] = []

  private async created () {
  }

  private async mounted () {
  }

  private async requestData () {
    try {
      let list = ApiUtil.getData(await courseApi.albumCourseOldExam())
      this.dataList.push(...list)
    } catch (e) {

    }
  }
}
</script>

<style lang="css">
</style>
