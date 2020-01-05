<template>
  <div>
    <div class="float-right">
      <v-btn rounded color="blue-grey" style="padding-left: 20px;padding-right: 20px" @click="changeCourse">
        英语四级
        <v-icon right>mdi-menu-down</v-icon>
      </v-btn>
    </div>
    <v-list two-line>
      <v-subheader>答题历史</v-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-list two-line>
      <v-subheader>真题模考</v-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DefaultHome extends Vue {
  private name = 'DefaultHome'
  private items = [
    {
      icon: 'folder',
      iconClass: 'grey lighten-1 white--text',
      title: '2019 上半年考试',
      subtitle: '难度3 100人做过 题目数40'
    },
    { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '2019 下半年考试', subtitle: 'Jan 17, 2014' },
    { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
  ]
  private changeCourse () {
    this.$router.push('/course/change')
  }
}
</script>

<style scoped>

</style>
