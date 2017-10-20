export default [
  { 
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    }
  }
]
