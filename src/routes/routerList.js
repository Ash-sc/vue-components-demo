export default [
  {
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    },
    redirect: to => {
      return '/home-page'
    }
  }, {
    path: '/home-page',
    component (resolve) {
      require(['@/views/homePage'], resolve)
    }
  },
  {
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    },
    children: [
      {
        path: '/vue-simple-file-upload',
        name: 'vue-simple-file-upload',
        component (resolve) {
          require(['@/views/vueSimpleFileUpload/'], resolve)
        }
      },
      {
        path: '/vue-simple-notification',
        name: 'vue-simple-notification',
        component (resolve) {
          require(['@/views/vueSimpleNotification/'], resolve)
        }
      },
      {
        path: '/vue-simple-assistive-ball',
        name: 'vue-simple-assistive-ball',
        component (resolve) {
          require(['@/views/vueSimpleAssistiveBall/'], resolve)
        }
      }
    ]
  }
]
