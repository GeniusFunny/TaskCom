const FILEURL = ''  //  文件服务器地址

const toast = (title = '提示', content = '', duration = 1500, mask = false) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      content: content,
      duration: duration,
      mask: mask,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const showLoading = (title = '加载中', mask = false) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: title,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const hideLoading = () => {
  wx.hidden()
}

const modal = (title = '提示', content = '') => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const getStorage = (item) => {
  return wx.getStorageSync(item)
}

const setStorage = (key, value) => {
  wx.setStorageSync(key, value)
}

const chooseImg = (count = 9) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const upLoad = (filePath, formData) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: FILEURL,
      filePath: filePath, //  本地路径名
      name: 'file',
      formData: formData,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
const jumpTo = (url) => {
  wx.navigateTo({
    url: url,
    fail: err => {
      console.log(err)
      wx.switchTab({
        url: url,
        fail: err => console.log(err)
      })
    }
  })
}
export {
  toast,  //  提示窗
  showLoading,  //  显示加载提示框
  hideLoading,  //  隐藏加载提示框
  modal,  //  模态框
  getStorage, //  读取缓存（同步）
  setStorage, //  设置缓存（同步）
  chooseImg,  //  选取图片
  wxLogin,  //  登录微信服务器
  getUserInfo, //  获取微信用户信息,
  upLoad,  // 上传,
  jumpTo  //  页面跳转
}
