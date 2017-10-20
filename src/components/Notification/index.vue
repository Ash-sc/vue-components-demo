<template>
  <div class="notification-bg">
    <div
      v-for="(item, index) in $store.state.notification.notificationsArr"
      :key="item.closeTime"
      class="notification-item"
      :class="{'will-close': item.willClose }"
    >
      <span
        class="notification-icon"
        :class="`icon-${item.type}`"
      ></span>
      <div class="notification-content">
        {{item.content}}
      </div>
    </div>
  </div>
</template>
<script>

export default {
}
</script>

<style lang="scss">
  .notification-bg {
    position: fixed;
    z-index: 9999;
    right: 20px;
    width: 250px;
    top: 20px;
    
    @keyframes notificationShow {
      0% {
        opacity: 0;
        right: -270px;
      }

      20% {
        opacity: 1;
        right: 0;
      }

      100% {
        opacity: 1;
        right: 0;
      }
    }
    
    @keyframes notificationHide {
      0% {
        opacity: 1;
      }

      30% {
        opacity: 0;
      }

      100% {
        height: 0;
        opacity: 0;
        padding: 0;
        margin: 0;
      }
    }

    .notification-item {
      position: relative;
      box-shadow: 0 2px 8px rgba(0,0,0,.2);
      background: #fff;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 10px;
      animation: notificationShow .3s both ease;
      user-select: none;
    }

    .will-close {
      animation: notificationHide .2s both ease-in-out;
    }

    .notification-icon {
      position: absolute;
      height: 20px;
      width: 20px;
      font: normal normal normal 16px FontAwesome;
      line-height: 20px;
    }

    .icon-success::before {
      content: "\f058";
      color: #00a854;
    }
    
    .icon-warn::before {
      content: "\f06a";
      color: #ffbf00;
    }
    
    .icon-info::before {
      content: "\f05a";
      color: #108ee9;
    }

    .icon-error::before {
      content: "\f057";
      color: #f04134;
    }

    .notification-content {
      padding-left: 25px;
      font-size: 12px;
      line-height: 20px;
      min-height: 20px;
    }

  }
</style>

