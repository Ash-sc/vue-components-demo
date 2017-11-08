export default [
  { 
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    },
    redirect: to => {
      return '/qa-management'
    }
  }, { 
    path: '/login',
    component (resolve) {
      require(['@/views/login'], resolve)
    }
  },
  {
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    },
    children: [
      {
        path: '/qa-management',
        name: 'qa-management',
        component (resolve) {
          require(['@/views/qa/'], resolve)
        },
        redirect: to => {
          return '/qa-management/qa-management-list'
        },
        children: [
          {
            path: '/qa-management/qa-management-list',
            name: 'qa-management.qa-management-list',
            component (resolve) {
              require(['@/views/qa/list/'], resolve)
            }
          }, {
            path: '/qa-management/new-qa',
            name: 'qa-management.new-qa',
            component (resolve) {
              require(['@/views/qa/newQa/'], resolve)
            }
          }
        ]
      }
    ]
  }
]
