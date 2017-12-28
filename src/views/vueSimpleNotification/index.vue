<template>
  <div class="vue-simple-notification-section">
    <h3>Vue Notification</h3>
    <div class="options-section">
      <span>Options:</span>
      <br>
      <span>Position:</span>
      <label>
        <input type="radio" name="position" v-model="options.position" value="top-left" />
        Top-Left
      </label>
      <label>
        <input type="radio" name="position" v-model="options.position" value="top-right" />
        Top-Right
      </label>
      <label>
        <input type="radio" name="position" v-model="options.position" value="center" />
        Center
      </label>
      <br>
      <span>Bubbling:</span>
      <label>
        <input type="radio" name="bubbling" v-model="options.bubbling" value="up" />
        Up
      </label>
      <label>
        <input type="radio" name="bubbling" v-model="options.bubbling" value="down" />
        Down
      </label>
      <br>
      <span>Close Btn:</span>
      <label>
        <input type="radio" name="closeBtn" v-model="options.closeBtn" :value="true" />
        True
      </label>
      <label>
        <input type="radio" name="closeBtn" v-model="options.closeBtn" :value="false" />
        False
      </label>
    </div>
    <button @click="notification('success')">success</button>
    <button @click="notification('info')">info</button>
    <button @click="notification('error')">error</button>
    <button @click="notification('warning')">warning</button>
  </div>
</template>

<script>
import Message from 'vue-simple-notification'
import 'vue-simple-notification/dist/style.css'

export default {
  data() {
    return {
      options: {
        position: 'top-right',
        bubbling: 'up',
        duration: 3,
        closeBtn: true
      }
    }
  },

  methods: {
    notification: function(type) {
      const msg = {
        info: '这是一个提示消息',
        error: '错误提示消息',
        warning: '一个警告提示',
        success: '这是表示成功的消息'
      }
      Message[type](msg[type])
    }
  },

  created: function() {
    Message.config(this.options)
  },

  watch: {
    options: {
      handler: (value) => Message.config(value),
      deep: true
    }
  }
}
</script>

<style lang="scss">
.vue-simple-notification-section {
  text-align: center;
  margin-top: 80px;

  > h3 {
    color: #fff;
    font-size: 22px;
  }

  .options-section {
    position: fixed;
    color: #fff;
    top: 140px;
    left: 20px;
    text-align: left;
    line-height: 30px;

    span, label {
      margin-right: 20px;
      display: inline-block;
      min-width: 75px;
    }
  }

  button {
    width: 90px;
    outline: none;
    height: 30px;
    background-color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
.notification-bg {
  text-align: left;
}
</style>
