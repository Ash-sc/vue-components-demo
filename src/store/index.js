import Vue from 'vue'
import Vuex from 'vuex'
import notification from './modules/notification'
import popup from './modules/popup'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const getters = {}

const actions = {}

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    notification,
    popup
  },
  strict: debug
})
