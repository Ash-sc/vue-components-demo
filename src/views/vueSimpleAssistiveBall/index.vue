<template>
  <div class="page-section">
    <h3>Vue Simple Assistive Ball</h3>
    <assistive-ball :data-list="dataList" v-on:ball-touch="touchEvent">
    </assistive-ball>
  </div>
</template>

<script>
import { AssistiveBall } from 'vue-simple-assistive-ball'
import Message from 'vue-simple-notification'
import 'vue-simple-notification/dist/style.css'

export default {
  components: { AssistiveBall },

  data() {
    return {
      dataList: ['ab-movie', 'ab-zhihu', 'ab-weibo', 'ab-movie', 'ab-zhihu'],
      options: {
        position: 'top-right',
        bubbling: 'up',
        duration: 3,
        closeBtn: true
      }
    }
  },

  methods: {
    touchEvent(icon) {
      Message.info('You clicked icon "' + icon + '"')
    }
  }
}
</script>

<style lang="scss">
.page-section {
  text-align: center;
  height: 100vh;

  > h3 {
    color: #fff;
    font-size: 22px;
  }

}
</style>
