import * as types from '../types/notificationTypes'
import moment from 'moment'

// initial state
// shape: [{ id, quantity }]
const state = {
  notificationsArr: [] // loading信息
}

// getters
const getters = {
  notificationsArr: state => state.notificationsArr
}

let timer = null

// actions
const actions = {
  newNotification({ commit, state }, data) {
    commit(types.NEW_NOTIFICATION, { data })
  },
  closeNotification({ commit, state }, id) {
    commit(types.CLOSE_NOTIFICATION, { id })
  }
}

// mutations
const mutations = {
  // 刷新notification
  [types.REFRESH_NOTIFICATION](state) {
    const arr = state.notificationsArr.filter(item => {
      const milliseconds = moment().format('x') - item.closeTime
      if (milliseconds >= 0) {
        item.willClose = true
      }
      return milliseconds < 400
    })
    state.notificationsArr = arr
    if (!arr.length) {
      clearTimeout(timer)
      timer = null
    } else {
      timer = setTimeout(() => {
        this.commit(types.REFRESH_NOTIFICATION)
      }, 200)
    }
  },
  // 新增notification
  [types.NEW_NOTIFICATION](state, { data }) {
    state.notificationsArr.push({
      ...data,
      closeTime: moment().add(3, 's').format('x')
    })
    if (!timer) {
      this.commit(types.REFRESH_NOTIFICATION)
    }
  },
  // 手动关闭notification
  [types.CLOSE_NOTIFICATION](state, { id }) {
    const newArr = state.notificationsArr
    for (let i = 0; i < newArr.length; i += 1) {
      if (newArr[i].closeTime === id) {
        newArr.splice(i, 1)
        break
      }
    }
    state.notificationsArr = newArr
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
