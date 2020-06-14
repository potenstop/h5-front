/**
 *
 * 功能描述:
 *
 * @className UserMock
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/11 10:27
 */
import Mock from 'mockjs'
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

Mock.mock(/\/front\/login\/by-user-id(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': '02c512801b2147a8acf4494c0c01d225' }
})

Mock.mock(/\/front\/info\/basic(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': { 'userId': 34561709288980480, 'nickname': '', 'avatar': '', 'userAuthList': [{ 'userAuthId': 34561709288980481, 'identifier': 'outya1NIxY9QUw0lUvb-XKDw3nak' }] } }
})

export default Mock
