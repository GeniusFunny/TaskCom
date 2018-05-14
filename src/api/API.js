import ajax from './ajax'

const Test = () => {
  return ajax('/userInfo')
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
  Test
}
