const baseUrl = ''

const config_header = (url, methods, data) => {

}
const config_request = (config_headers = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...config_headers,
      success: (res) => resolve(res),
      fail: err => reject(err)
    })
  })
}

const ajax = () => {
  config_request()
}
export default ajax