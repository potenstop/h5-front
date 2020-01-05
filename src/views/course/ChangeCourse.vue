<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <p style="text-align:center;padding-top: 25px;">{{$t(localeCurrentCourse)}}</p>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>

    <v-list>
      <v-subheader>切换课程</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in courseList"
          :key="i"
        >
          <v-list-item-content>
            <v-btn rounded color="blue-grey lighten-2" @click="chooseCourse(item)">{{item.text}}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PageShowLocale } from '@/locale/PageShowLocale'
@Component
export default class ChangeCourse extends Vue {
  private name = 'ChangeCourse'
  private localeCurrentCourse = PageShowLocale.CURRENT_COURSE
  private items = [
    {
      text: '大学',
      disabled: false,
      href: '/type/project'
    },
    {
      text: '自考',
      disabled: false,
      href: '/type/project'
    },
    {
      text: '计算机专业',
      disabled: false,
      href: '/type/project'
    },
    {
      text: '英语',
      disabled: true,
      href: ''
    }
  ]
  private item = 1
  private courseList = [
    {
      text: '111'
    },
    {
      text: '111'
    },
    {
      text: '1112222222222222222222222222222222456789'
    }
  ]
  private chooseCourse (item: any) {
    this.$router.push({
      path: '/home/default',
      query: {
        courseId: item.text
      }
    })
  }
}
</script>

<style scoped>

</style>
