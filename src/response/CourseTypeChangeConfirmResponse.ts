import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { CourseTypeSimpleResponse } from '@/response/CourseTypeSimpleResponse'
/**
 *
 * 功能描述:
 *
 * @className CourseTypeChangeConfirmResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/5/24 14:18
 */

export class CourseTypeChangeConfirmResponse {
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', CourseTypeSimpleResponse))
  private currentChooseCoursePathList: CourseTypeSimpleResponse[]
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', CourseTypeSimpleResponse))
  private changeCourseList: CourseTypeSimpleResponse[]
  public getChangeCourseList (): CourseTypeSimpleResponse[] {
    return this.changeCourseList
  }
  public setChangeCourseList (changeCourseList: CourseTypeSimpleResponse[]): void {
    this.changeCourseList = changeCourseList
  }
  public getCurrentChooseCoursePathList (): CourseTypeSimpleResponse[] {
    return this.currentChooseCoursePathList
  }
  public setCurrentChooseCoursePathList (currentChooseCoursePathList: CourseTypeSimpleResponse[]): void {
    this.currentChooseCoursePathList = currentChooseCoursePathList
  }
}
