<template>
  <div class="main-div">
    <v-divider></v-divider>
    <v-container>
      <v-row
        no-gutters
      >
        <v-col
          :cols="4"
        >
          {{getTopicTitle()}}
        </v-col>
        <v-col
          :cols="2"
          :offset="6"
        >
          {{getTopicIndex()}}
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <div>
      <auto-katex :data="data.getTitle()" :is-line-feed="false"></auto-katex>
    </div>
    <div>
      <div v-if="1 === data.getTopicType()" >
        <div v-for="(item, i) in data.getOptionResponseList()" :key="i">
          <auto-katex :data="item.getOptionLabel()"></auto-katex>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import AutoKatex from '@/components/katex/AutoKatex.vue'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
@Component({
  components: {
    AutoKatex
  }
})
export default class ContentTopicItem extends Vue {
  private name = 'ContentTopicItem'
  @Prop({ default: {} }) readonly data!: ContentTopicAnswerListItemFrontResponse
  @Prop({ default: 0 }) readonly topicIndex!: number
  @Prop({ default: 0 }) readonly topicTotal!: number
  private getTopicTitle () {
    if (ContentTopicConstant.TYPE_SIGN_SELECT === this.data.getTopicType()) {
      return '单项选择题'
    } else if (ContentTopicConstant.TYPE_MUL_SELECT === this.data.getTopicType()) {
      return '多项选择题'
    } else if (ContentTopicConstant.TYPE_FILL_BLANK === this.data.getTopicType()) {
      return '填空题'
    } else if (ContentTopicConstant.TYPE_SHORT_ANSWER === this.data.getTopicType()) {
      return '简答题'
    } else {
      return '未知'
    }
  }
  private getTopicIndex () {
    return this.topicIndex + '/' + this.topicTotal
  }
}
</script>

<style scoped>

</style>
