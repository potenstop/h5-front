<template>
  <v-row v-if="topicNumberList.length > 0">
    <v-col cols="12">
      <p>{{titleName}}</p>
    </v-col>
    <v-col cols="2" v-for="(topicNumber, i) in topicNumberList" :key="i" class="pt-0">
      <v-btn class="ma-2" outlined fab color="teal" @click="clickTopicNumber(topicNumber)" small>
        {{topicNumber.text}}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
class TopicNumber {
  public text: string
  public index: number
}
@Component
export default class SelectTopicNumberAlbum extends Vue {
  @Prop({ default: '' }) readonly titleName!: string
  @Prop({ default: [] }) readonly topicNumberList!: TopicNumber[]
  private name = 'SelectTopicNumberAlbum'
  private async clickTopicNumber (topicNumber: TopicNumber) {
    this.$emit('on-select-number', topicNumber.index)
  }
}
</script>

<style scoped>

</style>
