import xhr from './xhr/'

/**
 * 常见问题管理用到的 API
 */
class AccountService {

  /**
   * 常见问题列表
   */
  qaList (query) {
    return xhr({
      url: '/qa/qaList',
      body: query
    })
  }

  /**
   * 常见问题分类
   */
  qaCategoryList () {
    return xhr({
      url: '/qa/qaCategoryList'
    })
  }

  /**
   * 新增常见问题分类
   * @param  {Number} data.id
   * @param  {String} data.name
   * @param  {String} data.label
   * @return {Object} common response
   */
  newqQaCategory (data) {
    return xhr({
      method: 'post',
      url: '/qa/newQaCategory',
      body: data
    })
  }

  /**
   * 新增常见问题归属
   * @param  {Number} data.id
   * @param  {String} data.name
   * @return {Object} common response
   */
  newQaKind (data) {
    return xhr({
      method: 'post',
      url: '/qa/newQaKind',
      body: data
    })
  }

  /**
   * 新增常见问题
   * @param  {Number} data.categoryId
   * @param  {String} data.kindName
   * @param  {String} data.question
   * @param  {String} data.answer
   * @return {Object} common response
   */
  newQa (data) {
    return xhr({
      method: 'post',
      url: '/qa/newQa',
      body: data
    })
  }


}

// 实例化后导出，全局单例
export default new AccountService()
