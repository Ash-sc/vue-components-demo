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
      }
    ]
  }
]
