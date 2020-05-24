import { UserAuthResponse } from '@/response/UserAuthResponse'
import { JsonProperty } from 'papio-h5'
/**
 *
 * 功能描述:
 *
 * @className CourseTypeSimpleResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/5/24 14:18
 */

export class CourseTypeSimpleResponse {
  @JsonProperty
  private courseTypeId: number
  @JsonProperty
  private typeName: string
  public getCourseTypeId (): number {
    return this.courseTypeId
  }
  public setCourseTypeId (courseTypeId: number): void {
    this.courseTypeId = courseTypeId
  }
  public getTypeName (): string {
    return this.typeName
  }
  public setTypeName (typeName: string): void {
    this.typeName = typeName
  }
}
