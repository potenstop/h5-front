<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <p style="text-align:center;padding-top: 25px;">{{$t(localeCurrentCourse)}}</p>
      <v-breadcrumbs :items="chooseCoursePathList">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>

    <v-row
      v-scroll:#scroll-target="onScroll"
      align="center"
      justify="center"
      style="height: 1000px"
    >
      <v-list>
        <v-subheader>切换课程</v-subheader>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in courseList"
            :key="i"
          >
            <v-list-item-content>
              <v-btn rounded color="blue-grey lighten-2" @click="changeCourseType(item)">{{item.getTypeName()}}</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-row>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PageShowLocale } from '@/locale/PageShowLocale'
import { CourseApi } from '@/dao/api/CourseApi'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseTypeSimpleResponse } from '@/response/CourseTypeSimpleResponse'

const courseApi = new CourseApi()
@Component
export default class ChangeCourse extends Vue {
  private name = 'ChangeCourse'
  private localeCurrentCourse = PageShowLocale.CURRENT_COURSE
  private chooseCoursePathList = []
  private courseList: CourseTypeSimpleResponse[] = []
  private async created () {
    const confirmResult = await courseApi.courseTypeChangeConfirm()
    const data = ApiUtil.getData(confirmResult)
    data.getCurrentChooseCoursePathList().forEach(item => {
      this.chooseCoursePathList.push({
        text: item.getTypeName(),
        disabled: false,
        href: '/type/project'
      })
    })
    this.courseList = data.getChangeCourseList()
  }
  private async changeCourseType (item: CourseTypeSimpleResponse) {
    await courseApi.courseTypeChange(item.getCourseTypeId())
    await this.$router.push({
      path: '/home/default'
    })
  }
  private onScroll (e) {
    console.log(e.target.scrollTop)
  }
}
</script>

<style scoped>

</style>
