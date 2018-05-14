import Route from './mock/route'

const BASEURL = ''
const DEGUG = true
const methodsMap = {
  GET (url, methods, data) {
    return {
      url: `${BASEURL}${url}`,
      methods: methods,
      data: data
    }
  },
  GET_RESTFUL (url, methods, data) {
    return {
      url: `${BASEURL}${url}/${data.id}`,
      methods: 'GET',
      data: data
    }
  }
}
const configRequest = (url, methods, data) => {
  return methodsMap[methods](url, methods.toUpperCase(), data)
}
const ajax = (url, methods = 'GET', data = {}, headers = {'Content-Type': 'application/json'}) => {
  if (!DEGUG) {
    return new Promise((resolve, reject) => {
      const obj = configRequest(url, methods, data)
      wx.request({
        ...obj,
        header: headers,
        success: (res) => resolve(res),
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
