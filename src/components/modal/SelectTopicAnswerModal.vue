<template>
  <modal name="select-topic-answer-modal"
         width="100%"
         height="100%"
         @before-open="beforeOpen"
         transfer="nice-modal-fade"
  >
    <v-card flat>
      <v-card-text>
        <v-container fluid class="pa-0">
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
      <v-footer app class="pa-0">
        <v-container class="grey lighten-5">
          <v-row>
            <v-col class="text-center">
              <v-btn rounded color="success" dark class="pl-10 pr-10" @click="clickProceedTopic">继续答题</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn rounded color="blue-grey" dark class="pl-10 pr-10" @click="clickSubmitProblem">提交试卷</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-card>
  </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import SelectTopicNumberAlbum from '@/components/album/SelectTopicNumberAlbum.vue'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
@Component({
  components: {
    SelectTopicNumberAlbum
  }
})
export default class SelectTopicAnswerModal extends Vue {
  private name = 'SelectTopicAnswerModal'
  private dataList: ContentTopicAnswerListItemFrontResponse[] = []
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
    console.log(this.dataList)
    this.dataList.forEach((item, index) => {
      const inputItem = {
        text: index + 1 + '',
        index: index
      }
      switch (item.getTopicType()) {
        case ContentTopicConstant.TYPE_SIGN_SELECT:
          console.log(111)
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
  public async clickProceedTopic () {
    this.$modal.hide('select-topic-answer-modal')
  }
  public async clickSubmitProblem () {

  }
  public async onSelectNumber (index: number) {
    this.$modal.hide('select-topic-answer-modal')
    this.$emit('on-select-number', index)
  }
}
</script>

<style scoped>

</style>
