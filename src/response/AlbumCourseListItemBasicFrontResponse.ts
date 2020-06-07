/**
 *
 * 功能描述:
 *
 * @className AlbumCourseListItemBasicFrontResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/6/7 8:35
 */
import { JsonProperty } from 'papio-h5'

export class AlbumCourseListItemBasicFrontResponse {
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
