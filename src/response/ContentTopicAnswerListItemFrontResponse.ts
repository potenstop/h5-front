import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ContentTopicSelectOptionResponse } from '@/response/ContentTopicSelectOptionResponse'

/**
 *
 * 功能描述:
 *
 * @className ContentTopicAnswerListItemFrontResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/7/9 12:45
 */
export class ContentTopicAnswerListItemFrontResponse {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private title: string
  @JsonProperty
  private analysis: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  private gradeAmount: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ContentTopicSelectOptionResponse))
  private optionResponseList: ContentTopicSelectOptionResponse[]
  @JsonProperty
  private chooseValue: string
  @JsonProperty
  private favorites: number
  public getContentId (): number {
    return this.contentId
  }
  public setContentId (contentId: number): void {
    this.contentId = contentId
  }
  public getTitle (): string {
    return this.title
  }
  public setTitle (title: string): void {
    this.title = title
  }
  public getAnalysis (): string {
    return this.analysis
  }
  public setAnalysis (analysis: string): void {
    this.analysis = analysis
  }
  public getTopicType (): number {
    return this.topicType
  }
  public setTopicType (topicType: number): void {
    this.topicType = topicType
  }
  public getGradeAmount (): number {
    return this.gradeAmount
  }
  public setGradeAmount (gradeAmount: number): void {
    this.gradeAmount = gradeAmount
  }
  public getOptionResponseList (): ContentTopicSelectOptionResponse[] {
    return this.optionResponseList
  }
  public setOptionResponseList (optionResponseList: ContentTopicSelectOptionResponse[]): void {
    this.optionResponseList = optionResponseList
  }
  public getChooseValue (): string {
    return this.chooseValue
  }
  public setChooseValue (chooseValue: string): void {
    this.chooseValue = chooseValue
  }

  public getFavorites (): number {
    return this.favorites
  }

  public setFavorites (favorites: number) {
    this.favorites = favorites
  }
}
