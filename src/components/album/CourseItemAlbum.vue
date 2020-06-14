<template>
  <v-list-item
    @click="clickAnswerItem(value)"
  >
    <v-list-item-content>
      <v-list-item-title v-text="value.getAlbumName()"></v-list-item-title>
      <v-list-item-subtitle v-text="getSubtitle(value)"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-play-circle-outline</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { AlbumCourseListItemBasicFrontResponse } from '@/response/AlbumCourseListItemBasicFrontResponse'
@Component
export default class CourseItemAlbum extends Vue {
  @Prop({ default: {} }) readonly value!: AlbumCourseListItemBasicFrontResponse
  private clickAnswerItem () {
    this.$router.push({
      path: '/answer/course',
      query: {
        albumId: this.value.getAlbumId() + ''
      }
    })
  }
  private getSubtitle () {
    return '难度' + this.value.getDifficultyDegree() + ' ' + this.value.getAnswerNumber() + '人做过 题目数' + this.value.getContentCount()
  }
}
</script>

<style scoped>

</style>
