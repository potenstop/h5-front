/**
 *
 * 功能描述:
 *
 * @className LocalForageUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/12/14 10:12
 */
import localForage from 'localforage'
import VueStore from '../../store'
// 先保存至cookie
localForage.config({
  driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
  name: 'myApp',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description: 'some description'
})
const store = localForage.createInstance({
  name: 'front'
})
export class LocalForageUtil {
  public static setItem (key: string, value: any) {
    return store.setItem(key, value)
  }
  public static async getItem (key: string, defalutValue?: any): Promise<any> {
    const result = await store.getItem(key)
    if (result === null) {
      return defalutValue
    } else {
      return result
    }
  }
  public static setPrefixItem (key: string, value: any) {
    const userState = VueStore.state as any
    return LocalForageUtil.setItem(userState.user.userId + ':' + key, value)
  }
  public static async getPrefixItem (key: string): Promise<any> {
    const userState = VueStore.state as any
    return LocalForageUtil.getItem(userState.user.userId + ':' + key)
  }
}
