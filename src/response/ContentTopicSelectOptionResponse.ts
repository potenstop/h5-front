import { JsonProperty } from 'papio-h5'
/**
 *
 * 功能描述:
 *
 * @className ContentTopicSelectOptionResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/7/9 12:47
 */
export class ContentTopicSelectOptionResponse {
  @JsonProperty
  private contentTopicSelectOptionId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private updateTime: string
  @JsonProperty
  private contentId: number
  @JsonProperty
  private contentTopicId: number
  @JsonProperty
  private optionLabel: string
  @JsonProperty
  private isOptionAnswer: number
  private activity: boolean
  public getContentTopicSelectOptionId (): number {
    return this.contentTopicSelectOptionId
  }
  public setContentTopicSelectOptionId (contentTopicSelectOptionId: number): void {
    this.contentTopicSelectOptionId = contentTopicSelectOptionId
  }
  public getCreateTime (): string {
    return this.createTime
  }
  public setCreateTime (createTime: string): void {
    this.createTime = createTime
  }
  public getUpdateTime (): string {
    return this.updateTime
  }
  public setUpdateTime (updateTime: string): void {
    this.updateTime = updateTime
  }
  public getContentId (): number {
    return this.contentId
  }
  public setContentId (contentId: number): void {
    this.contentId = contentId
  }
  public getContentTopicId (): number {
    return this.contentTopicId
  }
  public setContentTopicId (contentTopicId: number): void {
    this.contentTopicId = contentTopicId
  }
  public getOptionLabel (): string {
    return this.optionLabel
  }
  public setOptionLabel (optionLabel: string): void {
    this.optionLabel = optionLabel
  }
  public getIsOptionAnswer (): number {
    return this.isOptionAnswer
  }
  public setIsOptionAnswer (isOptionAnswer: number): void {
    this.isOptionAnswer = isOptionAnswer
  }
  public getActivity (): boolean {
    return this.activity
  }
  public setActivity (activity: boolean): void {
    this.activity = activity
  }
}
