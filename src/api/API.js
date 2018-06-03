import ajax from './ajax'
const Login = (code) => {
  return ajax('/user/login', 'post', JSON.stringify({code: code}))
}
const GetUserInfo = () => {
  return ajax('/user/info')
}
const GetScore = () => {
  return ajax('/user/score', 'get')
}
const GetCurrentTask = () => {
  return ajax('/task/pending', 'get')
}
const UpLoad = (data) => {
  return ajax('', '', data)
}
const DownLoad = (data) => {
  return ajax('', 'get', data)
}
const UpdateUserInfo = (data) => {
  return ajax('/user/info', 'put', data)
}
const CreateNewTask = (data) => {
  return ajax('/task/group', 'post', data)
}
const GetHistory = (id) => {
  return ajax('/task/history', 'get_restful', {id: id})
}
const GetRank = (page) => {
  return ajax('/user/rank', 'get_restful', {id: page})
}
const GetTaskInfo = (id) => {
  return ajax('/task/group', 'get_restful', {id: id})
}
const FinishTaskItem = (data) => {
  return ajax('/task/item', 'post', data)
}
const GetFutureTaskList = () => {
  return ajax('/task/not-start', 'get')
}
const GetSimpleTaskInfo = (id) => {
  return ajax('/task/detail/simple', 'get_restful', {id: id})
}
const JoinTaskGroup = (id) => {
  return ajax('/task/group/join', 'post', {groupId: id})
}
const GetOthersTaskInfo = (ids) => {
  return ajax('/task/group', 'get_restful2', ids)
}
const GetTaskVillage = (id) => {
  return ajax('/task/village', 'get_restful', {id: id})
}
export {
  DownLoad,
  UpLoad,
  UpdateUserInfo,
  Login,
  GetScore,
  GetHistory,
  GetUserInfo,
  GetCurrentTask,
  CreateNewTask,
  GetRank,
  GetTaskInfo,
  FinishTaskItem,
  GetFutureTaskList,
  GetSimpleTaskInfo,
  JoinTaskGroup,
  GetOthersTaskInfo,
  GetTaskVillage
}
