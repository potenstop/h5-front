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
@AxisoRemote({ filepath: '/src/dao/api', name: 'user-api', timeout: 10000 })
export class UserApi {

}
