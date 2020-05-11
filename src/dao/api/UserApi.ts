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
  ReturnGenericsProperty
} from 'papio-h5'
import { ApiResult } from '@/bmo/ApiResult'
import { UserAuthBasicResponse } from '@/response/UserAuthBasicResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: 'user-api', timeout: 10000 })
export class UserApi {
  @GetMapping('/front/login/by-user-id')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', String))
  public byUserIdLogin (@RequestParam('userId') userId: number): Promise<ApiResult<String>> {
    return null
  }
  @GetMapping('/front/info/basic')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', UserAuthBasicResponse))
  public userBasic (): Promise<ApiResult<UserAuthBasicResponse>> {
    return null
  }
}
