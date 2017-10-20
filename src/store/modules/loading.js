import * as types from '../types/loadingTypes'
// import findIndex from 'lodash/findIndex'

// initial state
// shape: [{ id, quantity }]
const state = {
  loading: [] // loading信息
}

// getters
const getters = {
  loading: state => state.loading
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.LOADING_CHANGE](state, { path, loading }) {
    const loadingArr = state.loading
    if (loading) {
      loadingArr.push(path)
    } else {
      loadingArr.splice(loadingArr[loadingArr.indexOf(path)], 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
