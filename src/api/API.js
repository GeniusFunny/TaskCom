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
const GetMoreUserInfo = () => {
  return ajax('/moreUserInfo')
}
const UpdateUserInfo = () => {
  return ajax('/moreUserInfo', 'post')
}
const GetHistory = () => {
  return ajax('/historyTask')
}
export {
  DownLoad,
  UpLoad,
  UpdateUserInfo,
  GetHistory,
  GetUserInfo,
  GetMoreUserInfo,
  GetCurrentTask
}
