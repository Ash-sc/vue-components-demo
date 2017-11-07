<template>
  <div
    class="popup-bg"
    :title="$store.state.popup[popupName || 'popupShow']"
    :class="{ 'popup-show': classShow }"
  >
  <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    popupName: {
      required: false
    }
  },
  computed: {
    classShow() {
      return this.$store.state.popup[this.popupName || 'popupShow']
    }
  }
}
</script>

<style>
.popup-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: -600px;
  left: 0;
  z-index: 1025;
  text-align: center;
  transition: top .2s linear;
}
.popup-show {
  top: 0;
}
</style>
