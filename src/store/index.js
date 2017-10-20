import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import notification from './modules/notification'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const getters = {}

const actions = {}

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    loading,
    notification
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
