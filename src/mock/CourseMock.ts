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
  timeout: 10
})

Mock.mock(/\/front\/course\/type\/change\/confirm(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': { 'currentChooseCoursePathList': [{ 'courseTypeId': 1, 'typeName': '升学.考研' }, { 'courseTypeId': 2, 'typeName': '自考' }, { 'courseTypeId': 3, 'typeName': '计算机及应用（独立本科段）' }], 'changeCourseList': [{ 'courseId': 1, 'courseName': '中国近现代史纲要' }, { 'courseId': 2, 'courseName': '马克思主义基本原理概论' }, { 'courseId': 3, 'courseName': '英语（二）' }, { 'courseId': 4, 'courseName': '离散数学' }, { 'courseId': 5, 'courseName': 'C++程序设计' }, { 'courseId': 6, 'courseName': '操作系统' }, { 'courseId': 7, 'courseName': '数据库系统原理' }, { 'courseId': 8, 'courseName': '数据结构' }, { 'courseId': 9, 'courseName': '计算机系统结构' }, { 'courseId': 10, 'courseName': '软件工程' }, { 'courseId': 11, 'courseName': '计算机网络原理' }, { 'courseId': 12, 'courseName': 'Java语言程序设计（一）' }, { 'courseId': 13, 'courseName': '英语（二）' }, { 'courseId': 14, 'courseName': '高等数学（工本）' }, { 'courseId': 15, 'courseName': '概率论与数理统计（二）' }, { 'courseId': 16, 'courseName': '高级语言程序设计（一）' }, { 'courseId': 17, 'courseName': '计算机组成原理' }, { 'courseId': 38, 'courseName': '计算机应用基础' }, { 'courseId': 39, 'courseName': '11' }] } }
})
Mock.mock(/\/front\/course\/type\/change(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': 1 }
})
Mock.mock(/\/course-api\/front\/course\/current\/info(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': { 'courseTypeThreeId': 3, 'courseTypeThreeName': '计算机及应用（独立本科段）', 'courseId': 1, 'courseName': '中国近现代史纲要' } }
})
Mock.mock(/\/course-api\/front\/album\/course\/problem\/history(|\?\S*)$/, (req) => {
  return { 'code': 0, 'message': null, 'data': { 'count': 100, 'list': [{ 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 11 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 12 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 113 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 14 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 15 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 16 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 17 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 18 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 19 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 20 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 21 }, { 'albumId': 1, 'albumName': '测试', 'answerNumber': 22, 'contentCount': '222', 'difficultyDegree': 10, 'albumCourseProblemId': 22 }] } }
})
Mock.mock(/\/course-api\/front\/album\/course\/old-exam(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': [{ 'albumId': 1, 'albumName': '2018 上半年考试', 'difficultyDegree': 1, 'answerNumber': 1, 'contentCount': 1 }, { 'albumId': 2, 'albumName': '2018 下半年考试', 'difficultyDegree': 1, 'answerNumber': 1, 'contentCount': 0 }, { 'albumId': 4, 'albumName': '全国2008年10月高等教育自学考试', 'difficultyDegree': 1, 'answerNumber': 1, 'contentCount': 47 }] }
})

Mock.mock(/\/course-api\/front\/album\/course\/problem\/add(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': 1 }
})

Mock.mock(/\/course-api\/front\/content\/topic\/by-album(|\?\S*)$/, (req) => {
  return { 'code': '0', 'message': 'suc', 'data': [{ 'contentId': 1, 'title': '题目1', 'analysis': '题目1', 'topicType': 1, 'gradeAmount': 2, 'optionResponseList': [{ 'contentTopicSelectOptionId': 1, 'optionLabel': '选项1' }, { 'contentTopicSelectOptionId': 2, 'optionLabel': '选项2' }, { 'contentTopicSelectOptionId': 3, 'optionLabel': '选项3' }] }, { 'contentId': 2, 'title': '题目2', 'analysis': '题目2', 'topicType': 1, 'gradeAmount': 2, 'optionResponseList': [{ 'contentTopicSelectOptionId': 1, 'optionLabel': '选项1' }, { 'contentTopicSelectOptionId': 2, 'optionLabel': '选项2' }, { 'contentTopicSelectOptionId': 3, 'optionLabel': '选项3' }] }] }
})
export default Mock
