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
import { ApiResult } from '@/bmo/ApiResult'
import { CourseTypeChangeConfirmResponse } from '@/response/CourseTypeChangeConfirmResponse'
import { JsonProtocol } from 'papio-h5'
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 10
})

Mock.mock(/\/front\/course\/type\/change\/confirm(|\?\S*)$/, (req) => {
  const result = new ApiResult<CourseTypeChangeConfirmResponse>()
  const response = JsonProtocol.jsonToBean({
    currentChooseCoursePathList: [{
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }
    ],
    changeCourseList: [{
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '2'
    }, {
      courseTypeId: 1,
      typeName: '3'
    }, {
      courseTypeId: 1,
      typeName: '4'
    }
    ]
  }, CourseTypeChangeConfirmResponse)
  result.setData(response)
  return result
})
Mock.mock(/\/front\/course\/type\/change(|\?\S*)$/, (req) => {
  const result = new ApiResult<number>()
  result.setData(1)
  return result
})
export default Mock
