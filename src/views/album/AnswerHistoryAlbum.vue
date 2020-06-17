<template>
  <div class="pullup">
    <div ref="scroller" class="pullup-bswrapper">
      <div class="pullup-scroller">
        <ul class="pullup-list">
          <li v-for="i of len" :key="i" class="pullup-list-item">
            {{ i % 5 === 0 ? 'scroll up 👆🏻' : `I am item ${i} `}}
          </li>
        </ul>
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

BScroll.use(Pullup)

  @Component
export default class AnswerHistoryAlbum extends Vue {
  private name = 'AnswerHistoryAlbum'
  private pageNum = 1
  private pageSize = 10
  private index = 1
  private len = 30
  private isPullUpLoad = false
  private bscroll: any = null

  private async created () {
    // await this.requestData()
  }

  private async mounted () {
    this.initBscroll()
  }

  private initBscroll () {
    this.bscroll = new BScroll(this.$refs.scroller as any, {
      scrollY: true,
      pullUpLoad: true
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
      this.len = this.len + 30
    } catch (e) {

    }
  }
}
</script>

<style lang="css">
  .pullup{
    height: 100%;
  }
  .pullup-bswrapper {
    height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .pullup-list{
    padding: 0
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
