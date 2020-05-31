import { UserAuthResponse } from '@/response/UserAuthResponse'
import { JsonProperty } from 'papio-h5'
/**
 *
 * 功能描述:
 *
 * @className CourseSimpleResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/5/24 14:18
 */

export class CourseSimpleResponse {
  @JsonProperty
  private courseId: number
  @JsonProperty
  private courseName: string
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
}
