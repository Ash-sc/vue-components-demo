<template>
  <div class="app">
    <gt-top-bar
      title="文档中心后台管理"
      logo-url="https://dev.getui.com/dev/static/img/logo.5b3c315.png"
      :account-server="{ logout, modifyPsw }"
    >
    </gt-top-bar>
    <gt-menu :menus='menuItems'></gt-menu>
    <div class="main-content">
      <router-view transition="fade" transition-mode="out-in"></router-view>
    </div>
  </div>
</template>
<script>

export default {
  data: () => ({
    menuItems: [
      {
        label: '常见问题维护',
        name: 'qa-management',
        icon: 'icon-richangguanli',
        items: [
          {
            label: '常见问题列表',
            name: 'qa-management.qa-management-list',
            icon: 'icon-richangguanli'
          }, {
            label: '新建问题',
            name: 'qa-management.new-qa',
            icon: 'icon-richangguanli'
          }
        ]
      },
      {
        label: '常见问题维护2',
        name: 'qa-management2',
        icon: 'icon-richangguanli'
      }
    ]
  }),

  created: function() {
  },

  methods: {
    logout: function() {
      this.$router.push('/login')
    },
    modifyPsw: function() {
      console.log('modifyPsw!')
    }
  }
}
</script>


<style lang="scss">
.app {

  .gt-header .gt-logo {
    height: 35px;
  }

  .gt-bar-wrap {
    position: fixed;
    left: 0;
    top: 65px;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;

    .gt-bar {
      padding-top: 0;
    }
  }

  .main-content {
    position: relative;
    top: 65px;
    margin-left: 170px;
  }
}

// menu
.gt-menu .gt--open+.gt-menu__sub {
  height: auto!important;
}
</style>
