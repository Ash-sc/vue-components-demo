<template>
  <div class="vue-simple-notification-section">
    <h3>Vue Notification</h3>
    <button @click="notification('success')">success</button>
    <button @click="notification('info')">info</button>
    <button @click="notification('error')">error</button>
    <button @click="notification('warning')">warning</button>
  </div>
</template>

<script>
import Message from 'vue-simple-notification'

export default {
  methods: {
    notification: function(type) {
      const msg = {
        info: '这是一个提示消息',
        error: '错误提示消息',
        warning: '一个警告提示',
        success: '这是表示成功的消息'
      }
      // this.$Message[type](msg[type])
      Message[type](msg[type])
    }
  },
  created: function() {
    Message.config({
      position: 'top-right',
      bubbling: 'up',
      duration: 3,
      closeBtn: true
    })
  }
}
</script>

<style lang="scss">
.vue-simple-notification-section {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
