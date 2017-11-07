<template>
  <div>
    <notification></notification>
    <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>
<script>
/* 根组件就像是 AngularJS 的 $rootScope，同时也负责全局布局 */
import Notification from '@/components/Notification/'

export default {
  // 路由会自动将该组件挂载到 #app 上
  // el: () => '#app',
  
  components: { Notification }


  // created: function() {
  //   this.$store.dispatch('newNotification', {
  //     type: 'success',
  //     content: 'Welcome !!!'
  //   })
  // }
}
</script>

<style lang="scss">
  /* 公共样式  */
  $body-font: "Arial", "Microsoft YaHei", "montserrat-light-webfont", "STHeiti", "\534E\6587\9ED1\4F53", "SimHei", "\9ED1\4F53", "microsoft yahei", "\5FAE\8F6F\96C5\9ED1", sans-serif;

  body {
    font-size: 16px;
    font-family: $body-font;
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
