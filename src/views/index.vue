<template>
  <div class="app">
    <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>
<script>

export default {
  data: () => ({
  }),

  created: function() {
  },

  methods: {
  }
}
</script>


<style lang="scss">
.app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC','Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
}
</style>
