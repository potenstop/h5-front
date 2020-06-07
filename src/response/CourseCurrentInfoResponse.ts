/**
 *
 * 功能描述:
 *
 * @className CourseCurrentInfoResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/6/7 8:35
 */
import { JsonProperty } from 'papio-h5'

export class CourseCurrentInfoResponse {
  @JsonProperty
  private courseId: number
  @JsonProperty
  private courseName: string
  @JsonProperty
  private courseTypeThreeId: number
  @JsonProperty
  private courseTypeThreeName: number
  public getCourseId (): number {
    return this.courseId
  }
  public setCourseId (courseId: number): void {
    this.courseId = courseId
  }
  public getCourseName (): string {
    return this.courseName
  }
  public setCourseName (courseName: string): void {
    this.courseName = courseName
  }
  public getCourseTypeThreeId (): number {
    return this.courseTypeThreeId
  }
  public setCourseTypeThreeId (courseTypeThreeId: number): void {
    this.courseTypeThreeId = courseTypeThreeId
  }
  public getCourseTypeThreeName (): number {
    return this.courseTypeThreeName
  }
  public setCourseTypeThreeName (courseTypeThreeName: number): void {
    this.courseTypeThreeName = courseTypeThreeName
  }
}
