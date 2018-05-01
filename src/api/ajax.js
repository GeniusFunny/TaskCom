const BASEURL = ''

const methodsMap = {
  GET(url, methods, data) {
    return {
      url: `${BASEURL}/${url}`,
      methods: methods,
      data: data
    }
  },
  GET_RESTFUL(url, methods, data) {
    return {
      url: `${BASEURL}${url}/${data.id}`,
      methods: 'GET',
      data: data
    }
  }
}
const config_request = (url, methods, data) => {
  return methodsMap[methods](url, methods.toUpperCase(), data)
}
const ajax = (url, methods = 'GET', data = {}, config_headers = {'Content-Type': 'application/json'}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...config_request(url, methods, data),
      header: config_headers,
      success: (res) => resolve(res),
      fail: err => reject(err)
    })
  })
}

export default ajax
