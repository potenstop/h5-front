import { JsonProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemHistoryListItemResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/5/31 6:58
 */
export class AlbumCourseProblemHistoryListItemResponse {
  @JsonProperty
  private albumCourseProblemId: number;
  @JsonProperty
  private albumId: number;
  @JsonProperty
  private albumName: string;
  @JsonProperty
  private answerNumber: number;
  @JsonProperty
  private contentCount: number;
  @JsonProperty
  private difficultyDegree: number;
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
  public getAlbumId (): number {
    return this.albumId
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId
  }
  public getAlbumName (): string {
    return this.albumName
  }
  public setAlbumName (albumName: string): void {
    this.albumName = albumName
  }
  public getAnswerNumber (): number {
    return this.answerNumber
  }
  public setAnswerNumber (answerNumber: number): void {
    this.answerNumber = answerNumber
  }
  public getContentCount (): number {
    return this.contentCount
  }
  public setContentCount (contentCount: number): void {
    this.contentCount = contentCount
  }
  public getDifficultyDegree (): number {
    return this.difficultyDegree
  }
  public setDifficultyDegree (difficultyDegree: number): void {
    this.difficultyDegree = difficultyDegree
  }
}
