import * as types from '../types/qaManagementTypes'
import qaManagementService from '@/services/qaManagementService'

// initial state
const state = {
  qaList: {
    data: [],
    pageable: {
      page: 1,
      size: 20
    }
  },
  qaCategoryData: []
}

// getters
const getters = {
  qaList: state => state.qaList,
  qaCategoryData: state => state.qaCategoryData
}


// actions
const actions = {
  // 获取常见问题分类信息
  [types.GET_QA_CATEGORY_LIST]({ commit, state }) {
    qaManagementService
      .qaCategoryList()
      .then(data => {
        commit(types.GET_QA_CATEGORY_LIST_SUCCESS, { data })
      }, () => {
        commit(types.GET_QA_CATEGORY_LIST_FAILURE, {})
      })
  },

  // 获取常见问题列表
  [types.GET_QA_LIST]({ commit, state }, query) {
    qaManagementService
      .qaList(query)
      .then(data => {
        commit(types.GET_QA_LIST_SUCCESS, { data })
      }, () => {
        commit(types.GET_QA_LIST_FAILURE, {})
      })
  },

  // 新建常见问题分类
  [types.NEW_QA_CATEGORY]({ commit, state }, data) {
    return qaManagementService
      .newQaCategory(data)
  },

  // 新建常见问题归属
  [types.NEW_QA_KIND]({ commit, state }, data) {
    return qaManagementService
    .newQaKind(data)
  },

  // 新建常见问题
  [types.NEW_QA]({ commit, state }, data) {
    return qaManagementService
    .newQa(data)
  }
}

// mutations
const mutations = {
  [types.GET_QA_CATEGORY_LIST_SUCCESS](state, { data }) {
    state.qaCategoryData = data
  },
  [types.GET_QA_CATEGORY_LIST_FAILURE](state, {}) {
    state.qaCategoryData = []
  },

  [types.GET_QA_LIST_SUCCESS](state, { data }) {
    state.qaList = data
  },
  [types.GET_QA_LIST_FAILURE](state, {}) {
    state.qaList = {
      data: [],
      pageable: {
        page: 1,
        size: 20
      }
    }
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
