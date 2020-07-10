<template>
  <div class="main-div">
    <div ref="scroller" class="history-bs-wrapper">
      <div class="pullup-scroller">
        <slot name="dataList"></slot>
        <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">上拉加载更多</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">加载中...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import CourseItemAlbum from '@/components/album/CourseItemAlbum.vue'
import { CourseApi } from '@/dao/api/CourseApi'

BScroll.use(Pullup)
const courseApi = new CourseApi()

@Component({
  components: {
    CourseItemAlbum
  }
})
export default class CourseScrollAlbum extends Vue {
  @Prop(Function) readonly loadPullData!: Function | undefined;
  private name = 'CourseScrollAlbum'
  private isPullUpLoad = false
  private bscroll: any = null

  private async created () {
  }

  private async mounted () {
    this.initBscroll()
    await this.pullingUpHandler()
  }

  private initBscroll () {
    this.bscroll = new BScroll(this.$refs.scroller as any, {
      scrollY: true,
      pullUpLoad: true,
      click: true
    })

    this.bscroll.on('pullingUp', this.pullingUpHandler)
  }

  private async pullingUpHandler () {
    console.log('111')
    this.isPullUpLoad = true
    if (this.loadPullData) {
      await this.loadPullData()
    }
    this.bscroll.finishPullUp()
    this.bscroll.refresh()
    this.isPullUpLoad = false
  }
}
</script>

<style lang="css">
  .history-bs-wrapper {
    height: 100%;
    padding: 0 10px;
    overflow: hidden;
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
