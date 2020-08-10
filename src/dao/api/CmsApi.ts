import { AxisoRemote, GetMapping, PostMapping, RequestBody, ReturnGenericsProperty } from 'papio-h5'
import { ApiResult } from '@/bmo/ApiResult'
import { CourseTypeChangeConfirmResponse } from '@/response/CourseTypeChangeConfirmResponse'
import { FavoritesAddRequest } from '@/request/FavoritesAddRequest'

/**
 *
 * 功能描述:
 *
 * @className CmsApi
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/8/10 11:16
 */
@AxisoRemote({ filepath: '/src/dao/api', name: 'cms-api', timeout: 10000 })
export class CmsApi {
  @PostMapping('/front/favorites/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public favoritesAdd (@RequestBody request: FavoritesAddRequest): Promise<ApiResult<Number>> {
    return null
  }

  @PostMapping('/front/favorites/cancel')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public favoritesCancel (@RequestBody request: FavoritesAddRequest): Promise<ApiResult<Number>> {
    return null
  }
}
