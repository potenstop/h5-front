<template>
  <div class="main-div">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ContentTopicAnswerListItemFrontResponse } from '@/response/ContentTopicAnswerListItemFrontResponse'
import { JsonProperty, Min, NotNull } from 'papio-h5'
import { mixins } from 'vue-class-component'
import AnswerTopicMixin from '@/components/mixin/AnswerTopicMixin'
import ValidMixin from '@/components/mixin/ValidMixin'
class RouterQuery {
  @JsonProperty
  @NotNull
  @Min(1)
  private albumId: number
  @JsonProperty
  @NotNull
  @Min(1)
  private albumCourseProblemId: number
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
@Component
export default class SelectTopicAnswer extends mixins(AnswerTopicMixin, ValidMixin) {
  private name = 'SelectTopicAnswer'
  private dataList: ContentTopicAnswerListItemFrontResponse[] = []
  private routerQuery: RouterQuery = null
  public async created () {
    this.routerQuery = this.validQuery(RouterQuery)
    if (this.routerQuery === null) {
      return
    }
    console.log('11111111111')
  }
}
</script>

<style scoped>

</style>
