/**
 *
 * 功能描述:
 *
 * @className UserApi
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/4/25 9:33
 */
import {
  AxisoRemote, GetMapping, PostMapping, RequestBody,
  RequestMapping,
  RequestMethod,
  RequestParam,
  ReturnGenericsProperty,
  PutMapping
} from 'papio-h5'
import { ApiResult } from '@/bmo/ApiResult'
import { CourseTypeChangeConfirmResponse } from '@/response/CourseTypeChangeConfirmResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: 'course-api', timeout: 10000 })
export class CourseApi {
  @GetMapping('/front/course/type/change/confirm')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', CourseTypeChangeConfirmResponse))
  public courseTypeChangeConfirm (): Promise<ApiResult<CourseTypeChangeConfirmResponse>> {
    return null
  }
  @PutMapping('/front/course/type/change')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public courseTypeChange (@RequestParam('changeCourseTypeId') changeCourseTypeId: number): Promise<ApiResult<CourseTypeChangeConfirmResponse>> {
    return null
  }
}
