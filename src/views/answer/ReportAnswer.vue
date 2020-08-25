<template>
  <v-container fluid
    flat
    class="main-div">
    <v-subheader class="d-block text-center">得分</v-subheader>
    <v-row
      align="start"
      justify="center"
    >
      <v-progress-circular
        :rotate="360"
        :size="120"
        :width="5"
        :value="90"
        color="blue"
        class="text-center"
      >
        <div>
          <v-col class="d-block pa-0 text-h4 black--text" justify="center">90</v-col>
          <v-col class="d-block pa-0 text-caption blue-grey--text lighten-1--text">总分110</v-col>
        </div>
      </v-progress-circular>
    </v-row>
    <v-row class="text-center mt-2">
      <v-col>
        <v-card>
          <v-card-subtitle>已击败考生</v-card-subtitle>
          <v-card-text>0%</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-subtitle>全站平均分</v-card-subtitle>
          <v-card-text>21.11</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-subtitle>全站平均分</v-card-subtitle>
          <v-card-text>21.11</v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
            ></select-topic-number-album>
            <select-topic-number-album
              title-name="多项选择题"
              :topic-number-list="mulSelectDataList"
            ></select-topic-number-album>
            <select-topic-number-album
              title-name="填空题"
              :topic-number-list="fillBlankDataList"
            ></select-topic-number-album>
            <select-topic-number-album
              title-name="简答题"
              :topic-number-list="shortAnswerDataList"
            ></select-topic-number-album>
          </v-container>
        </v-card-text>
      </vue-scroll>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectTopicNumberAlbum from '@/components/album/SelectTopicNumberAlbum.vue'
import { JsonProperty, Min, NotNull } from 'papio-h5'
import { mixins } from 'vue-class-component'
import ValidMixin from '@/components/mixin/ValidMixin'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseApi } from '@/dao/api/CourseApi'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
const courseApi = new CourseApi()

class RouterQuery {
  @JsonProperty
  @Min(1)
  private albumCourseProblemId: number
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
}
@Component({
  components: {
    SelectTopicNumberAlbum
  }
})
export default class ReportAnswer extends mixins(ValidMixin) {
  private name = 'ReportAnswer'
  private signSelectDataList = []
  private mulSelectDataList = []
  private fillBlankDataList = []
  private shortAnswerDataList = []
  private routerQuery: RouterQuery = null
  private async created () {
    this.routerQuery = this.validQuery(RouterQuery)
    if (this.routerQuery === null) {
      return
    }
    await this.initData()
  }
  private async initData () {
    const result = await courseApi.albumCourseProblemTopicList(this.routerQuery.getAlbumCourseProblemId())
    const albumCourseProblemTopicResponseList = ApiUtil.getData(result)
    albumCourseProblemTopicResponseList.forEach((item, index) => {
      const inputItem = {
        text: index + 1 + '',
        index: index,
        state: index % 5 + 1
      }
      console.log(index % 4 + 1, 22333)
      switch (index % 4 + 1) {
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
    console.log(this.signSelectDataList, '2222')
  }
}
</script>

<style scoped>

</style>
