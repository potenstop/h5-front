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
    <v-container>
      <auto-katex :data="data.getTitle()" :is-line-feed="false"></auto-katex>
    </v-container>
    <v-container>
      <div v-if="1 === data.getTopicType()" >
        <v-list flat>
          <v-list-item-group v-model="toggleExclusive"  @change="changeChooseValue">
            <v-list-item
              v-for="(item, i) in data.getOptionResponseList()"
              :key="i"
              style="padding: 0 0"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item-icon style="margin-right: 15px">
                <v-btn
                       outlined fab x-small
                       color="indigo"
                       active-class="deep-purple--text text--accent-4"
                >
                  {{getOptionChar(i)}}
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <auto-katex :data="item.getOptionLabel()"></auto-katex>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <div v-else-if="2 === data.getTopicType()">
        <v-list flat>
          <v-list-item-group v-model="toggleExclusiveList"  @change="changeChooseValueList" multiple>
            <v-list-item
                    v-for="(item, i) in data.getOptionResponseList()"
                    :key="i"
                    style="padding: 0 0"
                    active-class="deep-purple--text text--accent-4"
            >
              <v-list-item-icon style="margin-right: 15px">
                <v-btn
                        outlined fab x-small
                        color="indigo"
                        active-class="deep-purple--text text--accent-4"
                >
                  {{getOptionChar(i)}}
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <auto-katex :data="item.getOptionLabel()"></auto-katex>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import AutoKatex from '@/components/katex/AutoKatex.vue'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import { JSHelperUtil } from 'papio-h5'
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
  private OPTION_CHAR_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  private toggleExclusive: number = null
  private toggleExclusiveList: number[] = []
  private created () {
    if (ContentTopicConstant.TYPE_SIGN_SELECT === this.data.getTopicType()) {
      if (!isNaN(+this.data.getChooseValue())) {
        this.data.getOptionResponseList().forEach((item, index) => {
          if (item.getContentTopicSelectOptionId() === +this.data.getChooseValue()) {
            this.toggleExclusive = index
          }
        })
      }
    } else if (ContentTopicConstant.TYPE_MUL_SELECT === this.data.getTopicType()) {
      return '多项选择题'
    } else if (ContentTopicConstant.TYPE_FILL_BLANK === this.data.getTopicType()) {
      return '填空题'
    } else if (ContentTopicConstant.TYPE_SHORT_ANSWER === this.data.getTopicType()) {
      return '简答题'
    }
  }
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
    return this.topicIndex + 1 + '/' + this.topicTotal
  }
  private getOptionChar (i: number) {
    if (this.OPTION_CHAR_LIST.length <= i) {
      return '未知'
    }
    return this.OPTION_CHAR_LIST[i]
  }
  private async changeChooseValue (value: number) {
    if (JSHelperUtil.isNullOrUndefined(value)) {
      this.data.setChooseValue('')
    } else {
      this.$emit('on-next-topic')
      this.data.setChooseValue(this.data.getOptionResponseList()[this.toggleExclusive].getContentTopicSelectOptionId().toString())
    }
    this.$emit('on-change-choose')
  }
  private async changeChooseValueList (value: number | undefined) {
    if (JSHelperUtil.isNullOrUndefined(value)) {
      this.data.setChooseValue('')
    } else {
      const map = new Map<number, number>()
      this.data.getOptionResponseList().forEach((item, index) => {
        map.set(index, item.getContentId())
      })
    }
    this.$emit('on-change-choose')
  }
}
</script>

<style scoped>

</style>
