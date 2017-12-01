<template>
  <router-view transition="fade" transition-mode="out-in"></router-view>
</template>
<script>

export default {
}
</script>

<style lang="scss">
  /* 公共样式  */
  body {
    margin: 0;
    font-size: 16px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC','Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
    color: #343434;
  }

  /* 全局通用的 router-view 过渡效果 */
  .fade-transition {
    transition: opacity .1s ease;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }


  /* 单行省略 */
  .txt-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }

  /* 不可选中 */
  .unselected {
    user-select: none;
  }

  /* 文字对齐 */
  .tl-l {
    text-align: left!important;
  }

  .tl-r {
    text-align: right!important;
  }

  .tl-c {
    text-align: center!important;
  }
</style>
