<template>
  <div class="main-div">
    <swiper
      ref="swiper"
      :options="swiperOptions"
      class="main-div"
      @slideChange="changCurrentTopicIndex"
    >
      <swiper-slide v-for="(item, i) in dataList" :key="i">
        <content-topic-item
          :data="item"
          :topic-index="i"
          :topic-total="dataList.length"
          @on-next-topic="nextTopic(i)"
          @on-change-choose="changeChoose(i)"
        ></content-topic-item>
      </swiper-slide>
    </swiper>
    <v-footer app class="pa-0">
      <v-btn-toggle
        dense
        borderless
        style="width: 100%"
        group
        tile
        color="primary"
        text
      >
        <v-btn :height="btnHeight" width="25%" @click="clickFavorites" class="text-center pa-0 ma-0">
          <!--          <v-icon color="blue darken-2">mdi-star-outline</v-icon>-->
          <v-icon
            color="blue darken-2"
            v-text="footerIsFavorites ? 'mdi-star' : 'mdi-star-outline'"
          ></v-icon>
        </v-btn>

        <v-btn :height="btnHeight" width="25%" @click="clickList" class="text-center pa-0 ma-0">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-btn :height="btnHeight" width="25%" @click="clickAnswerTimer" class="text-center pa-0 ma-0">
          {{answerFormat}}
        </v-btn>

        <v-btn :height="btnHeight" width="25%" class="text-center pa-0 ma-0">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-footer>
    <select-topic-answer-modal
      @on-select-number="onSelectNumber"
    ></select-topic-answer-modal>
    <reset-answer-modal
      @on-cancel-reset="onCancelReset"
    ></reset-answer-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseApi } from '@/dao/api/CourseApi'
import { CmsApi } from '@/dao/api/CmsApi'
import { JSHelperUtil, JsonProperty, Min, NotNull, StringUtil } from 'papio-h5'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ContentTopicItem from '@/components/topic/ContentTopicItem.vue'
import { AlbumCourseProblemAddRequest } from '@/request/AlbumCourseProblemAddRequest'
import { LocalForageUtil } from '@/common/util/LocalForageUtil'
import 'swiper/css/swiper.css'
import { AlbumCourseProblemUpdateRequest } from '@/request/AlbumCourseProblemUpdateRequest'
import { ProblemContentTopicRequest } from '@/request/ProblemContentTopicRequest'
import { CommonConstant } from '@/common/constant/CommonConstant'
import { FavoritesAddRequest } from '@/request/FavoritesAddRequest'
import { BusinessLineTypeConstant } from '@/common/constant/BusinessLineTypeConstant'
import { FavoritesConstant } from '@/common/constant/FavoritesConstant'
import AnswerTopicMixin from '@/components/mixin/AnswerTopicMixin'
import { mixins } from 'vue-class-component'
import ValidMixin from '@/components/mixin/ValidMixin'
import SelectTopicAnswerModal from '@/components/modal/SelectTopicAnswerModal.vue'
import TimerMixin from '@/components/mixin/TimerMixin'
import ResetAnswerModal from '@/components/modal/ResetAnswerModal.vue'

const courseApi = new CourseApi()
const cmsApi = new CmsApi()
class RouterQuery {
  @JsonProperty
  @NotNull
  @Min(1)
  private albumId: number;
  @JsonProperty
  @Min(1)
  private albumCourseProblemId: number;
  public getAlbumId (): number {
    return this.albumId
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId
  }
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
}
@Component({
  components: {
    ContentTopicItem,
    Swiper,
    SwiperSlide,
    SelectTopicAnswerModal,
    ResetAnswerModal
  }
})
export default class CourseAnswer extends mixins(AnswerTopicMixin, ValidMixin, TimerMixin) {
  @Ref() readonly swiper!: any;
  private name = 'CourseAnswer';
  private dataList: ContentTopicAnswerListItemFrontResponse[] = [];
  private swiperOptions = {
    pagination: {}
  };
  private asyncRemoteData: AlbumCourseProblemUpdateRequest = null;
  private btnHeight = 46;
  // 当前滑动的下标
  private currentTopicIndex = 0
  private footerIsFavorites = false
  private routerQuery: RouterQuery = null
  private answerFormat: string = '00:00'
  private async created () {
    this.routerQuery = this.validQuery(RouterQuery)
    if (this.routerQuery === null) {
      return
    }
    if (
      JSHelperUtil.isNullOrUndefined(this.routerQuery.getAlbumCourseProblemId())
    ) {
      // 创建答题试卷
      const request = new AlbumCourseProblemAddRequest()
      request.setAlbumId(this.routerQuery.getAlbumId())
      this.routerQuery.setAlbumCourseProblemId(
        ApiUtil.getData(await courseApi.albumCourseProblemAdd(request))
      )
    }
    this.dataList = await this.getTopicListAndAnswerValue(
      this.routerQuery.getAlbumCourseProblemId(),
      this.routerQuery.getAlbumId()
    )
    await this.startAsyncRemote()
    await this.changCurrentTopicIndex()
    this.startSimpleTime(this.onTimerDefault)
  }
  private async startAsyncRemote () {
    setInterval(async () => {
      if (this.asyncRemoteData !== null) {
        const result = await courseApi.albumCourseProblemUpdate(
          this.asyncRemoteData
        )
        if (result.getCode() !== '0' && +result.getCode() < 10000) {
          console.log('业务异常， 需要重试')
          throw new Error(result.getMessage())
        }
        this.asyncRemoteData = null
      }
    }, 100)
  }
  private mounted () {}
  private nextTopic (index: number) {
    this.swiper.$swiper.slideTo(index + 1, 1000, false)
  }
  private async asyncCache () {
    // 保存key=contentId value=chooseValue
    const cacheData = {}
    this.dataList.forEach(item => {
      if (item.getChooseValue()) {
        cacheData[item.getContentId()] = item.getChooseValue()
      }
    })
    const history = (await LocalForageUtil.getPrefixItem(
      'albumCourseProblemHistory' + this.routerQuery.getAlbumCourseProblemId()
    )) as any[]
    const newList = [{ date: new Date().getTime(), data: cacheData }]
    if (JSHelperUtil.isNullOrUndefined(history)) {
      await LocalForageUtil.setPrefixItem(
        'albumCourseProblemHistory' +
          this.routerQuery.getAlbumCourseProblemId(),
        newList
      )
    } else {
      const list = history.slice(0, 100)
      list.unshift(newList[0])
      await LocalForageUtil.setPrefixItem(
        'albumCourseProblemHistory' +
          this.routerQuery.getAlbumCourseProblemId(),
        list
      )
    }
  }
  private async asyncRemote () {
    this.asyncRemoteData = new AlbumCourseProblemUpdateRequest()
    this.asyncRemoteData.setAlbumCourseProblemId(
      this.routerQuery.getAlbumCourseProblemId()
    )
    const list: ProblemContentTopicRequest[] = []
    this.asyncRemoteData.setProblemContentTopicList(list)
    this.dataList.forEach(item => {
      const problemContentTopicRequest = new ProblemContentTopicRequest()
      problemContentTopicRequest.setContentId(item.getContentId())
      problemContentTopicRequest.setChooseValue(item.getChooseValue())
      list.push(problemContentTopicRequest)
    })
  }
  private async changeChoose (index: number) {
    await this.asyncCache()
    await this.asyncRemote()
  }
  private async clickFavorites () {
    const currentContentTopic = this.dataList[this.currentTopicIndex]
    const request = new FavoritesAddRequest()
    request.setTableName(BusinessLineTypeConstant.TABLE_NAME_COURSE_CONTENT)
    request.setClientId(FavoritesConstant.CLIENT_H5)
    request.setBusinessLineId(currentContentTopic.getContentId() + '')
    if (this.footerIsFavorites) {
      // 取消收藏
      await cmsApi.favoritesCancel(request)
      this.footerIsFavorites = false
    } else {
      // 收藏
      await cmsApi.favoritesAdd(request)
      this.footerIsFavorites = true
    }
  }
  private async changCurrentTopicIndex () {
    this.currentTopicIndex = this.swiper.$swiper.activeIndex
    const currentContentTopic = this.dataList[this.currentTopicIndex]
    if (JSHelperUtil.isNotNull(currentContentTopic)) {
      this.footerIsFavorites =
        currentContentTopic.getFavorites() === CommonConstant.TRUE
    }
  }
  private async clickList () {
    this.$modal.show('select-topic-answer-modal', {
      dataList: this.dataList,
      albumCourseProblemId: this.routerQuery.getAlbumCourseProblemId()
    })
  }
  private async onSelectNumber (index: number) {
    this.swiper.$swiper.slideTo(index, 0, false)
  }
  public onTimerDefault (value: number) {
    const s = value % 60
    const m = Math.floor(value / 60)
    let str = ''
    if (m < 10) {
      str += `0${m}:`
    } else {
      str += `${m}:`
    }
    if (s < 10) {
      str += `0${s}`
    } else {
      str += `${s}`
    }
    this.answerFormat = str
  }
  public async clickAnswerTimer () {
    if (this.isSimpleStart()) {
      this.stopSimpleTime()
      const data = { totalTopic: 0, answerTopic: 0 }
      data.totalTopic = this.dataList.length
      this.dataList.forEach(item => {
        if (item.getChooseValue() && item.getChooseValue().length > 0) {
          data.answerTopic++
        }
      })
      this.$modal.show('reset-answer-modal', data)
    } else {
      this.startSimpleTime()
    }
  }
  public async onCancelReset () {
    this.startSimpleTime()
  }
}
</script>

<style scoped></style>
