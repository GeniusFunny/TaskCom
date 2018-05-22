import Route from './mock/route'
import {getStorage, setStorage} from '../utils/wxUtils'
const BASEURL = 'http://hotpot.zhengsj.top'
const DEGUG = false
const methodsMap = {
  GET: (url, methods, data) => {
    return {
      url: `${BASEURL}${url}`,
      method: methods
    }
  },
  GET_RESTFUL: (url, methods, data) => {
    return {
      url: `${BASEURL}${url}/${data.id}`,
      method: 'GET'
    }
  },
  POST: (url, methods, data) => {
    return {
      url: `${BASEURL}${url}`,
      method: methods,
      data: data
    }
  },
  PUT: (url, methods, data) => {
    return {
      url: `${BASEURL}${url}`,
      method: methods,
      data: data
    }
  }
}
const configRequest = (url, methods, data) => {
  return methodsMap[methods.toUpperCase()](url, methods.toUpperCase(), data)
}
const ajax = (url, methods = 'GET', data = {}, headers = {'Content-Type': 'application/json'}) => {
  if (!DEGUG) {
    return new Promise((resolve, reject) => {
      const obj = configRequest(url, methods, data)
      if (getStorage('token')) {
        headers['Authorization'] = getStorage('token')
      }
      wx.request({
        ...obj,
        header: headers,
        success: (res) => {
          if (typeof res.data !== 'undefined' && typeof res.data.data !== 'undefined' && res.data.data.token) {
            setStorage('token', res.data.data.token)
          }
          if (typeof res.data !== 'undefined' && res.data.status === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        },
        fail: err => reject(err)
      })
    })
  } else {
    let res = Route(url)
    return new Promise((resolve, reject) => {
      resolve(res)
    })
  }
}
export default ajax
