import { b64utoutf8 } from 'jsrsasign'
import {setStorage} from './wxUtils'

/*  函数节流  */
function throttle (fn, delay) {
  let prev = Date.now()
  return function () {
    let now = Date.now()
    let args = arguments
    if (now - prev >= delay) {
      fn.apply(this, args)
      prev = Date.now()
    }
  }
}

/*  函数防抖  */
function debounce (fn, delay) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
function unix2cst (time) {
  let date
  date = (new Date(time)).toJSON().replace(/T/, ' ').split('.')[0].slice(0, -3)
  return date
}
function cst2unix (time) {
  return (new Date(time)).getTime()
}
function normalizeTime (time) {
  return time.split('T')[0]
}
function normalizeTimeHours (time) {
  return time.split('.')[0].replace(/T/, ' ').slice(0, -3)
}
const parseToken = (token) => {
  // 小程序不支持atob，所有引入了jsrsasign库的 b64utoutf8
  let info = JSON.parse(b64utoutf8(token.split('.')[1]))
  setStorage('exp', info.exp * 1000)
  setStorage('userId', info.userId)
}
export {
  throttle,
  debounce,
  normalizeTime,
  unix2cst,
  cst2unix,
  normalizeTimeHours,
  parseToken
}
