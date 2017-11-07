// initial state
const state = {
  popupShow: false
}


// actions
const actions = {
}

// mutations
const mutations = {
  // 显示模态框
  newPopup(state, { name }) {
    state[name ? name : 'popupShow'] = true
  },
  // 关闭模态框
  closePopup(state, { name }) {
    state[name ? name : 'popupShow'] = false
  }
}

export default {
  state,
  actions,
  mutations
}
