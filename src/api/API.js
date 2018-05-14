import ajax from './ajax'

const GetUserInfo = () => {
  return ajax('/userInfo')
}
const GetCurrentTask = () => {
  return ajax('/taskList')
}
const UpLoad = (data) => {
  return ajax('', '', data)
}
const DownLoad = (data) => {
  return ajax('', 'get', data)
}
export {
  DownLoad,
  UpLoad,
  GetUserInfo,
  GetCurrentTask
}
