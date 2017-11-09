<template>
  <div
    class="popup-bg"
    :class="{ 'popup-show': showPopup }"
    @click.self="hide"
  >
  <slot></slot>
  </div>
</template>

<script>

export default {

  data: () =>({
    showPopup: false
  }),

  methods: {
    show: function() {
      this.showPopup = true
    },

    hide: function() {
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss">
.popup-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: -600px;
  left: 100%;
  z-index: 1025;
  opacity: 0;
  transition: opacity .4s ease-in-out;
  background-color: rgba(0, 0, 0, .4);
  cursor: pointer;

  .popup-body {
    width: 800px;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
    position: relative;
    border: 1px solid #fff;
    border-radius: 4px;
    box-shadow: 0 0 4px #8b8b8b;
    background-color: #fff;
    padding: 20px;
  }

  .modal-header {
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    position: relative;

    .title {
      font-size: 16px;
    }

    .fa-times {
      position: absolute;
      right: 0;
      top: 2px;
      font-size: 20px;
    }
  }

  .modal-body {
    padding: 20px 0;

    .form-item {
      height: 30px;
      padding-left: 120px;
      position: relative;
    }
    
    .form-item:not(:last-child) {
      margin-bottom: 20px;
    }

    .form-label {
      position: absolute;
      left: 0;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: right;
    }

    .form-label.required::before {
      content: '*';
      position: absolute;
      color: #ff3333;
      right: -8px;
      font-size: 20px;
    }
  }

  .modal-footer {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: right;
  }
}

.popup-bg.popup-show {
  top: 0;
  left: 0;
}
</style>
