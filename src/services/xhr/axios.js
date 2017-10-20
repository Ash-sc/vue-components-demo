import axios from 'axios'
import store from '@/store'
import * as loadingType from '@/store/types/loadingTypes'

const rootPath = '/api' // 后端 API 根路径

const xhr = ({ method = 'get', url, body = null }) => {

  const queryString = data => {
    let str = ''
    const body = typeof data === 'object' ? data : {}
    Object.keys(body || {}).forEach((key, index) => {
      str += (index === 0 ? '?' : '&') + key + '=' + body[key]
    })
    return str
  }

  const promise = new Promise((resolve, reject) => {
    const reqPath = rootPath + url + (method === 'get' ? queryString(body) : '')
    store.commit(loadingType.LOADING_CHANGE, { path: rootPath, loading: true })
    axios({
      method: method,
      url: reqPath,
      data: body
    }).then(res => {
      const { data } = res
      store.commit(loadingType.LOADING_CHANGE, { path: rootPath, loading: false })
      if (!data.success) {
        return reject(data)
      }
      resolve(data.data)
    }).catch(err => {
      store.commit(loadingType.LOADING_CHANGE, { path: rootPath, loading: false })
      console.log('request error: %s', err)
    })
  })

  return promise

  // const defer = $.Deferred()

  // axios({
  //   method: method,
  //   url: rootPath + url + (method === 'get' ? queryString(body) : ''),
  //   data: body
  // }).then(res => {
  //   const { status, data } = res
  //   if (status !== 200) {
  //     return defer.reject(data)
  //   }
  //   defer.resolve(data.data)
  // }).catch(err => {
  //   console.log(err, 2)
  // })

  // return defer.promise()
}

export default xhr
