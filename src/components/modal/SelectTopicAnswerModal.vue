<template>
  <modal name="select-topic-answer-modal"
         width="100%"
         height="100%"
         @before-open="beforeOpen"
         transfer="nice-modal-fade"
  >
    <v-card
      flat
      class="main-div"
    >
      <vue-scroll>
        <v-card-text>
        <v-container class="pa-0">
          <select-topic-number-album
            title-name="单项选择题"
            :topic-number-list="signSelectDataList"
            @on-select-number="onSelectNumber"
          ></select-topic-number-album>
          <select-topic-number-album
            title-name="多项选择题"
            :topic-number-list="mulSelectDataList"
            @on-select-number="onSelectNumber"
          ></select-topic-number-album>
          <select-topic-number-album
            title-name="填空题"
            :topic-number-list="fillBlankDataList"
            @on-select-number="onSelectNumber"
          ></select-topic-number-album>
          <select-topic-number-album
            title-name="简答题"
            :topic-number-list="shortAnswerDataList"
            @on-select-number="onSelectNumber"
          ></select-topic-number-album>
        </v-container>
      </v-card-text>
      </vue-scroll>
    </v-card>
    <v-footer class="pa-0 ma-0" fixed max-height="70">
      <v-row>
        <v-col class="text-center">
          <v-btn rounded color="success" dark class="pl-5 pr-5" @click="clickProceedTopic">继续答题</v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn rounded color="blue-grey" dark class="pl-5 pr-5" @click="clickSubmitProblem">提交试卷</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import SelectTopicNumberAlbum from '@/components/album/SelectTopicNumberAlbum.vue'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import { CourseApi } from '@/dao/api/CourseApi'
import { ApiUtil } from '@/common/util/ApiUtil'

const courseApi = new CourseApi()
@Component({
  components: {
    SelectTopicNumberAlbum
  }
})
export default class SelectTopicAnswerModal extends Vue {
  private name = 'SelectTopicAnswerModal'
  private dataList: ContentTopicAnswerListItemFrontResponse[] = []
  private albumCourseProblemId: number
  private signSelectDataList = []
  private mulSelectDataList = []
  private fillBlankDataList = []
  private shortAnswerDataList = []
  private beforeOpen (event) {
    this.dataList = event.params.dataList
    this.setMoreDataList()
  }
  private setMoreDataList () {
    this.signSelectDataList = []
    this.mulSelectDataList = []
    this.fillBlankDataList = []
    this.shortAnswerDataList = []
    this.dataList.forEach((item, index) => {
      const inputItem = {
        text: index + 1 + '',
        index: index,
        state: index % 5 + 1
      }
      switch (item.getTopicType()) {
        case ContentTopicConstant.TYPE_SIGN_SELECT:
          this.signSelectDataList.push(inputItem)
          break
        case ContentTopicConstant.TYPE_MUL_SELECT:
          this.mulSelectDataList.push(inputItem)
          break
        case ContentTopicConstant.TYPE_FILL_BLANK:
          this.fillBlankDataList.push(inputItem)
          break
        case ContentTopicConstant.TYPE_SHORT_ANSWER:
          this.shortAnswerDataList.push(inputItem)
          break
        default:
          break
      }
    })
  }
  public clickProceedTopic () {
    this.$modal.hide('select-topic-answer-modal')
  }
  public async clickSubmitProblem () {
    const data = ApiUtil.getData(await courseApi.albumCourseProblemSubmit(this.albumCourseProblemId))
    // 跳转至练习报告页
    this.clickProceedTopic()
    await this.$router.push({
      path: '/answer/report',
      query: {
        albumCourseProblemId: this.albumCourseProblemId + ''
      }
    })
  }
  public async onSelectNumber (index: number) {
    this.clickProceedTopic()
    this.$emit('on-select-number', index)
  }
}
</script>

<style scoped>

</style>
