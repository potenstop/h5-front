<template>
  <v-touch v-on:swipeleft="onSwipeLeft(data)" v-on:swiperight="onSwipeRight(data)" transition="scroll-x-reverse-transition">
    <v-row style="height:100%; width: 100%;position: absolute;">
      <v-menu transition="scroll-x-transition">
        <template v-slot:activator="{ on }">
        </template>
        <div v-if="currentPage == 1">
          <div class="display-1">开始答题!</div>
          <div>第一部分: 选择题</div>
          <div>本大题共17小题</div>
        </div>
        <div v-if="currentPage == 2">
          <div class="subtitle-2">单项选择                  1111</div>
          <div>111</div>
        </div>
      </v-menu>
    </v-row>

    <v-carousel
      v-model="currentPage"
      style="height:100%; width: 100%;position: absolute;"
      hide-delimiters
      :show-arrows="false"
      :continuous="false"
      :touch="{left : onSwipeLeft, right: onSwipeRight}"
    >
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"

      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-touch>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CourseAnswer extends Vue {
  private name = 'CourseAnswer'
  private totalPage = 10
  private currentPage = 0
  private onSwipeLeft () {
    this.currentPage++
  }
  private onSwipeRight () {
    this.currentPage--
  }
  private colors = [
    'primary',
    'secondary',
    'yellow darken-2',
    'red',
    'orange'
  ]
}
</script>

<style scoped>

</style>
