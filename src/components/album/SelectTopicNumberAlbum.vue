<template>
  <v-row v-if="topicNumberList.length > 0">
    <v-col cols="12" class="pb-0">
      <p>{{titleName}}</p>
    </v-col>
    <v-col cols="2" v-for="(topicNumber, i) in topicNumberList" :key="i" class="pa-0">
      <v-btn
        :color="getColourJsonColor(topicNumber.state)"
        :class="getColourJsonClass(topicNumber.state)"
        depressed
        fab
        :outlined="topicNumber.state === 5"
        @click="clickTopicNumber(topicNumber)" x-small>
        {{topicNumber.text}}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
class TopicNumber {
  // 对应的文本
  public text: string
  // 对应的下标
  public index: number
  // 状态 1 已答 2 : 正确 3: 错误 4 部分正确 5: 未答
  public state: number
}
@Component
export default class SelectTopicNumberAlbum extends Vue {
  @Prop({ default: '' }) readonly titleName!: string
  @Prop({ default: [] }) readonly topicNumberList!: TopicNumber[]
  private name = 'SelectTopicNumberAlbum'
  private colourJson = {
    1: {
      color: 'teal lighten-3',
      class: 'ma-1 white--text'
    },
    2: {
      color: 'cyan',
      class: 'ma-1 white--text'
    },
    3: {
      color: 'red',
      class: 'ma-1 white--text'
    },
    4: {
      color: 'orange accent-4',
      class: 'ma-1 white--text'
    },
    5: {
      color: 'white',
      class: 'ma-1 blue--text text--lighten-1'
    }
  }
  private async clickTopicNumber (topicNumber: TopicNumber) {
    this.$emit('on-select-number', topicNumber.index)
  }
  private getColourJsonColor (state: number) {
    const colour = this.colourJson[state]
    if (!colour) {
      return ''
    }
    return colour.color
  }
  private getColourJsonClass (state: number) {
    const colour = this.colourJson[state]
    if (!colour) {
      return ''
    }
    return colour.class
  }
}
</script>

<style scoped>

</style>
