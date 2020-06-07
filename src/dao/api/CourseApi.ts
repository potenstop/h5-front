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
import { AlbumCourseProblemHistoryListItemRequest } from '@/request/AlbumCourseProblemHistoryListItemRequest'
import { PageResponse } from '@/bmo/PageResponse'
import { AlbumCourseProblemHistoryListItemResponse } from '@/response/AlbumCourseProblemHistoryListItemResponse'
import { AlbumCourseListItemSimpleFrontResponse } from '@/response/AlbumCourseListItemSimpleFrontResponse'
import { CourseCurrentInfoResponse } from '@/response/CourseCurrentInfoResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: 'course-api', timeout: 10000 })
export class CourseApi {
  @GetMapping('/front/course/type/change/confirm')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', CourseTypeChangeConfirmResponse))
  public courseTypeChangeConfirm (): Promise<ApiResult<CourseTypeChangeConfirmResponse>> {
    return null
  }
  @PutMapping('/front/course/change')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public courseChange (@RequestParam('courseId') courseId: number): Promise<ApiResult<number>> {
    return null
  }
  @PostMapping('/front/album/course/problem/history')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', AlbumCourseProblemHistoryListItemResponse))
  public albumCourseProblemHistory (@RequestBody request: AlbumCourseProblemHistoryListItemRequest): Promise<ApiResult<PageResponse<AlbumCourseProblemHistoryListItemResponse>>> {
    return null
  }
  @PostMapping('/front/album/course/old-exam')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', AlbumCourseListItemSimpleFrontResponse))
  public albumCourseOldExam (): Promise<ApiResult<AlbumCourseListItemSimpleFrontResponse[]>> {
    return null
  }

  @GetMapping('/front/course/current/info')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', CourseCurrentInfoResponse))
  public courseCurrentInfo (): Promise<ApiResult<CourseCurrentInfoResponse>> {
    return null
  }
}
