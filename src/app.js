import 'es6-shim'
import Vue from 'vue/dist/vue.js'
import router from '@/routes/'
import App from '@/components/App'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
