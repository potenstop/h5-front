<template>
  <div>
    <div class="float-right">
      <v-btn rounded color="blue-grey" style="padding-left: 20px;padding-right: 20px" @click="changeCourse">
        {{courseName}}
        <v-icon right>mdi-menu-down</v-icon>
      </v-btn>
    </div>
    <v-carousel
      :continuous="false"
      :cycle="true"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="150"
      interval="4000"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-container fluid>
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          v-for="item in navigationIconList"
          :key="item.text"
          justify="center"
          align="center"
          @click="$router.push(item.path)"
        >
          <svg-icon :icon-class="item.icon"></svg-icon>
          <v-col cols="12" sm="10" style="font-size: 12px; color: #808080">
            {{item.text}}
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CourseApi } from '@/dao/api/CourseApi'
import { ApiUtil } from '@/common/util/ApiUtil'
import { AlbumCourseProblemHistoryListItemRequest } from '@/request/AlbumCourseProblemHistoryListItemRequest'
import { AlbumCourseProblemHistoryListItemResponse } from '@/response/AlbumCourseProblemHistoryListItemResponse'
import { AlbumCourseListItemSimpleFrontResponse } from '@/response/AlbumCourseListItemSimpleFrontResponse'
import { AlbumCourseListItemBasicFrontResponse } from '@/response/AlbumCourseListItemBasicFrontResponse'

let courseApi = new CourseApi()

@Component
export default class DefaultHome extends Vue {
  private name = 'DefaultHome'
  private courseName: string = ''
  private albumCourseProblemHistoryListItemResponseList: AlbumCourseProblemHistoryListItemResponse[] = []
  private albumCourseListItemSimpleFrontResponseList: AlbumCourseListItemSimpleFrontResponse[] = []
  private colors = [
    'green',
    'secondary',
    'yellow darken-4',
    'red lighten-2',
    'orange darken-1'
  ]
  private slides = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth'
  ]
  private navigationIconList = [
    {
      text: '智能练习',
      path: '/album/answer/history',
      icon: 'default-tab-zhinenglianxi'
    },
    {
      text: '章节练习',
      path: '/album/answer/history',
      icon: 'default-tab-zhengjielianxi'
    },
    {
      text: '真题模考',
      path: '/album/answer/old-exam',
      icon: 'default-tab-zhentimokao'
    },
    {
      text: '巩固模考',
      path: '/album/answer/history',
      icon: 'default-tab-gonggumokao'
    },
    {
      text: '高频数据',
      path: '/album/answer/history',
      icon: 'default-tab-gaopinshuju'
    },
    {
      text: '教材练习',
      path: '/album/answer/history',
      icon: 'default-tab-jiaocailianxi'
    },
    {
      text: '收藏',
      path: '/album/answer/history',
      icon: 'default-tab-shoucan'
    },
    {
      text: '精品三卷',
      path: '/album/answer/history',
      icon: 'default-tab-jingpinsanjuan'
    }
  ]
  private async created () {
    const courseCurrentInfoResponse = ApiUtil.getData(await courseApi.courseCurrentInfo())
    this.courseName = courseCurrentInfoResponse.getCourseName()
    const albumCourseProblemHistoryListItemRequest = new AlbumCourseProblemHistoryListItemRequest()
    albumCourseProblemHistoryListItemRequest.setPageNum(1)
    albumCourseProblemHistoryListItemRequest.setPageSize(10)
    this.albumCourseProblemHistoryListItemResponseList = ApiUtil.getData(await courseApi.albumCourseProblemHistory(albumCourseProblemHistoryListItemRequest)).getList()
    this.albumCourseListItemSimpleFrontResponseList = ApiUtil.getData(await courseApi.albumCourseOldExam())
  }
  private changeCourse () {
    this.$router.push('/course/change')
  }
}
</script>

<style scoped>

</style>
